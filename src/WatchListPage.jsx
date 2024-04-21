import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';


function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    displayWatchlist();
  }, []);

  const displayWatchlist = () => {
    let storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(storedWatchlist);
  };

  const removeFromWatchlist = (itemToRemove) => {
    let updatedWatchlist = watchlist.filter(item => item.title !== itemToRemove.title);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    setWatchlist(updatedWatchlist);
  };

  // accessing user details
  const storedUser = sessionStorage.getItem('user');
  const user = JSON.parse(storedUser);
  const userName = user ? user.email.substring(0, user.email.indexOf('@')) : "Guest";


  return (
    <>
      <NavBar userName={userName} />
      {/* Watchlist Content */}
      <div className="container">
        <h1>My Watchlist</h1>
        <div id="watchlist" className="grid-container">
          {watchlist.map(item => (
            <div key={item.title} className="watchlist-item">
              <h3>{item.title}</h3>
              <p>Type: {item.type}</p>
              <p>Genre: {item.genre.join(', ')}</p>
              <p>Year: {item.year}</p>
              <p>Rating: {item.rating}</p>
              <button className="remove-from-watchlist-btn" onClick={() => removeFromWatchlist(item)}>Remove from List</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default WatchlistPage;
