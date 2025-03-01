// Modify Backend/server.js to include error handling

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.js';
import productRoutes from './routes/productRoute.js';
import { initializeMySql } from './config/db/mysqlSetup.js';
import { initializeMongo } from './config/db/mongodbSetup.js';
import { errorHandler } from './utils/errorHandler.js';
import { NotFoundError } from './utils/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Handle undefined routes
app.use((req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Global error handling middleware
app.use(errorHandler);

const startServer = async () => {
  try {
    await initializeMySql();
    await initializeMongo(); 
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();