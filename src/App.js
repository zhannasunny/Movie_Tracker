import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './components';
import { Footer, Header } from './containers';
import Home from './components/Home/Home';
import Movies from './components/Movies/movies';
import Series from './components/Series/series';
import LogIn from './components/login/login';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch]);
  return (
    <Router>
      <div className="App">
        <div className="gradient">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/login" element={<LogIn/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
