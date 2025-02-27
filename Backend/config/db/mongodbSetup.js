// config/db/MongoDB.js
import { MongoClient } from 'mongodb';

let client = null;
let db = null;

const initializeMongo = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.DATABASE_NAME;
    
    // Connect to MongoDB
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    
    // Create collections and indexes in one operation
    await setupCollections(db);
    
    console.log('MongoDB initialized: connected and indexes created');
    return db;
  } catch (error) {
    console.error('MongoDB initialization error:', error);
    throw error;
  }
};

// Collection and index setup
async function setupCollections(db) {
  // Ensure products collection exists
  const productsCollection = db.collection('products');
  
  // Create text indexes for search functionality
  await productsCollection.createIndex(
    { name: 'text', description: 'text' },
    { weights: { name: 10, description: 5 } }
  );
  
  // Create other helpful indexes
  await productsCollection.createIndex({ product_id: 1 }, { unique: true });
  await productsCollection.createIndex({ price: 1 });
  await productsCollection.createIndex({ created_at: -1 });
}

// Helper to get a collection
const getCollection = (name) => {
  if (!db) {
    throw new Error('MongoDB not initialized. Call initialize() first.');
  }
  return db.collection(name);
};

// Close connection (useful for tests or graceful shutdown)
const close = async () => {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
};

export { initializeMongo, getCollection, close };