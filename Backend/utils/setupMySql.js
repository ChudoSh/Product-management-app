import fs from 'fs';
import path from 'path';
import { query } from '../config/db/MySql.js';
import dotenv from 'dotenv';

dotenv.config();

const setupDatabase = async () => {
  try {
    const databaseSQL = fs.readFileSync(
      path.resolve(process.env.DATABASE_SQL), 
      'utf8'
    );
    await query(databaseSQL, []);
    
    const tablesSQL = fs.readFileSync(
      path.resolve(process.env.TABLES_SQL), 
      'utf8'
    );
    await query(tablesSQL, []);
    
    console.log('MySQL database and tables created successfully');
  } catch (error) {
    console.error('Error setting up MySQL database:', error);
  }
};

export default setupDatabase;