import React from 'react';
import { useSelector } from 'react-redux';

const Account = () => {
  const user = useSelector((state) => state.auth.me); // Assuming `state.auth.me` contains the user object

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <h3>Your Favorites:</h3>
      <ul>
        {user.favorites.map((favorite) => (
          <li key={favorite.id}>{favorite.phrase}</li>
        ))}
      </ul>
    </div>
  );
};

export default Account;
