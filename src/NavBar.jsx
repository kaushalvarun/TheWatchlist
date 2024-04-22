import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar({ userName }) {
    const navigate = useNavigate();
    const handleSignOut = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <nav>
            <ul>
                <li className="navbar-btn" ><Link to="/search-and-results">Search</Link></li>
                <li className="navbar-btn"><Link to="/my-watchlist">My List</Link></li>


                <li className="dropdown">
                    <button className="navbar-btn">{userName}</button>
                    <div className="dropdown-content">
                        <Link to="/profile" className="drop-btn">Profile Details</Link>
                        <Link to="/my-watchlist" className="drop-btn">My List</Link>
                        <button className="drop-btn" onClick={handleSignOut}>Sign Out</button>
                    </div>
                </li>
            </ul>

        </nav>
    );
}

export default NavBar;
