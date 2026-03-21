import 'reflect-metadata';
import { Sequelize } from 'sequelize-typescript';
import * as config from '../config/sequelize';
import Project from '../models/Project';
import User from '../models/User';

const env = (process.env.NODE_ENV as 'development' | 'test' | 'production') || 'development';
const sequelizeConfig = config[env];

const sequelize = new Sequelize({
  ...sequelizeConfig,
  models: [Project, User],
});

export { Project, User };
export default sequelize;
