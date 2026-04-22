import React, { useState } from 'react';
import './movieCard.css';

const MovieCard = ({ movie, buttonText, onButtonClick, showOverview = true }) => {
  const [expanded, setExpanded] = useState(false);

  const getFullImagePath = (path) => {
    const baseURL = 'https://image.tmdb.org/t/p/w500';
    return path ? `${baseURL}${path}` : '/default-image.jpeg';
  };

  const formatYear = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getFullYear()) ? 'N/A' : date.getFullYear();
  };

  const title = movie.title || movie.name || 'Movie is untitled or the title is temporary unavailable';
  const releaseDate = movie.release_date || movie.first_air_date;
  const overview = movie.overview || '';
  const isTextLong = overview.length > 900;

  return (
    <div className="movieCard">
      <div className="movieCard-info">
        <img
          src={getFullImagePath(movie.poster_path)}
          alt={title}
          className="movieCard-poster"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/default-image.jpeg';
          }}
        />

        <div className="movieCard-text">
          <h3 className="movieCard-title">{title}</h3>

          <p className="movieCard-details">{formatYear(releaseDate)}</p>

          {showOverview && overview && (
            <>
              <p className={`movieCard-overview ${expanded ? 'expanded' : ''}`}>
                {overview}
              </p>

              {isTextLong && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="movieCard-readMore"
                >
                  {expanded ? 'Read Less' : 'Read More'}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <button onClick={() => onButtonClick(movie)} className="movieCard-button">
        {buttonText}
      </button>
    </div>
  );
};

export default MovieCard;