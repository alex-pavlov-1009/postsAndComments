import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

let databaseUrl = process.env.DATABASE_URL;
if (process.env.NODE_ENV === 'test') {
  databaseUrl = process.env.DATABASE_TEST_URL;
}
const sequelize = new Sequelize(databaseUrl, { logging: false });
export default sequelize;
