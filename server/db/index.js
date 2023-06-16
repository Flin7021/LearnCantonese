const Sequelize = require('sequelize');
const db = require('./db');
const User = require('./models/User');
const FlashCard = require('./models/Flashcard')

// Establish associations
User.hasMany(FlashCard);
FlashCard.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    FlashCard,
  },
};
