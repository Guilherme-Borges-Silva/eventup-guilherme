import React from "react";

export default function Header({ onNavigate, currentPage }) {
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
          Favoritos
        </button>
      </nav>
    </header>
  );
}
