const Sequilize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequilize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'mysql',
    host: 'localhost',
  }
);

module.exports = sequelize;
