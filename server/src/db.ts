import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
dotenv.config();
const { DB_NAME, DB_PASSWORD, DB_HOST, DB_USER } = process.env;

const sequelize = new Sequelize({
  database: DB_NAME,
  dialect: 'postgres',
  password: DB_PASSWORD,
  username: DB_USER,
  host: DB_HOST,
  port: 5432,
  models: [__dirname + '/models'],
  logging: false,
  native: false
});

export default sequelize;
