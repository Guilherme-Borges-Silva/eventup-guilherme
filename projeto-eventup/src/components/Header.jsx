import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useSearch } from "../contexts/SearchContext";

export default function Header({ currentPage, favoritesCount = 0, onLogout }) {
  // estado do menu mobile - só aparece em telas pequenas
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { searchTerm, setSearchTerm } = useSearch();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  // fecha o menu quando muda de página
  useEffect(() => {
    closeMobileMenu();
  }, [currentPage]);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    closeMobileMenu();
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo-area">
          <h1>EventUp</h1>
          <p className="tagline">Eventos na palma da mão</p>
        </div>

        {/* busca desktop - aparece só em telas maiores */}
        <div className="header-search-container header-search-desktop">
          <div className="search-bar">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Buscar eventos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar eventos"
            />
            {searchTerm && (
              <button
                className="search-clear-btn"
                onClick={() => setSearchTerm('')}
                aria-label="Limpar busca"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* botão do menu mobile - só aparece em telas pequenas */}
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

      {/* busca mobile - aparece só em telas menores */}
      <div className="header-search-mobile">
        <div className="header-search-container">
          <div className="search-bar">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Buscar eventos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar eventos"
            />
            {searchTerm && (
              <button
                className="search-clear-btn"
                onClick={() => setSearchTerm('')}
                aria-label="Limpar busca"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
              </button>
            )}
          </div>
        </div>
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
        {isAuthenticated && (
          <NavLink 
            to="/favorites"
            className={({ isActive }) => isActive || currentPage === 'favorites' ? 'active' : undefined}
            onClick={closeMobileMenu}
          >
            Favoritos {favoritesCount > 0 && <span className="favorites-count">({favoritesCount})</span>}
          </NavLink>
        )}
        <div className="auth-actions">
          {isAuthenticated ? (
            <>
              <span className="user-info">Olá, {user?.name}</span>
              <button 
                onClick={handleLogout} 
                className="logout-button"
                aria-label="Sair"
              >
                Sair
              </button>
            </>
          ) : (
            <NavLink 
              to="/login"
              className={({ isActive }) => isActive ? 'active' : undefined}
              onClick={closeMobileMenu}
            >
              Entrar
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}
