import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'eventup_auth';
const FAVORITES_STORAGE_PREFIX = 'eventup_favorites_';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getFavoritesKey = (userEmail) => {
    return `${FAVORITES_STORAGE_PREFIX}${userEmail}`;
  };

  const saveUserFavorites = (userEmail, favorites) => {
    if (userEmail) {
      const key = getFavoritesKey(userEmail);
      localStorage.setItem(key, JSON.stringify(favorites));
    }
  };

  const loadUserFavorites = (userEmail) => {
    if (!userEmail) return [];
    try {
      const key = getFavoritesKey(userEmail);
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Erro ao carregar favoritos do usuário:', error);
      return [];
    }
  };

  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedAuth) {
        const authData = JSON.parse(savedAuth);
        setUser(authData);
      }
    } catch (error) {
      console.error('Erro ao carregar autenticação:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const userData = {
            email,
            name: email.split('@')[0],
            id: Date.now().toString()
          };
          setUser(userData);
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Email e senha são obrigatórios'));
        }
      }, 500); 
    });
  };

  const logout = (currentFavorites = []) => {
    if (user?.email) {
      saveUserFavorites(user.email, currentFavorites);
    }
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const isAuthenticated = !!user;

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    loading,
    saveUserFavorites,
    loadUserFavorites
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

