import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import Home from '../features/home/Home';
import { me } from './store';
import Flashcards from '../features/allFlashcards/Flashcards';

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Render login route for guests */}
        {!isLoggedIn && <Route path="/login" element={<AuthForm name="login" displayName="Login" />} />}

        {/* Render flashcards on the home page for both guests and logged-in users */}
        <Route path="/flashcards" element={<Flashcards />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
