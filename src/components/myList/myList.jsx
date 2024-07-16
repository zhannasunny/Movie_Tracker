// components/myList/MyList.js

import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './myList.css';

const MyList = () => {
  const { token, myList, fetchMyList, removeFromMyList } = useAuth();

  useEffect(() => {
    if (token) {
      fetchMyList(token);
    }
  }, [token, fetchMyList]);

  const handleRemove = (movieId) => {
    removeFromMyList(movieId);
  };

  if (!token) {
    return <p>To access your list, log in.</p>;
  }

  return (
    <div className="myList section__padding">
      <div className="myList-content">
        <h1 className='gradient__text'>My List</h1>
        {myList.length > 0 ? (
          <ul>
            {myList.map((movie, index) => (
              <li key={index} className="myList-item">
                {movie.title}
                <button onClick={() => handleRemove(movie.id)}>Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your list is empty.</p>
        )}
      </div>
    </div>
  );
};

export default MyList;
