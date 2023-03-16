import 'dotenv/config';

const config = {
  MYSQL_HOST: process.env.MYSQL_HOST || 'db',
  DB_USER: process.env.MYSQL_USER || 'root',
  DB_PASSWORD: process.env.MYSQL_PASSWORD || 'password',
  JWT_SECRET: process.env.JWT_SECRET || 'batata',
};

export default config;