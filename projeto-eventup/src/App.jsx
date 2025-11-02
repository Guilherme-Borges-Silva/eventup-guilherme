import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import EventDetails from "./pages/EventDetails";

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('eventup_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('eventup_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setCurrentPage('event-details');
  };

  const handleBack = () => {
    setSelectedEvent(null);
    setCurrentPage('home');
  };

  const toggleFavorite = (event) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.id === event.id);
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.id !== event.id);
      } else {
        return [...prevFavorites, event];
      }
    });
  };

  const isFavorite = (eventId) => {
    return favorites.some(fav => fav.id === eventId);
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'favorites':
        return (
          <Favorites 
            favorites={favorites} 
            onViewDetails={handleViewDetails}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        );
      case 'event-details':
        return (
          <EventDetails 
            event={selectedEvent} 
            onBack={handleBack}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        );
      default:
        return (
          <Home 
            onViewDetails={handleViewDetails}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        );
    }
  };

  return (
    <div className="app-container">
      <Header 
        onNavigate={setCurrentPage} 
        currentPage={currentPage}
        favoritesCount={favorites.length}
      />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}
