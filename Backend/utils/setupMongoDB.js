// utils/setupMongoDB.js
import { connectMongo, getCollection } from '../config/db/MongoDB.js';

const setupMongoDB = async () => {
  try {
    await connectMongo();
    
    // Create products collection if it doesn't exist
    const productsCollection = getCollection('products');
    
    // Create text index for search functionality
    await productsCollection.createIndex(
      { name: 'text', description: 'text' },
      { weights: { name: 10, description: 5 } }
    );
    
    // Create additional indexes for performance
    await productsCollection.createIndex({ product_id: 1 }, { unique: true });
    await productsCollection.createIndex({ price: 1 });
    await productsCollection.createIndex({ created_at: -1 });
    
    console.log('MongoDB collections and indexes created successfully');
  } catch (error) {
    console.error('Error setting up MongoDB:', error);
  }
};

export default setupMongoDB;