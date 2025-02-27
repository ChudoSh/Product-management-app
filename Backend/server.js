import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.js';
import productRoutes from './routes/productRoute.js';
import  { initializeMySql } from './config/db/mysqlSetup.js';
import { initializeMongo } from './config/db/mongodbSetup.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

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