import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


const AllFlashcards = () => {
  const dispatch = useDispatch();
  const flashcards = useSelector((state) => state.allFlashcards.flashcards);
  const status = useSelector((state) => state.allFlashcards.status);
  const error = useSelector((state) => state.allFlashCcrds.error);

  useEffect(() => {
    dispatch(fetchAllFlashcards());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading flashcards...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>All Flashcards</h2>
      {flashcards.map((flashcard) => (
        <div key={flashcard.id}>
          <p>{flashcard.phrase}</p>
          <p>{flashcard.translation}</p>
          <p>{flashcard.category}</p>
          {/* Add more flashcard properties as needed */}
        </div>
      ))}
    </div>
  );
};

export default AllFlashcards;
