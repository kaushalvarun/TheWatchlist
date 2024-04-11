/* Placeholder data for movies and TV shows */
const mediaData = [
    {
        title: "Breaking Bad",
        type: "TV Show",
        genre: ["Drama", "Crime"],
        year: 2008,
        rating: 9.5
    },
    {
        title: "Game of Thrones",
        type: "TV Show",
        genre: ["Fantasy", "Drama"],
        year: 2011,
        rating: 9.3
    },
    {
        title: "The Godfather",
        type: "Movie",
        genre: ["Crime", "Drama"],
        year: 1972,
        rating: 9.2
    },
    {
        title: "The Dark Knight",
        type: "Movie",
        genre: ["Action", "Crime", "Drama"],
        year: 2008,
        rating: 9.0
    },
    {
        title: "Pulp Fiction",
        type: "Movie",
        genre: ["Crime", "Drama"],
        year: 1994,
        rating: 8.9
    },
    {
        title: "Friends",
        type: "TV Show",
        genre: ["Comedy", "Romance"],
        year: 1994,
        rating: 8.9
    },
    {
        title: "The Shawshank Redemption",
        type: "Movie",
        genre: ["Drama"],
        year: 1994,
        rating: 9.3
    },
    {
        title: "The Office",
        type: "TV Show",
        genre: ["Comedy"],
        year: 2005,
        rating: 8.9
    },
    {
        title: "Inception",
        type: "Movie",
        genre: ["Action", "Adventure", "Sci-Fi"],
        year: 2010,
        rating: 8.8
    },

    {
        title: "Interstellar",
        type: "Movie",
        genre: ["Adventure", "Drama", "Sci-Fi"],
        year: 2014,
        rating: 8.6
    },
    {
        title: "The Crown",
        type: "TV Show",
        genre: ["Biography", "Drama", "History"],
        year: 2016,
        rating: 8.6
    },
    {
        title: "Forrest Gump",
        type: "Movie",
        genre: ["Drama", "Romance"],
        year: 1994,
        rating: 8.8
    },
    {
        title: "The Mandalorian",
        type: "TV Show",
        genre: ["Action", "Adventure", "Fantasy"],
        year: 2019,
        rating: 8.7
    },
    {
        title: "The Matrix",
        type: "Movie",
        genre: ["Action", "Sci-Fi"],
        year: 1999,
        rating: 8.7
    },
    {
        title: "Sherlock",
        type: "TV Show",
        genre: ["Crime", "Drama", "Mystery"],
        year: 2010,
        rating: 9.1
    },
    {
        title: "The Silence of the Lambs",
        type: "Movie",
        genre: ["Crime", "Drama", "Thriller"],
        year: 1991,
        rating: 8.6
    },
    {
        title: "Stranger Things",
        type: "TV Show",
        genre: ["Drama", "Fantasy", "Horror"],
        year: 2016,
        rating: 8.7
    },
    {
        title: "The Lion King",
        type: "Movie",
        genre: ["Animation", "Adventure", "Drama"],
        year: 1994,
        rating: 8.5
    }
];

