import React  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './components';
import Home from './components/Home/Home';
import Movies from './components/Movies/movies';
import Series from './components/Series/series';
import LogIn from './components/login/login';
import MyList from './components/myList/myList';

function App() {

  return (
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
            <Route path="/login" element={<LogIn/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
