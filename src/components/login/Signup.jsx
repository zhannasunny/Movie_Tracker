import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './login.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', {
        username,
        password,
      });

      login(response.data.token);
      setMessage('Sign-Up successful!'); // Set success message
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage('Username already exists'); // Set error message if username exists
      } else {
        setErrorMessage('An error occurred. Please try again.'); // General error message
      }
    }
  };

  return (
    <div className = "auth">
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
        
        <div className='qs'>
          <p>Already registered? <Link to = "/login">Sign In Here</Link></p>
        </div>
        
        <div className="message">
          {message && <p>{message}</p>} 
          <div className="error">
            {errorMessage && <p>{errorMessage}</p>}
          </div>
        </div>
      </form>
      
    </div>
    </div>
  );
};

export default Signup;
