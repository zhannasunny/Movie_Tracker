import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './myList.css';

const MyList = () => {
  const { token, myList, fetchMyList } = useAuth();

  useEffect(() => {
    if (token) {
      fetchMyList(token);
    }
  }, [token, fetchMyList]);
  
  console.log('My list:', myList);

  if (!token) {
    return <p>To access your list, log in.</p>;
  }

  return (
    <div className="myList-container">
      <h2>My List</h2>
      {myList.length > 0 ? (
        <ul>
          {myList.map((movie, index) => (
            <li key={index} className="myListItem">
              {movie.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your list is empty.</p>
      )}
    </div>
  );
};

export default MyList;
