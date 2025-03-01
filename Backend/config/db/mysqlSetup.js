import mysql from 'mysql2/promise'; 
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

let pool = null;
let dbName = null;

dotenv.config();

const initializeMySql = async () => {
  try {
    const setupPool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      connectionLimit: 5
    });
    
    dbName = process.env.DATABASE_NAME;
    
    await setupPool.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);

    const tablesSQL = fs.readFileSync(
      path.resolve(process.env.TABLES_SQL), 
      'utf8'
    );

    const sqlStatements = tablesSQL.split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);

      for (const statement of sqlStatements) {
        await setupPool.query(`USE \`${dbName}\``);
        await setupPool.query(statement);
      }
    
    await setupPool.end();
    
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: dbName,
      multipleStatements: true ,
      connectionLimit: 10
    });

    console.log('Database tables initialized');
    return pool;
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

const queryPool = async (sql, params = []) => {
  if (!pool) {
    throw new Error('Database not initialized. Call initialize() first.');
  }
  return pool.query(sql, params);
};

const getPool = async () => {
  if (!pool) {
    pool = await initialize();
  }
  return pool;
};

export { initializeMySql, getPool, queryPool};