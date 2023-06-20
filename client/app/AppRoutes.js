import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import Home from '../features/home/Home';
import { me } from './store';
import Flashcards from '../features/allFlashcards/Flashcards';
import SignIn from '../features/auth/SignInForm';
import SignUp from '../features/auth/SignUpForm';
import Profile from '../features/account/Profile';

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const loggedInUsername = useSelector((state) => state.auth.me.username);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/profile" element={<Profile username={loggedInUsername} />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
