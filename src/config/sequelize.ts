import dotenv from 'dotenv';
import { Options } from 'sequelize';

dotenv.config();

const { DB_HOST, DB_PORT = 5432, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const defaultConfig: Options = {
  dialect: 'sqlite',
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  port: Number(DB_PORT),
  storage: './data/portfolio.db',
};

export const development: Options = {
  ...defaultConfig,
  logging: false,
};

export const test: Options = {
  ...defaultConfig,
  logging: false,
};

export const production: Options = {
  ...defaultConfig,
  logging: false,
};
