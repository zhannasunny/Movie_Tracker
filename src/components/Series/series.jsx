import React from 'react';
import './series.css';
function Movies() {
  return (
    <div className = "movie__movies section__padding">
        <div className = "movie__movies-content">
            <h1 className = "gradient__text">Search Series</h1>
            <div className = "movie__movies-content__input">
                <input type = "search" placeholder = "Search..."/>
                <button type = "button">
                    <img src = "https://img.icons8.com/ios-glyphs/30/000000/search.png" alt = "search"/>
                </button>
            </div>
            <h3 className='gradient__text'>Popular series in the US today:</h3>

            <div className = "movie__movies-content__movies">

            </div>

        </div>
    </div>
  );
}

export default Movies;