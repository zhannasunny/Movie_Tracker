// components/context/AuthContext.js

import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [myList, setMyList] = useState([]);

  const login = (newToken, newUsername) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('username', newUsername);
    setToken(newToken);
    setUsername(newUsername);
    fetchMyList(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken('');
    setUsername('');
    setMyList([]);
  };

  const fetchMyList = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/myList', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Fetched my list:', response.data);
      setMyList(response.data);
    } catch (error) {
      console.error('Error fetching my list:', error.response ? error.response.data.message : error.message);
    }
  };

  const addToMyList = async (movie) => {
    try {
      await axios.post(
        'http://localhost:5000/api/users/myList',
        { movie },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchMyList(token); // Refresh the list
    } catch (error) {
      console.error('Error adding to my list:', error.response ? error.response.data.message : error.message);
    }
  };

  const removeFromMyList = async (movieId) => {
    try {
      await axios.delete(
        'http://localhost:5000/api/users/myList',
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { movieId }
        }
      );
      fetchMyList(token); // Refresh the list
    } catch (error) {
      console.error('Error removing from my list:', error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ token, username, login, logout, myList, addToMyList, fetchMyList, removeFromMyList }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
