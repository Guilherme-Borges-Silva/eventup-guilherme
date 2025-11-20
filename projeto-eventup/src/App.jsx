import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import EventDetails from "./pages/EventDetails";
import { useGestureNavigation } from "./hooks/useGestureNavigation";

const STORAGE_KEY = 'eventup_favorites';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const mainRef = useRef(null);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((event) => {
    setFavorites(prevFavorites => {
      const exists = prevFavorites.some(fav => fav.id === event.id);
      return exists
        ? prevFavorites.filter(fav => fav.id !== event.id)
        : [...prevFavorites, event];
    });
  }, []);

  const isFavorite = useCallback((eventId) => favorites.some(fav => fav.id === eventId), [favorites]);

  const handleViewDetails = useCallback((event) => {
    setSelectedEvent(event);
    navigate(`/event/${event.id}`, { state: { event } });
  }, [navigate]);

  const handleBack = useCallback(() => {
    setSelectedEvent(null);
    if (location.key === 'default') {
      navigate('/', { replace: true });
    } else {
      navigate(-1);
    }
  }, [navigate, location.key]);

  const currentPage = useMemo(() => {
    if (location.pathname.startsWith('/favorites')) return 'favorites';
    if (location.pathname.startsWith('/event')) return 'event-details';
    return 'home';
  }, [location.pathname]);

  useGestureNavigation({
    ref: mainRef,
    onSwipeLeft: () => {
      if (currentPage === 'home') navigate('/favorites');
    },
    onSwipeRight: () => {
      if (currentPage === 'favorites') navigate('/');
    },
    onSwipeDown: () => {
      if (currentPage === 'event-details') handleBack();
    }
  });

  const eventForDetails = selectedEvent ?? location.state?.event ?? null;

  return (
    <div className="app-container">
      <Header 
        currentPage={currentPage}
        favoritesCount={favorites.length}
      />
      <main ref={mainRef} data-testid="app-main" className="main-content">
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                onViewDetails={handleViewDetails}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            } 
          />
          <Route 
            path="/favorites" 
            element={
              <Favorites 
                favorites={favorites}
                onViewDetails={handleViewDetails}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            } 
          />
          <Route 
            path="/event/:eventId" 
            element={
              <EventDetails 
                event={eventForDetails}
                onBack={handleBack}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
