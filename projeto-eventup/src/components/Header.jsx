import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header({ currentPage, favoritesCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    closeMobileMenu();
  }, [currentPage]);

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo-area">
          <h1>EventUp</h1>
          <p className="tagline">Eventos na palma da mão</p>
        </div>

        <button 
          className="mobile-menu-toggle" 
          aria-label="Alternar menu de navegação"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(prev => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav aria-label="Navegação principal" className={`navigation ${mobileMenuOpen ? 'open' : ''}`}>
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => isActive || currentPage === 'home' ? 'active' : undefined}
          onClick={closeMobileMenu}
        >
          Início
        </NavLink>
        <NavLink 
          to="/favorites"
          className={({ isActive }) => isActive || currentPage === 'favorites' ? 'active' : undefined}
          onClick={closeMobileMenu}
        >
          Favoritos {favoritesCount > 0 && <span className="favorites-count">({favoritesCount})</span>}
        </NavLink>
      </nav>
    </header>
  );
}
