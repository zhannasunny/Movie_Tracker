import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './components';
import Home from './components/Home/Home';
import Movies from './components/Movies/movies';
import Series from './components/Series/series';
import Signup from './components/login/Signup';
import Login from './components/login/Login';
import MyList from './components/myList/myList';
import { AuthProvider } from './components/context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <div className="gradient">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/myList" element={<MyList />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/series" element={<Series />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
