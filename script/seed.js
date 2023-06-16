'use strict';

const { db, models: { User } } = require('../server/db');
const Flashcard = require('../server/db/models/Flashcard')

/**
 * seed - this function clears the database, updates tables to
 * match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ]);

  console.log(`Seeded ${users.length} users`);

  // Creating Flashcards
  const flashcards = await Promise.all([
    Flashcard.create({
      phrase: '你好',
      translation: 'Hello',
      category: 'Greetings',
      favorite: false,
    }),
    Flashcard.create({
      phrase: '謝謝',
      translation: 'Thank you',
      category: 'Expressions',
      favorite: false,
    }),
    // Add more flashcards here
  ]);

  console.log(`Seeded ${flashcards.length} flashcards`);
  console.log('Seeded successfully');

  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    flashcards,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('Seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('Closing db connection');
    await db.close();
    console.log('Db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// We export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
