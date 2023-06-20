import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {

  apiKey: "AIzaSyDESu0QQal3OTJ3INjhJ_YHn75TTqEnehY",

  authDomain: "learn-cantonese-27f20.firebaseapp.com",

  databaseURL: "https://learn-cantonese-27f20-default-rtdb.firebaseio.com",

  projectId: "learn-cantonese-27f20",

  storageBucket: "learn-cantonese-27f20.appspot.com",

  messagingSenderId: "439642525552",

  appId: "1:439642525552:web:3baa9205fbdc8229d889b5",

  measurementId: "G-FJQFS7R570"

};

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth()

// export default getFirestore(app);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
