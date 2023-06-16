import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllFlashcards } from './allFlashCardsSlice';

const AllFlashcards = () => {
  const dispatch = useDispatch();
  const flashcards = useSelector((state) => state.allFlashcards.flashcards);
  const status = useSelector((state) => state.allFlashcards.status);
  const error = useSelector((state) => state.allFlashCards.error);

  useEffect(() => {
    dispatch(fetchAllFlashcards());
  }, [dispatch]);


  return (
    <div>
      <h2>All Flashcards</h2>
      {flashcards.map((flashcard) => (
        <div key={flashcard.id}>
          <p>{flashcard.phrase}</p>
          <p>{flashcard.translation}</p>
          <p>{flashcard.category}</p>
          <p>{flashcard.favorite}</p>
        </div>
      ))}
    </div>
  );
};

export default AllFlashcards;
