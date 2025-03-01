import { ValidationError } from "../utils/errorHandler";

// Validate user registration
export const validateUserRegistration = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  // Name validation
  if (!name || name.trim() === '') {
    errors.push('Name is required');
  } else if (name.length < 2 || name.length > 100) {
    errors.push('Name must be between 2 and 100 characters');
  }

  // Email validation
  if (!email || email.trim() === '') {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Invalid email format');
    }
  }

  // Password validation
  if (!password) {
    errors.push('Password is required');
  } else if (password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  // Return errors if any
  if (errors.length > 0) {
    return new ValidationError('Invalid registration credentials',errors);
  }

  next();
};

// Validate product creation/update
export const validateProduct = (req, res, next) => {
  const { name, description, price } = req.body;
  const errors = [];

  // Name validation
  if (!name || name.trim() === '') {
    errors.push('Product name is required');
  } else if (name.length < 2 || name.length > 100) {
    errors.push('Product name must be between 2 and 100 characters');
  }

  // Description validation
  if (!description || description.trim() === '') {
    errors.push('Product description is required');
  }

  // Price validation
  if (price === undefined) {
    errors.push('Price is required');
  } else {
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      errors.push('Price must be a number');
    } else if (parsedPrice <= 0) {
      errors.push('Price must be greater than zero');
    }
  }

  // Return errors if any
  if (errors.length > 0) {
    throw new ValidationError('Invalid product data', errors);
  }

  next();
};

// Validate search parameters
export const validateSearch = (req, res, next) => {
  const { minPrice, maxPrice } = req.queryPool;
  const errors = [];

  // Price range validation
  if (minPrice !== undefined) {
    const min = parseFloat(minPrice);
    if (isNaN(min)) {
      errors.push('Minimum price must be a number');
    } else if (min < 0) {
      errors.push('Minimum price cannot be negative');
    }
  }

  if (maxPrice !== undefined) {
    const max = parseFloat(maxPrice);
    if (isNaN(max)) {
      errors.push('Maximum price must be a number');
    } else if (max < 0) {
      errors.push('Maximum price cannot be negative');
    }
  }

  // Check min <= max if both are provided
  if (minPrice !== undefined && maxPrice !== undefined) {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    if (!isNaN(min) && !isNaN(max) && min > max) {
      errors.push('Minimum price cannot be greater than maximum price');
    }
  }

  // Return errors if any
  if (errors.length > 0) {
    return new ValidationError('Invalid search parameters', errors);
  }

  next();
};


export const validateUserLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  // Email validation
  if (!email || email.trim() === '') {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Invalid email format');
    }
  }

  if (!password) {
    errors.push('Password is required');
  }

  // Return errors if any
  if (errors.length > 0) {
    return new ValidationError('Invalid login credentials',errors);
  }

  next();
};
