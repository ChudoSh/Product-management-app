import fs from 'fs';
import path from 'path';
import { query } from '../config/db/MySql.js';

const setupDatabase = async () => {
  try {
    // Read and execute Database.sql
    const databaseSQL = fs.readFileSync(
      path.resolve('Database/Schemas/Database.sql'), 
      'utf8'
    );
    await query(databaseSQL, []);
    
    // Read and execute Tables.sql
    const tablesSQL = fs.readFileSync(
      path.resolve('Database/Schemas/Tables.sql'), 
      'utf8'
    );
    await query(tablesSQL, []);
    
    console.log('MySQL database and tables created successfully');
  } catch (error) {
    console.error('Error setting up MySQL database:', error);
  }
};

export default setupDatabase;