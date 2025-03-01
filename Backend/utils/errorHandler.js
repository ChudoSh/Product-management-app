class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    Error.captureStackTrace(this, this.constructor);
  }
}

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

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  console.error(`Error [${statusCode}]: ${err.message}`);
  if (statusCode === 500) console.error(err.stack);
  
  res.status(statusCode).json({
    success: false,
    message: err.message,
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