import { MongoClient } from 'mongodb';

const mongoUri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB;
let mongoClient = null;
let mongoDb = null;

const connectMongo = async () => {
  try {
    mongoClient = new MongoClient(mongoUri);
    await mongoClient.connect();
    mongoDb = mongoClient.db(dbName);
    console.log('MongoDB connection successful');
    return mongoDb;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};


const getCollection = (collectionName) => {
  if (!mongoDb) {
    throw new Error('MongoDB not connected');
  }
  return mongoDb.collection(collectionName);
};


export {
  connectMongo,
  getCollection
};