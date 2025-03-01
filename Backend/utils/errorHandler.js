// Backend/utils/errorHandler.js

// Base application error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Common error types
class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
  }
}

class AuthenticationError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 401);
  }
}

class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404);
  }
}

class DatabaseError extends AppError {
  constructor(message = 'Database operation failed') {
    super(message, 500);
  }
}

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  // Log error for server-side debugging
  console.error(`Error [${statusCode}]: ${err.message}`);
  if (statusCode === 500) console.error(err.stack);
  
  // Send response to client
  res.status(statusCode).json({
    success: false,
    message: err.message,
    // Include additional details if available
    errors: err.errors || undefined
  });
};

export {
  AppError,
  ValidationError,
  AuthenticationError,
  NotFoundError,
  DatabaseError,
  errorHandler
};