import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import allFlashcardsReducer from '../features/allFlashCards/AllFlashCards';


const store = configureStore({
  reducer: {
    auth: authReducer,
    allFlashcards: allFlashcardsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';

