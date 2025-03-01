import { MongoClient } from 'mongodb';

let client = null;
let db = null;

const initializeMongo = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.DATABASE_NAME;
    
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    
    await setupCollections(db);
    
    console.log('MongoDB initialized: connected and indexes created in collection:',dbName);
    return db;
  } catch (error) {
    console.error('MongoDB initialization error:', error);
    throw error;
  }
};

async function setupCollections(db) {
  const productsCollection = db.collection('products');
  
  await productsCollection.createIndex(
    { name: 'text', description: 'text' },
    { weights: { name: 10, description: 5 } }
  );
  
  await productsCollection.createIndex({ product_id: 1 }, { unique: true });
  await productsCollection.createIndex({ price: 1 });
  await productsCollection.createIndex({ created_at: -1 });
}

const getCollection = (name) => {
  if (!db) {
    throw new Error('MongoDB not initialized. Call initialize() first.');
  }
  return db.collection(name);
};

const close = async () => {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
};

export { initializeMongo, getCollection, close };