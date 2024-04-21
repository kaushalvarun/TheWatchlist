import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';


function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const user = {
        email: email,
        loggedIn: loggedIn,
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Perform validation
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!validatePassword(password)) {
            return;
        }

        // Handle successful login 
        console.log('Login successful');
        sessionStorage.setItem('user', JSON.stringify(user));
        setLoggedIn(true);
    };

    // Function to validate email 
    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    // Function to validate password  
    const validatePassword = (password) => {
        let passRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        if (!passRe.test(password)) {
            if (password.length < 8) {
                alert("Password must be at least 8 characters long.");
            } else if (!/(?=.*[a-z])/.test(password)) {
                alert("Password must contain at least one lowercase letter.");
            } else if (!/(?=.*[A-Z])/.test(password)) {
                alert("Password must contain at least one uppercase letter.");
            } else if (!/(?=.*\d)/.test(password)) {
                alert("Password must contain at least one digit.");
            } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
                alert("Password must contain at least one special character (!@#$%^&*).");
            }
            return false;
        }
        return true;
    };

    if (loggedIn) {
        return <Navigate to="/search-and-results" state = {user}/>;
    }

    return (
        <>
            <nav>
                <ul>
                    <li>&nbsp;</li>
                </ul>
                <ul>
                    <li>&nbsp;</li>
                </ul>
            </nav>
            <div className="container">
                <header>
                    <h1>TheWatchlist</h1>
                    <h3>Your Movie/TV Show Recommender</h3>
                </header>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <button type="submit">Login</button>
                    </div>
                </form>
                <footer>
                    <p>TheWatchList &copy;{new Date().getFullYear()}</p>
                </footer>
            </div>
        </>
    );
}

export default LoginPage;
