import React from 'react'
import './header.css'
import front_page from '../../assets/front_page.png'

function Header(){
  return (
    <div className = "movie__header section__padding " id = "home">
      <div className = "movie__header-content">
        <h1 className = "gradient__text">Find and save all your movies and TV shows in one click</h1>
        <p>Millions of movies, TV shows and people to discover. Explore now.</p>

        <div className = "movie__header-content__input">
          <input type = "search" placeholder = "Search..."/>
          <button type = "button">
              <img src = "https://img.icons8.com/ios-glyphs/30/000000/search.png" alt = "search"/>
          </button>
        </div>
      </div>
      <div className = "movie__header-image">
          <img src = {front_page} alt = "front_page"/>
      </div>
       
    </div>
  )
}

export default Header