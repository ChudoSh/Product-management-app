
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.js';
import productRoutes from './routes/productRoute.js';
import { initializeMySql } from './config/db/mysqlSetup.js';
import { initializeMongo } from './config/db/mongodbSetup.js';
import { errorHandler } from './utils/errorHandler.js';
import { NotFoundError } from './utils/errorHandler.js';
import { insertMockProducts } from './utils/mockData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173', 
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.use((req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await initializeMySql();
    await initializeMongo(); 
    await insertMockProducts();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();