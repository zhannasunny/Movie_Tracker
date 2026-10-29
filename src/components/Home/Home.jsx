import React, { useEffect, useState } from 'react';
import Header from '../../containers/header/header';
import { useAuth } from '../context/AuthContext';
import MovieCard from '../movieCard/movieCard';
import './home.css';
import DiscoveryCard from '../DiscoveryCard/DiscoveryCard';

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { token, addToMyList } = useAuth();

  useEffect(() => {
    // fetch popular movies and siaply them below the search bar on the Home page (if the user isn't currently searching for anything)
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&region=US&sort_by=popularity.desc`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch popular movies.');
        }

        const data = await response.json();
        setPopularMovies(data.results || []);
      } catch (err) {
        console.error('Error fetching popular movies:', err);
        setError('Unable to load popular movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  // this handles adding something to the list of favorites when user presses "Add to my list" button
  const handleAddToList = (movie) => {
    if (!token) {
      alert('You need to log in to add movies to your list.');
      return;
    }
    addToMyList(movie);
  };

  //this variable is True if the user is actively trying to search something
  //if they are, we are going to display search results below the search bar and NOT display popular movies/shows in the US today
  //if they aren't, we display popular movies and shows in the US today (under the search bar)
  const isSearching = searchResults.length > 0;

  return (
    <div className="home section__padding">
      <Header setSearchResults={setSearchResults} />

      {isSearching ? (
        <div className="movie__home-content">
          <h2 className="gradient__text">Search Results</h2>

          <ul className="movieList">
            {searchResults.map((movie) => (
              <MovieCard
                key={`${movie.media_type}-${movie.id}`}
                movie={movie}
                buttonText="Add to my list"
                onButtonClick={handleAddToList}
                showOverview={true}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div className="discovery-row">
          <h2 className="gradient__text">Popular Movies in the US</h2>

          {loading && <p>Loading popular movies...</p>}
          {error && <p>{error}</p>}

          {!loading && !error && (
            <div className="discovery-row__list">
              {popularMovies.map((movie) => (
                <DiscoveryCard
                  key={movie.id}
                  movie={movie}
                  onAddToList={() =>
                    handleAddToList({ ...movie, media_type: 'movie' })
                  }
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
