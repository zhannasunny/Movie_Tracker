import React, { useState } from 'react';
import Header from '../../containers/header/header';
import { useAuth } from '../context/AuthContext';
import './home.css';

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [expandedMovies, setExpandedMovies] = useState([]);
  const { token, addToMyList } = useAuth();

  const handleAddToList = (movie) => {
    if (!token) {
      alert('You need to log in to add movies to your list.');
      return;
    }
    addToMyList(movie);
  };

  const getFullImagePath = (path) => {
    const baseURL = 'https://image.tmdb.org/t/p/w500';
    return path ? `${baseURL}${path}` : '/default-image.jpg';
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
    <div className="home section__padding">
      <Header setSearchResults={setSearchResults} />
      {searchResults.length > 0 && (
        
          <div className="movie__home-content">
            <h2 className='gradient__text'>Search Results</h2>
            <ul className='movieList'>
              {searchResults.map((movie) => {
                const isTextLong = movie.overview.length > 900;

                return (
                  <div key={movie.id} className='movieContainer'>
                    <div className='movieInfo'>
                      <img 
                        src={getFullImagePath(movie.poster_path)} 
                        alt={movie.title} 
                        className='moviePoster' 
                        onError={(e) => { e.target.src = '/default-image.jpg'; }}
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
        
      )}
    </div>
  );
}

export default Home;
