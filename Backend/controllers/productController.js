// controllers/productController.js
import Product from '../models/product.js';
import { getCollection } from '../config/db/mongodbSetup.js';
import { 
  ValidationError, 
  NotFoundError, 
  DatabaseError 
} from '../utils/errorHandler.js';
import SearchService from '../services/searchService.js';

// Get all products
export const getAllProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    // Validate pagination parameters
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    if (isNaN(pageNum) || pageNum < 1) {
      return next(new ValidationError('Page must be a positive number'));
    }
    
    if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
      return next(new ValidationError('Limit must be between 1 and 100'));
    }
    
    const products = await Product.findAll(pageNum, limitNum);
    
    res.status(200).json({
      success: true,
      ...products
    });
  } catch (error) {
    next(new DatabaseError(`Failed to retrieve products: ${error.message}`));
  }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        
        if (!product) {
          return next(new ValidationError('Product ID is required'));
        }
        
        res.status(200).json({
            success: true,
            product: product.toJSON()
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to retrieve product' 
        });
    }
}

// Create a new product
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price } = req.body;
    
    // Input validation (supplementing middleware validation)
    if (!name || !description || price === undefined) {
      return next(new ValidationError('Name, description, and price are required'));
    }
    
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      return next(new ValidationError('Price must be a positive number'));
    }
    
    const product = await Product.create(name, description, priceValue);
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: product.toJSON()
    });
  } catch (error) {
    next(new DatabaseError(`Failed to create product: ${error.message}`));
  }
};

// Update a product
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    
    // Get existing product
    const product = await Product.findById(id);
    if (!product) {
      return next(new NotFoundError('Product'));
    }
    
    // Update fields if provided
    if (name) product.name = name;
    if (description) product.description = description;
    
    if (price !== undefined) {
      const priceValue = parseFloat(price);
      if (isNaN(priceValue) || priceValue <= 0) {
        return next(new ValidationError('Price must be a positive number'));
      }
      product.price = priceValue;
    }
    
    // Save updates
    await product.update();
    
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product: product.toJSON()
    });
  } catch (error) {
    next(new DatabaseError(`Failed to update product: ${error.message}`));
  }
};

// Delete a product
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if product exists
    const product = await Product.findById(id);
    if (!product) {
      return next(new NotFoundError('Product'));
    }
    
    // Delete product
    await Product.delete(id);
    
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(new DatabaseError(`Failed to delete product: ${error.message}`));
  }
};

// Search products using MongoDB
export const searchProducts = async (req, res, next) => {
    try {
      const { q, minPrice, maxPrice, sort } = req.query;
      const { page = 1, limit = 10 } = req.query;
      
      // Validate pagination parameters
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      
      if (isNaN(pageNum) || pageNum < 1) {
        return next(new ValidationError('Page must be a positive number'));
      }
      
      if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
        return next(new ValidationError('Limit must be between 1 and 100'));
      }
      
      // Validate price parameters if provided
      if (minPrice !== undefined) {
        const minPriceValue = parseFloat(minPrice);
        if (isNaN(minPriceValue) || minPriceValue < 0) {
          return next(new ValidationError('Minimum price must be a non-negative number'));
        }
      }
      
      if (maxPrice !== undefined) {
        const maxPriceValue = parseFloat(maxPrice);
        if (isNaN(maxPriceValue) || maxPriceValue < 0) {
          return next(new ValidationError('Maximum price must be a non-negative number'));
        }
      }
      
      // Use the SearchService to handle the search logic
      const filters = { q, minPrice, maxPrice, sort };
      const result = await SearchService.searchProducts(filters, pageNum, limitNum);
      
      res.status(200).json({
        success: true,
        ...result
      });
    } catch (error) {
      next(new DatabaseError(`Failed to search products: ${error.message}`));
    }
  };