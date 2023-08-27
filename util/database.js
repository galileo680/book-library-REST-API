const Sequilize = require('sequelize');

const sequelize = new Sequilize('booklibrary', 'root', '1234', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
