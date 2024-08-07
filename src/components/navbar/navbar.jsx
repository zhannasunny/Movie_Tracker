import React from 'react';
import './navbar.css';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Menu() {
  const location = useLocation();

  return (
    <>
      <p><Link to="/home">Home</Link></p>
      <p><Link to="/movies">Movies</Link></p>
      <p><Link to="/series">Series</Link></p>
      <p><Link to="/mylist">My List</Link></p>
    </>
  );
}

function SignIn(){
  return (
    <>
      <p><Link to="/login">Sign In</Link></p>
      <button type = "button"><Link to="/signup">Sign Up</Link></button>
    </>
  );
    
}
function Navbar(){
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const { username, logout } = useAuth(); // Access username and logout function
  return (
    <div className = "movie__navbar">
      <div className = "movie__navbar-links">
        <div className = "movie__navbar-links_logo">
          <img src = {logo} alt = "logo"/>
        </div>
        <div className = "movie__navbar-links_container">
          <Menu/>
        </div>
      </div>

      <div className = "movie__navbar-sign">
                {username ? (
                  <>
                    <p>{username}</p>
                    <button type="button" onClick={logout}>Logout</button>
                  </>
                ) : (
                  <SignIn/>
                )}
      </div>
      <div className = "movie__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color = "#fff" size = {27} onClick = {() => setToggleMenu(false)}/>
          : <RiMenu3Line color = "#fff" size = {27} onClick = {() => setToggleMenu(true)}/>
        }
        {toggleMenu && (
          <div className = "movie__navbar-menu_container scale-up-center">
            <div className = "movie__navbar-menu_container-links">
              <Menu/>
              <div className = "movie__navbar-menu_container-links-sign">
              {username ? (
                  <>
                    <p>{username}</p>
                    <button type="button" onClick={logout}>Logout</button>
                  </>
                ) : (
                  <SignIn />
                )}
              </div>
            </div>
          </div>
        )

        }
      </div>


    </div>
  )
}

export default Navbar
