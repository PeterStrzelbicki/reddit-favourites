import React, { useState, useEffect } from 'react';
import './App.css';
import SubredditForm from './components/SubredditForm';
import FavouritesList from './components/FavouritesList';

function App() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavourites(favs);
  }, []);

  const addFavourite = (postId) => {
    const newFavourites = favourites.includes(postId) ? favourites.filter(id => id !== postId) : [...favourites, postId];
    setFavourites(newFavourites);
    localStorage.setItem('favourites', JSON.stringify(newFavourites));
  };

  const removeFavourite = (postId) => {
    const newFavourites = favourites.filter(id => id !== postId);
    setFavourites(newFavourites);
    localStorage.setItem('favourites', JSON.stringify(newFavourites));
  };

  return (
    <div className="App">
      <SubredditForm addFavourite={addFavourite} />
      <FavouritesList favourites={favourites} removeFavourite={removeFavourite} />
    </div>
  );
}

export default App;
