import React, { useState } from 'react';
import Header from '../../containers/header/header';
import { useAuth } from '../context/AuthContext';
import MovieCard from '../movieCard/movieCard';
import './home.css';

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  
  const { token, addToMyList } = useAuth();

  const handleAddToList = (movie) => {
    if (!token) {
      alert('You need to log in to add movies to your list.');
      return;
    }
    addToMyList(movie);
  };

  return (
    <div className="home section__padding">
      <Header setSearchResults={setSearchResults} />

      {searchResults.length > 0 && (
          <div className="movie__home-content">
            <h2 className='gradient__text'>Search Results</h2>

            <ul className='movieList'>
              {searchResults.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  buttonText="Add to my list"
                  onButtonClick={handleAddToList}
                  showOverview={true}
                />
              )

              )}
            </ul>
          </div>
        
      )}
    </div>
  );
}

export default Home;
