import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import Home from '../features/home/Home';
import Account from '../features/account/Account';
import { me } from './store';

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      <Routes>
        {/* Render the homepage for both guest and logged-in users */}
        <Route path="/" element={<Home />} />

        {/* Render other routes conditionally based on login status */}
        {isLoggedIn && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/account" element={<Account />} />
            {/* Add other routes accessible only to logged-in users */}
          </>
        )}

        {/* Render routes accessible to guest users */}
        {!isLoggedIn && (
          <>
            <Route
              path="/login"
              element={<AuthForm name="login" displayName="Login" />}
            />
            <Route
              path="/signup"
              element={<AuthForm name="signup" displayName="Sign Up" />}
            />
            {/* Add other routes accessible to guest users */}
          </>
        )}
      </Routes>
    </div>
  );
};

export default AppRoutes;