document.addEventListener('DOMContentLoaded', function () {
    /* Search page */
    // Retrieve user email from sessionStorage
    const userEmail = sessionStorage.getItem('userEmail');

    // Display user email on the page
    const userEmailElement = document.getElementById('userEmail');
    if (userEmail) {
        userEmailElement.textContent = `Welcome ${userEmail}`;
    }
    const resultsContainer = document.getElementById('results');
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const applyFiltersButton = document.getElementById('applyFiltersButton');


    // Function to handle clicks for Add to List buttons
    const addToWatchlist = function (item) {
        let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        watchlist.push(item);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    };


    // Function to check if item is already in watchlist
    function isInWatchlist(item) {
        let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        return watchlist.some(watchlistItem => watchlistItem.title === item.title);
    }

    // Function to create element for each search result item
    const createResultItem = function (item) {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');

        let alreadyInWatchlist = isInWatchlist(item);

        if (alreadyInWatchlist) {
            resultItem.innerHTML = `
            <h3>${item.title}</h3>
            <p>Type: ${item.type}</p>
            <p>Genre: ${item.genre.join(', ')}</p>
            <p>Year: ${item.year}</p>
            <p>Rating: ${item.rating}</p>
            <p><br><b>Added to Watchlist<b></p>
        `;
        } else {
            resultItem.innerHTML = `
            <h3>${item.title}</h3>
            <p>Type: ${item.type}</p>
            <p>Genre: ${item.genre.join(', ')}</p>
            <p>Year: ${item.year}</p>
            <p>Rating: ${item.rating}</p>
            <button class="add-to-watchlist-btn">Add to List</button>
        `;
        }

        // Add event listener to the result item
        resultItem.addEventListener('click', function () {
            if (!alreadyInWatchlist) {
                addToWatchlist(item);
                alreadyInWatchlist = true;
                resultItem.innerHTML = `
                <h3>${item.title}</h3>
                <p>Type: ${item.type}</p>
                <p>Genre: ${item.genre.join(', ')}</p>
                <p>Year: ${item.year}</p>
                <p>Rating: ${item.rating}</p>
                <p><br><b>Added to Watchlist<b></p>
            `;
            }
        });
        return resultItem;
    };


    // Function to display search results
    const displaySearchResults = function (results) {
        resultsContainer.innerHTML = '';
        results.forEach(function (item) {
            const resultItem = createResultItem(item);
            resultsContainer.appendChild(resultItem);
        });
    };

    // Function to perform the search
    const search = function () {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredMedia = mediaData.filter(function (media) {
            return media.title.toLowerCase().includes(searchTerm) || searchTerm === '';
        });

        displaySearchResults(filteredMedia);
    };


    // Function to apply filters
    function applyFilters() {
        const selectedGenres = Array.from(document.querySelectorAll(".checkbox-group input[type='checkbox']:checked")).map(checkbox => checkbox.value);
        const minRating = parseFloat(document.getElementById("ratingFilter").value);
        const minYear = parseInt(document.getElementById("yearMin").value) || 0;
        const maxYear = parseInt(document.getElementById("yearMax").value) || Infinity;
        const selectedTypes = Array.from(document.querySelectorAll(".type-filter input[type='checkbox']:checked")).map(checkbox => checkbox.value);

        // Filter the media data based on the selected filters
        const filteredMedia = mediaData.filter(media => {
            // genre filter
            const passGenreFilter = selectedGenres.length === 0 || selectedGenres.some(genre => media.genre.includes(genre));

            // rating filter
            const passRatingFilter = media.rating >= minRating;

            // year filter
            const passYearFilter = media.year >= minYear && media.year <= maxYear;

            // type filter
            const passTypeFilter = selectedTypes.length === 0 || selectedTypes.includes(media.type);

            // Include the media item only if it passes all filters
            return passGenreFilter && passRatingFilter && passYearFilter && passTypeFilter;
        });

        // Display filtered results
        displaySearchResults(filteredMedia);
    }

    // Event listener for apply filters button click
    applyFiltersButton.addEventListener('click', applyFilters);

    // Event listener for search button click
    searchButton.addEventListener('click', search);

    // Event listener for pressing Enter in the search input
    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            search();
        }
    });

    // Display all results initially
    search();
});

// Function to update rating value displayed
function updateRatingValue() {
    const ratingValue = document.getElementById("ratingFilter").value;
    const ratingOutput = document.getElementById("ratingOutput");
    ratingOutput.textContent = ratingValue >= 10 ? '10.0+' : ratingValue + '+';
}


/* Watchlist */

// Function to display watchlist items
function displayWatchlist() {
    const watchlistContainer = document.getElementById("watchlist");
    watchlistContainer.innerHTML = '';

    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    watchlist.forEach(item => {
        const watchlistItem = document.createElement('div');
        watchlistItem.classList.add('watchlist-item');
        watchlistItem.innerHTML = `
            <h3>${item.title}</h3>
            <p>Type: ${item.type}</p>
            <p>Genre: ${item.genre.join(', ')}</p>
            <p>Year: ${item.year}</p>
            <p>Rating: ${item.rating}</p>
            <button class="remove-from-watchlist-btn">Remove from List</button>
        `;
        watchlistItem.querySelector('.remove-from-watchlist-btn').addEventListener('click', function () {
            removeFromWatchlist(item);
            displayWatchlist();
        });
        watchlistContainer.appendChild(watchlistItem);
    });
}

// Function to remove item from watchlist
function removeFromWatchlist(itemToRemove) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlist = watchlist.filter(item => item.title !== itemToRemove.title);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
}

// Display watchlist items when page loads
window.onload = function () {
    displayWatchlist();
}