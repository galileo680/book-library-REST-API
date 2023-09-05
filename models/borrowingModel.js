const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Borrowing = sequelize.define('Borrowing', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  borrowedDate: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  dueDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  returnedDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

module.exports = Borrowing;
