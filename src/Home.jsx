import { Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import './home.css'; 

function Home() {
    const [logInPressed, setLogInPressed] = useState(false);
    const navigateToLogin = () => {
        setLogInPressed(true);
    };
  
    const currentYear = new Date().getFullYear(); 

    if (logInPressed) {
        return <Navigate to="/auth"/>;
    }
  
    return (
      <div className="Home"> 
        <header className="App-header">
          <h1>Welcome to <span className="highlight">TheWatchlist</span></h1>
          <p className="subtitle">We aim to revolutionize the way users engage with and consume entertainment content.</p>
        </header>
        <main>
          <section className="features">
            <ul>
              <li>Discover and explore your favorite movies and TV shows</li>
              <li>Track your watched content</li>
              <li>Use advanced search and top available resources</li>
            </ul>
          </section>

          <section className="login-section">
            <button className="login-button" onClick={navigateToLogin}>Log-in</button>
          </section>
        </main>
        <footer>
          <p>&copy; {currentYear} TheWatchlist</p> 
        </footer>
      </div>
    );
}

export default Home;
