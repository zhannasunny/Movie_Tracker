import React, { useState } from 'react';
import Header from '../../containers/header/header'; // Ensure correct import path
import './home.css';

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [expandedMovies, setExpandedMovies] = useState([]);

  const handleAddToList = (movie) => {
    console.log('Add to list:', movie);
    // Implement the logic to add the movie to a list
  };

  const getFullImagePath = (path) => {
    const baseURL = 'https://image.tmdb.org/t/p/w500'; // TMDb base URL for images
    return path ? `${baseURL}${path}` : '/default-image.jpg'; // Default image path relative to the public folder
  };

  const formatYear = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  const toggleExpand = (movieId) => {
    setExpandedMovies((prevExpandedMovies) =>
      prevExpandedMovies.includes(movieId)
        ? prevExpandedMovies.filter((id) => id !== movieId)
        : [...prevExpandedMovies, movieId]
    );
  };

  return (
    <div className="home">
      <Header setSearchResults={setSearchResults} />
      {searchResults.length > 0 && (
        <div className="movie__home section__padding">
          <div className="movie__home-content">
            <h2 className='gradient__text'>Search Results</h2>
            <ul className='movieList'>
              {searchResults.map((movie) => {
                const isTextLong = movie.overview.length > 900; // Adjust the length threshold as needed

                return (
                  <div key={movie.id} className='movieContainer'>
                    <div className='movieInfo'>
                      <img 
                        src={getFullImagePath(movie.poster_path)} 
                        alt={movie.title} 
                        className='moviePoster' 
                        onError={(e) => { e.target.src = '/default-image.jpg'; }} // Fallback image on error
                      />
                      <div className='movieText'>
                        <h3 className='movieTitle'>{movie.title}</h3>
                        <p className='movieDetails'>
                          {formatYear(movie.release_date)}  
                        </p>
                        <p className={`movieOverview ${expandedMovies.includes(movie.id) ? 'expanded' : ''}`}>
                          {movie.overview}
                        </p>
                        {isTextLong && (
                          <button onClick={() => toggleExpand(movie.id)} className='readMoreButton'>
                            {expandedMovies.includes(movie.id) ? 'Read Less' : 'Read More'}
                          </button>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleAddToList(movie)} 
                      className='addButton'
                    >
                      Add to My List
                    </button>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;