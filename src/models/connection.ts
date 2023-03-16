import mysql from 'mysql2/promise';
import config from '../config';

const connection = mysql.createPool({
  host: config.MYSQL_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
});

export default connection;
// import dotenv from 'dotenv';
// import mysql from 'mysql2/promise';

// dotenv.config();

// const connection = mysql.createPool({
//   host: process.env.MYSQL_HOST || 'db',
//   user: process.env.MYSQL_USER || 'root',
//   password: process.env.MYSQL_PASSWORD || 'password',
// }); // sua conexão NÃO deve ter o database, este deve ser especificado em cada query

// export default connection;