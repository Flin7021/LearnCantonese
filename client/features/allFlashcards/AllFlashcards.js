import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllFlashcards } from './AllFlashcardsSlice';

const AllFlashcards = () => {
  const flashcards = useSelector((state) => state.flashcards.allFlashcards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllFlashcards());
  }, [dispatch]);

  return (
    <div>
      <h1>Flashcards</h1>
      <ul>
        {flashcards.map((flashcard) => (
          <li key={flashcard.id}>
            <h3>{flashcard.phrase}</h3>
            <p>
              <strong>Translation:</strong> {flashcard.translation}
            </p>
            <p>
              <strong>Category:</strong> {flashcard.category}
            </p>
            <p>
              <strong>Favorite:</strong> {flashcard.favorite ? 'Yes' : 'No'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllFlashcards;
