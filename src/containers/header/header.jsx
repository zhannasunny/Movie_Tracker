import React, { useState } from 'react';
import './header.css';
import axios from 'axios';

function Header({ setSearchResults }) {
  const [query, setQuery] = useState('');

  const handleSearch = async(e) => {
    e?.preventDefault();

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    try {
      const response = await axios.get('https://api.themoviedb.org/3/search/multi', {
        params: {
          api_key: process.env.REACT_APP_TMDB_API_KEY,
          query: query.trim(),
        },
      });
      setSearchResults(
        response.data.results.filter(
          (item) =>
            item.media_type === 'movie' ||
            item.media_type === 'tv'
        )
      );
    } catch (error) {
      console.error('Fetch error:', error);
      setSearchResults([]);
    }
  };

  return (
    <div className="movie__header section__padding" id="home">
      <div className="movie__header-content">
        <h1 className="gradient__text">
          Find and save all your movies and TV shows in one click
          </h1>

        <p>
          Millions of movies, TV shows and people to discover. Explore now.
        </p>

        <form
          className="movie__header-content__input"
          onSubmit={handleSearch}
        >
          <input
            type="search"
            placeholder="Search movies and TV shows..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button type="submit" aria-label="Search">
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/search.png"
              alt=""
            />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Header;