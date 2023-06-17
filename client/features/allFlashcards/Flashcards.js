import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFlashcards } from '../allFlashcards/allFlashcardsSlice';

const Flashcards = () => {
  const dispatch = useDispatch();
  const allFlashcards = useSelector((state) => state.allFlashcards.allFlashcards);
  const status = useSelector((state) => state.allFlashcards.status);
  const error = useSelector((state) => state.allFlashcards.error);

  useEffect(() => {
    dispatch(fetchAllFlashcards());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {allFlashcards.map((flashcard) => (
        <div key={flashcard.id}>
          <p>Phrase: {flashcard.phrase}</p>
          <p>Translation: {flashcard.translation}</p>
          <p>Category: {flashcard.category}</p>
          {/* Render other flashcard details */}
        </div>
      ))}
    </div>
  );
};

export default Flashcards;
