import React from 'react';
import './DiscoveryCard.css';

// This function displays the movie poster, its title, and year
// Used for displaying popular movies and shows in the US today

function DiscoveryCard({ movie, onAddToList }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : null;

  const title = movie.title || movie.name;
  const year = (movie.release_date || movie.first_air_date || '').slice(0, 4);

  return (
    <div className="discovery-card">
      {imageUrl ? (
        <img
          className="discovery-card__poster"
          src={imageUrl}
          alt={`${title} poster`}
          loading="lazy"
        />
      ) : (
        <div className="discovery-card__poster discovery-card__poster--empty">
          No poster available
        </div>
      )}

      <div className="discovery-card__info">
        <h3 title={title}>{title}</h3>
        {year && <p>{year}</p>}

        <button type="button" onClick={() => onAddToList(movie)}>
          + My List
        </button>
      </div>
    </div>
  );
}

export default DiscoveryCard;
