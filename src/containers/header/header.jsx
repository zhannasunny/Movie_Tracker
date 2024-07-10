import React, { useState } from 'react';
import './header.css';
import front_page from '../../assets/front_page.png';
import axios from 'axios';

function Header({ setSearchResults }) {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: process.env.REACT_APP_TMDB_API_KEY,
          query,
        },
      });
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Fetch error:', error);
      setSearchResults([]);
    }
  };

  return (
    <div className="movie__header section__padding" id="home">
      <div className="movie__header-content">
        <h1 className="gradient__text">Find and save all your movies and TV shows in one click</h1>
        <p>Millions of movies, TV shows and people to discover. Explore now.</p>

        <div className="movie__header-content__input">
          <input
            type="search"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="button" onClick={handleSearch}>
            <img src="https://img.icons8.com/ios-glyphs/30/000000/search.png" alt="search" />
          </button>
        </div>
      </div>
      <div className="movie__header-image">
        <img src={front_page} alt="front_page" />
      </div>
    </div>
  );
}

export default Header;