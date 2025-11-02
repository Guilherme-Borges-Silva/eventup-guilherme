import React from "react";

export default function Header({ onNavigate, currentPage, favoritesCount = 0 }) {
  return (
    <header className="header">
      <h1>EventUp</h1>
      <nav>
        <button 
          onClick={() => onNavigate('home')}
          className={currentPage === 'home' ? 'active' : ''}
        >
          Início
        </button>
        <button 
          onClick={() => onNavigate('favorites')}
          className={currentPage === 'favorites' ? 'active' : ''}
        >
          Favoritos {favoritesCount > 0 && <span className="favorites-count">({favoritesCount})</span>}
        </button>
      </nav>
    </header>
  );
}
