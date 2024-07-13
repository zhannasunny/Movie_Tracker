import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        username,
        password,
      });

      login(response.data.token);
      setMessage('Login successful!'); // Set success message
    } catch (error) {
      console.error('Error logging in:', error.response.data.message);
      setMessage('Login failed!'); // Set failure message
    }
  };

  return (
    <div className = "auth">
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign In</h2>
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
        <button type="submit">Sign In</button>
        <div className='qs'>
          <p>Don't have an account? <Link to = "/signup">Sign Up Here</Link></p>
          <p>Forgot your password? <Link to = "/forgot-password">Reset password</Link></p>
        </div>
      </form>
      {message && <p>{message}</p>} {/* Display the message */}
    </div>
    </div>

  );
};

export default Login;
