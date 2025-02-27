import mysql from 'mysql';

const mysqlPool = mysql.createPool({
  host: process.env.MYSQL_HOST ,
  user: process.env.MYSQL_USER, 
  password: process.env.MYSQL_PASSWORD ,
  database: process.env.MYSQL_DATABASE ,
  connectionLimit: 10
});

const connectMysql = () => {
  return new Promise((resolve, reject) => {
    mysqlPool.getConnection((err, connection) => {
      if (err) {
        console.error('MySQL connection error:', err);
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