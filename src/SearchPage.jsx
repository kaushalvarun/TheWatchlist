import React, { useState, useEffect } from 'react';
import dummyData from "./Data.jsx";
import NavBar from './NavBar';


function SearchPage() {
    // Accessing user details
    const storedUser = sessionStorage.getItem('user');
    const user = JSON.parse(storedUser);

    const [searchInput, setSearchInput] = useState('');
    const [genreFilters, setGenreFilters] = useState([]);
    const [ratingFilter, setRatingFilter] = useState(0);
    const [yearMin, setYearMin] = useState('');
    const [yearMax, setYearMax] = useState('');
    const [typeMovie, setTypeMovie] = useState(false);
    const [typeTVShow, setTypeTVShow] = useState(false);
    const [results, setResults] = useState([]);

    useEffect(() => {
        applyFilters();
    }, [genreFilters, ratingFilter, yearMin, yearMax, typeMovie, typeTVShow]);

    const handleSearch = (event) => {
        event.preventDefault();
        applyFilters();
    };

    const handleGenreChange = (event, genre) => {
        if (event.target.checked) {
            setGenreFilters([...genreFilters, genre]);
        } else {
            setGenreFilters(genreFilters.filter(item => item !== genre));
        }
    };

    const applyFilters = () => {
        let searchResults = dummyData.filter(item => {
            if (searchInput && !item.title.toLowerCase().includes(searchInput.toLowerCase())) {
                return false;
            }

            if (genreFilters.length > 0 && !genreFilters.every(genre => item.genre.includes(genre))) {
                return false;
            }

            if (ratingFilter > 0 && item.rating < ratingFilter) {
                return false;
            }

            if (yearMin && item.year < parseInt(yearMin)) {
                return false;
            }

            if (yearMax && item.year > parseInt(yearMax)) {
                return false;
            }

            if ((typeMovie && item.type !== "Movie") || (typeTVShow && item.type !== "TV Show")) {
                return false;
            }

            return true;
        });

        setResults(searchResults);
    };
    const addToWatchlist = (item) => {
        let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        watchlist.push(item);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        applyFilters();
    };

    const createResultItem = (item) => {
        const alreadyInWatchlist = isInWatchlist(item);

        return (
            <div key={item.title} className="result-item">
                <h3>{item.title}</h3>
                <p>Type: {item.type}</p>
                <p>Genre: {item.genre.join(', ')}</p>
                <p>Year: {item.year}</p>
                <p>Rating: {item.rating}</p>
                {alreadyInWatchlist ? (
                    <p><br /><b>Added to Watchlist</b></p>
                ) : (
                    <button className="add-to-watchlist-btn" onClick={() => addToWatchlist(item)}>Add to List</button>
                )}
            </div>
        );
    };

    const isInWatchlist = (item) => {
        let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        return watchlist.some(watchlistItem => watchlistItem.title === item.title);
    };

    const userName = user ? user.email.substring(0, user.email.indexOf('@')) : "Guest";
    return (
        <>
            <NavBar userName={userName} />
            <div id="search">
                <form onSubmit={handleSearch}>
                    <h3>Welcome, {userName}</h3>

                    <h1>Search for Movies/TV Shows</h1>
                    <div className="form-group">
                        <input type="text" id="searchInput" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search by title, actor, director..." />
                        <button type="submit">Search</button>
                    </div>
                    <div id="filters">
                        <div className="genre-group">
                            <fieldset>
                                <legend>Genre:</legend>
                                <div className="checkbox-group">
                                    {['Drama', 'Crime', 'Comedy', 'Romance', 'Fantasy', 'Horror', 'Animation', 'Adventure', 'Sci-Fi', 'Thriller', 'Action', 'Mystery', 'Biography', 'History'].map(genre => (
                                        <div key={genre}>
                                            <input type="checkbox" id={`genre${genre}`} value={genre} onChange={(e) => handleGenreChange(e, genre)} checked={genreFilters.includes(genre)} />
                                            <label htmlFor={`genre${genre}`}>{genre}</label>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>
                        </div>
                        <div className="other-filters">
                            <fieldset>
                                <b>Rating:</b>
                                <input type="range" id="ratingFilter" min="0" max="10" step="0.5" value={ratingFilter} onChange={(e) => setRatingFilter(parseFloat(e.target.value))} />
                                <output htmlFor="ratingFilter">{ratingFilter}+</output>
                            </fieldset>
                            <fieldset>
                                <b>Year:</b>
                                <input type="number" id="yearMin" placeholder="Min" value={yearMin} onChange={(e) => setYearMin(e.target.value)} />
                                <input type="number" id="yearMax" placeholder="Max" value={yearMax} onChange={(e) => setYearMax(e.target.value)} />
                            </fieldset>
                            <fieldset className="type-filter">
                                <b>Type:</b>
                                <input type="checkbox" id="typeMovie" value="Movie" onChange={(e) => setTypeMovie(e.target.checked)} checked={typeMovie} />
                                <label htmlFor="typeMovie">Movie</label>
                                <input type="checkbox" id="typeTVShow" value="TV Show" onChange={(e) => setTypeTVShow(e.target.checked)} checked={typeTVShow} />
                                <label htmlFor="typeTVShow">TV Show</label>
                            </fieldset>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </form>
            </div>
            <div id="results" className="grid-container">
                {results.map(result => createResultItem(result))}
            </div>
        </>
    );
}

export default SearchPage;
