import React, { useState, useEffect, Fragment } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import { v4 as uuidv4 } from "uuid";
import "./flashcards.css"; // Import the CSS file

const Flashcards = () => {
  const collectionRef = collection(db, "flashcards");
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [phrase, setPhrase] = useState("");
  const [category, setCategory] = useState("");
  const [translation, setTranslation] = useState("");
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const q = query(collectionRef);

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
        <div className="flashcard" key={uuidv4()}>
          <h2 className="phrase">{flashcard.phrase}</h2>
          <p className="category">{flashcard.category}</p>
          <p className="translation">{flashcard.translation}</p>
          <p className={`favorite ${flashcard.favorite ? "isFavorite" : ""}`}>
            {flashcard.favorite ? "Favorite" : "Not Favorite"}
          </p>
          <div>{/* Add delete and edit functionality if needed */}</div>
        </div>
      ))}
    </Fragment>
  );
};

export default Flashcards;
