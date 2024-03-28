// Login Page
// Function to handle login
function login() {
    // Get user input
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // logic to verify the email and password
    window.location.href = "search.html";
    search();
}

// Search Page
// Dummy data for movies and TV shows
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
        title: "Stranger Things",
        type: "TV Show",
        genre: ["Drama", "Fantasy", "Horror"],
        year: 2016,
        rating: 8.7
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

// Function to display search results
function search() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = ''; 

    mediaData.forEach(media => {
        if (media.title.toLowerCase().includes(searchTerm) || searchTerm === '') {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `
          <h3>${media.title}</h3>
          <p>Type: ${media.type}</p>
          <p>Genre: ${media.genre.join(', ')}</p>
          <p>Year: ${media.year}</p>
          <p>Rating: ${media.rating}</p>
        `;
            resultsContainer.appendChild(resultItem);
        }
    });
}

// Display all results initially
window.onload = function () {
    search();
}

// Watchlist

// Dummy data for watchlist items
const watchlistData = [
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

  ];
  
  // Function to display watchlist items
  function displayWatchlist() {
    const watchlistContainer = document.getElementById("watchlist");
    watchlistContainer.innerHTML = ''; 
  
    watchlistData.forEach(item => {
      const watchlistItem = document.createElement('div');
      watchlistItem.classList.add('watchlist-item');
      watchlistItem.innerHTML = `
        <h3>${item.title}</h3>
        <p>Type: ${item.type}</p>
        <p>Genre: ${item.genre.join(', ')}</p>
        <p>Year: ${item.year}</p>
        <p>Rating: ${item.rating}</p>
      `;
      watchlistContainer.appendChild(watchlistItem);
    });
  }
  
  // Display watchlist items when page loads
  window.onload = function() {
    displayWatchlist();
  }
  

// Future functionality

// Firebase initialization and configuration 
// Function to handle user sign up
// Function to handle user login
// Function to handle forgot password
// Function to handle search
// Function to update search results
// Function to add item to watchlist
// Function to remove item from watchlist
