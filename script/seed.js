// 'use strict';

// const admin = require("firebase-admin");
// const serviceAccount = require("../config/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://learn-cantonese-27f20-default-rtdb.firebaseio.com"
// });

// const db = admin.firestore();
// const usersCollection = db.collection('users');
// const flashcardsCollection = db.collection('flashcards');

// async function seed() {
//   console.log('db synced!');

//   // Creating Users
//   const users = await Promise.all([
//     usersCollection.add({ username: 'cody', password: '123' }),
//     usersCollection.add({ username: 'murphy', password: '123' }),
//   ]);

//   console.log(`Seeded ${users.length} users`);

//   // Creating Flashcards
//   const flashcards = await Promise.all([
//     flashcardsCollection.add({
//       phrase: '你好',
//       translation: 'Hello',
//       category: 'Greetings',
//       favorite: false,
//     }),
//     flashcardsCollection.add({
//       phrase: '謝謝',
//       translation: 'Thank you',
//       category: 'Expressions',
//       favorite: false,
//     }),
//     // Add more flashcards here
//   ]);

//   console.log(`Seeded ${flashcards.length} flashcards`);
//   console.log('Seeded successfully');

//   return {
//     users,
//     flashcards,
//   };
// }

// async function runSeed() {
//   console.log('Seeding...');
//   try {
//     await seed();
//   } catch (err) {
//     console.error(err);
//     process.exitCode = 1;
//   } finally {
//     console.log('Closing db connection');
//     console.log('Db connection closed');
//   }
// }

// if (module === require.main) {
//   runSeed();
// }

// module.exports = seed;
'use strict';

const admin = require("firebase-admin");
const serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://learn-cantonese-27f20-default-rtdb.firebaseio.com"
});

const db = admin.firestore();
const flashcardsCollection = db.collection('flashcards');

async function seed() {
  console.log('db synced!');

  // Creating Flashcards
  const flashcards = [];

  console.log(`Seeded ${flashcards.length} flashcards`);
  console.log('Seeded successfully');

  return {
    flashcards,
  };
}


async function runSeed() {
  console.log('Seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('Closing db connection');
    console.log('Db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
