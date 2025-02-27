import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const mysqlPool = mysql.createPool({
  host: process.env.MYSQL_HOST ,
  user: process.env.MYSQL_USER, 
  password: process.env.MYSQL_PASSWORD ,
  connectionLimit: 10
});

const connectMysql = () => {
  console.log('Attempting to connect to MySQL with settings:', {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD ? '[REDACTED]' : 'undefined'
  });

  return new Promise((resolve, reject) => {
    mysqlPool.getConnection((err, connection) => {
      if (err) {
        console.error('MySQL connection error:', err);
        console.error('Connection Parameters:', {
          host: process.env.MYSQL_HOST,
          user: process.env.MYSQL_USER
        });
        reject(err);
        return;
      }
      
      console.log('MySQL connection successful');
      connection.release();
      resolve();
    });
  });
};

const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    mysqlPool.query(sql, params, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};

export {
    mysqlPool,
    connectMysql,
    query
}