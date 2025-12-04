import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useGestureNavigation } from "./hooks/useGestureNavigation";
import { useAuth } from "./contexts/AuthContext";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const mainRef = useRef(null);
  const { isAuthenticated, user, logout: authLogout, loadUserFavorites, saveUserFavorites } = useAuth();

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      const userFavorites = loadUserFavorites(user.email);
      setFavorites(userFavorites);
    } else {
      setFavorites([]);
    }
  }, [isAuthenticated, user, loadUserFavorites]);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      saveUserFavorites(user.email, favorites);
    }
  }, [favorites, isAuthenticated, user, saveUserFavorites]);

  const toggleFavorite = useCallback((event) => {
    setFavorites(prevFavorites => {
      const exists = prevFavorites.some(fav => fav.id === event.id);
      return exists
        ? prevFavorites.filter(fav => fav.id !== event.id)
        : [...prevFavorites, event];
    });
  }, []);

  const isFavorite = useCallback((eventId) => favorites.some(fav => fav.id === eventId), [favorites]);

  const handleLogout = useCallback(() => {
    authLogout(favorites);
    setFavorites([]);
    navigate('/');
  }, [authLogout, favorites, navigate]);

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
        onLogout={handleLogout}
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
            path="/login" 
            element={<Login />} 
          />
          <Route 
            path="/favorites" 
            element={
              <ProtectedRoute>
                <Favorites 
                  favorites={favorites}
                  onViewDetails={handleViewDetails}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={isFavorite}
                />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/event/:eventId" 
            element={
              <ProtectedRoute>
                <EventDetails 
                  event={eventForDetails}
                  onBack={handleBack}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={isFavorite}
                />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
