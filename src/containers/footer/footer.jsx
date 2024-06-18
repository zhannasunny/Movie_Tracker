import React from 'react'
import './footer.css'
import logo from '../../assets/logo.png'

function Footer(){
  return (
    <div className = "movie__footer section__padding">
      <div className = "movie__footer-links">

        <div className = "movie__footer-links_logo">
          <img src = {logo} alt = "logo"/>
        </div>

        <div className = "movie__footer-links_div">
          <h4>Links</h4>
          <p>Home</p>
          <p>Movies</p>
          <p>Series</p>
          <p>My List</p>
          <p>Log In</p>
          <p>Create an account</p>
        </div>
      </div>
      
    </div>
  )
}

export default Footer