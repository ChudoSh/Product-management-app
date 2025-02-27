import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.js';
import productRoutes from './routes/productRoute.js';
import { connectMysql } from './config/db/MySql.js';
import { connectMongo } from './config/db/MongoDB.js';
import { setupMySQL } from './utils/setupMySql.js'
import { setupMongoDB } from './utils/setupMongoDB.js'

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Database connections and server startup
const startServer = async () => {
  try {
    await connectMysql();
    await connectMongo();

    await setupMySQL();
    await setupMongoDB();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();