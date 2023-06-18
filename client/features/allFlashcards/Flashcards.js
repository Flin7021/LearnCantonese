// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllFlashcards } from '../allFlashcards/allFlashcardsSlice';
// import firebase from '../../../config/firebase';

// const Flashcards = () => {
//   const dispatch = useDispatch();
//   const allFlashcards = useSelector((state) => state.allFlashcards.allFlashcards);
//   const status = useSelector((state) => state.allFlashcards.status);
//   const error = useSelector((state) => state.allFlashcards.error);
//   // const [flashcards, setFlashcards] = useState([]);

//   // const ref = firebase.firestore().collection("flashcards");
//   // console.log(ref)

//   useEffect(() => {
//     dispatch(fetchAllFlashcards());
//   }, [dispatch]);

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       {flashcards.map((flashcard) => (
//         <div key={flashcard.id}>
//           <p>Phrase: {flashcard.phrase}</p>
//           <p>Translation: {flashcard.translation}</p>
//           <p>Category: {flashcard.category}</p>
//           {/* Render other flashcard details */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Flashcards;
import React, { useState, useEffect, Fragment } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
import  {db } from "../../../config/firebase";
import { v4 as uuidv4 } from "uuid";

const Flashcards = () => {
  const collectionRef = collection(db, "flashcards");
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [phrase, setPhrase] = useState("");
  const [category, setCategory] = useState("");
  const [translation, setTranslation] = useState("");
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const q = query(
      collectionRef
      // where('title', '==', 'Flashcard1')
    );

    setLoading(true);
    const unsub = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setFlashcards(items);
      setLoading(false);

      console.log("Received data from Firestore:", items);
    });

    return () => {
      unsub();
    };
  }, []);

  async function addFlashcard() {
    const newFlashcard = {
      id: uuidv4(),
      phrase,
      category,
      translation,
      favorite,
    };

    try {
      const flashcardRef = doc(collectionRef, newFlashcard.id);
      await setDoc(flashcardRef, newFlashcard);
      setPhrase("");
      setCategory("");
      setTranslation("");
      setFavorite(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Fragment>
      <h1>Flashcards (SNAPSHOT adv.)</h1>
      <div className="inputBox">
        <h3>Add New</h3>
        <h6>Phrase</h6>
        <input
          type="text"
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
        />
        <h6>Category</h6>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <h6>Translation</h6>
        <input
          type="text"
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
        />
        <h6>Favorite</h6>
        <input
          type="checkbox"
          checked={favorite}
          onChange={(e) => setFavorite(e.target.checked)}
        />
        <button onClick={addFlashcard}>Add Flashcard</button>
      </div>
      <hr />
      {loading ? <h1>Loading...</h1> : null}
      {flashcards.map((flashcard) => (
        <div className="flashcard" key={flashcard.id}>
          <h2>{flashcard.phrase}</h2>
          <p>{flashcard.category}</p>
          <p>{flashcard.translation}</p>
          <p>{flashcard.favorite ? "Favorite" : "Not Favorite"}</p>
          <div>{/* Add delete and edit functionality if needed */}</div>
        </div>
      ))}
    </Fragment>
  );
};

export default Flashcards;
