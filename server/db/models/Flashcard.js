const Sequelize = require('sequelize');
const db = require('../db');

const Flashcard = db.define('flashcard', {
  phrase: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  translation: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
  },
  favorite: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Flashcard;
