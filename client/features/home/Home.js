import React from 'react';
import { useSelector } from 'react-redux';
import './home.css'

const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div className="home-container">
      {isLoggedIn ? (
        <h3>Welcome, {username}</h3>
      ) : (
        <h3>Welcome, Guest</h3>
      )}
    </div>
  );
};

export default Home;
