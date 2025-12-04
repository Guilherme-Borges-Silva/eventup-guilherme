import React, { useState, useEffect, useMemo } from "react";
import EventCard from "./EventCard";
import EventFilters from "./EventFilters";
import { fetchEvents } from "../services/ticketmasterApi";
import { useGeolocation, calculateDistance } from "../hooks/useGeolocation";
import { useSearch } from "../contexts/SearchContext";

const fallbackEvents = [
  {
    id: 1,
    title: "Conferência de Tecnologia 2026",
    date: "15 de Fevereiro, 2026",
    time: "09:00 - 18:00",
    location: "Centro de Convenções - São Paulo, SP",
    description: "Uma conferência imperdível sobre as últimas tendências em tecnologia, inteligência artificial e inovação digital. Venha conhecer os maiores especialistas do mercado.",
    category: "Tecnologia",
    latitude: -23.5505,
    longitude: -46.6333
  },
  {
    id: 2,
    title: "Workshop de React Avançado",
    date: "20 de Fevereiro, 2026",
    time: "14:00 - 17:00",
    location: "Espaço Coworking - Rio de Janeiro, RJ",
    description: "Workshop prático para desenvolvedores que querem dominar React, hooks avançados, performance e boas práticas. Inclui coffee break.",
    category: "Desenvolvimento",
    latitude: -22.9068,
    longitude: -43.1729
  },
  {
    id: 3,
    title: "Meetup de Desenvolvimento",
    date: "25 de Fevereiro, 2026",
    time: "19:00 - 22:00",
    location: "Casa do Conhecimento - Belo Horizonte, MG",
    description: "Um encontro descontraído para networking, troca de experiências e discussões sobre o futuro do desenvolvimento de software.",
    category: "Networking",
    latitude: -19.9167,
    longitude: -43.9345
  }
];

export default function EventList({ onViewDetails, onToggleFavorite, isFavorite, userLocation, locationEnabled, onToggleLocation, locationLoading, onClearLocation }) {
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingAPI, setUsingAPI] = useState(false);
  const { searchTerm } = useSearch();
  const [filters, setFilters] = useState({
    type: '',
    dateFilter: '',
    timePeriod: ''
  });

  const filterEvents = useMemo(() => {
    let filtered = [...allEvents];

    // busca por texto - procura no título, descrição, localização e categoria
    if (searchTerm && searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(event => {
        const title = (event.title || event.name || '').toLowerCase();
        const description = (event.description || '').toLowerCase();
        const location = (event.location || event._raw?.venues?.[0]?.name || '').toLowerCase();
        const category = (event.category || event._raw?.classifications?.[0]?.segment?.name || '').toLowerCase();
        
        return title.includes(searchLower) || 
               description.includes(searchLower) || 
               location.includes(searchLower) ||
               category.includes(searchLower);
      });
    }

    // filtra por categoria/tipo de evento
    if (filters.type) {
      filtered = filtered.filter(event => {
        const eventType = event.category || '';
        return eventType.toLowerCase().includes(filters.type.toLowerCase());
      });
    }

    // filtro de data - essa parte é meio chata porque a data vem em formatos diferentes
    if (filters.dateFilter) {
      const now = new Date();
      now.setHours(0, 0, 0, 0);

      filtered = filtered.filter(event => {
        let eventDate = null;
        
        // primeiro tenta pegar da API do ticketmaster
        if (event._raw?.dates?.start?.localDate) {
          eventDate = new Date(event._raw.dates.start.localDate);
        } else if (event._raw?.dates?.start?.dateTime) {
          eventDate = new Date(event._raw.dates.start.dateTime);
        } else if (event.date && event.date !== 'Data a definir') {
          // se não tiver, tenta converter a data formatada tipo "15 de Fevereiro, 2026"
          const dateStr = event.date;
          const dateMatch = dateStr.match(/(\d+)\s+de\s+(\w+),\s+(\d+)/);
          if (dateMatch) {
            const months = {
              'janeiro': 0, 'fevereiro': 1, 'março': 2, 'abril': 3,
              'maio': 4, 'junho': 5, 'julho': 6, 'agosto': 7,
              'setembro': 8, 'outubro': 9, 'novembro': 10, 'dezembro': 11
            };
            const day = parseInt(dateMatch[1]);
            const month = months[dateMatch[2].toLowerCase()];
            const year = parseInt(dateMatch[3]);
            if (month !== undefined) {
              eventDate = new Date(year, month, day);
            }
          }
        }

        if (!eventDate) {
          return false;
        }

        eventDate.setHours(0, 0, 0, 0);

        switch (filters.dateFilter) {
          case 'today':
            return eventDate.getTime() === now.getTime();
          case 'week':
            const weekFromNow = new Date(now);
            weekFromNow.setDate(weekFromNow.getDate() + 7);
            return eventDate >= now && eventDate <= weekFromNow;
          case 'month':
            const monthFromNow = new Date(now);
            monthFromNow.setMonth(monthFromNow.getMonth() + 1);
            return eventDate >= now && eventDate <= monthFromNow;
          case 'future':
            return eventDate >= now;
          default:
            return true;
        }
      });
    }

    // filtra por período do dia (manhã, tarde, noite)
    if (filters.timePeriod) {
      filtered = filtered.filter(event => {
        if (!event._raw?.dates?.start?.localTime && !event._raw?.dates?.start?.dateTime) {
          return false;
        }

        let hour;
        if (event._raw.dates.start.localTime) {
          // pega só a hora do formato "HH:MM:SS"
          hour = parseInt(event._raw.dates.start.localTime.split(':')[0]);
        } else {
          const date = new Date(event._raw.dates.start.dateTime);
          hour = date.getHours();
        }

        switch (filters.timePeriod) {
          case 'morning':
            return hour >= 6 && hour < 12;
          case 'afternoon':
            return hour >= 12 && hour < 18;
          case 'evening':
            return hour >= 18 && hour < 24;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [allEvents, filters, searchTerm]);

  const eventsWithDistance = useMemo(() => {
    if (!userLocation) {
      return filterEvents.map(event => ({ ...event, distance: null }));
    }

    return filterEvents
      .map(event => {
        if (event.latitude && event.longitude) {
          const distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            event.latitude,
            event.longitude
          );
          return { ...event, distance };
        }
        return { ...event, distance: null };
      })
      .sort((a, b) => {
        if (a.distance !== null && b.distance !== null) {
          return a.distance - b.distance;
        }
        if (a.distance !== null) return -1;
        if (b.distance !== null) return 1;
        return 0;
      });
  }, [filterEvents, userLocation]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const apiEvents = await fetchEvents({ 
          countryCode: 'BR', 
          size: 20 
        });
        
        if (apiEvents && apiEvents.length > 0) {
          setAllEvents(apiEvents);
          setUsingAPI(true);
        } else {
          setAllEvents(fallbackEvents);
          setUsingAPI(false);
        }
      } catch (err) {
        console.warn('Erro ao buscar eventos da API, usando dados de fallback:', err);
        setAllEvents(fallbackEvents);
        setUsingAPI(false);
        setError('Não foi possível carregar eventos da API. Mostrando eventos de exemplo.');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      type: '',
      dateFilter: '',
      timePeriod: ''
    });
  };

  if (loading) {
    return (
      <div className="event-list">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando eventos...</p>
        </div>
      </div>
    );
  }

  if (error && !events.length) {
    return (
      <div className="event-list">
        <div className="error-container">
          <p>⚠️ {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="event-list-wrapper">
      <div className="action-buttons-container">
        <EventFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
        {onToggleLocation && (
          <div className="location-button-wrapper">
            <button
              className={`location-toggle-btn ${locationEnabled ? 'active' : ''}`}
              onClick={onToggleLocation}
              disabled={locationLoading}
              title={locationEnabled ? 'Desativar localização' : 'Ativar localização para ver eventos próximos'}
            >
              {locationLoading ? (
                <>⏳ Obtendo localização...</>
              ) : locationEnabled && userLocation ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                    <path d="M516-120 402-402 120-516v-56l720-268-268 720h-56Zm26-148 162-436-436 162 196 78 78 196Zm-78-196Z"/>
                  </svg>
                  <span className="btn-text-full">Eventos próximos ativado</span>
                  <span className="btn-text-short">Ativado</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                    <path d="M516-120 402-402 120-516v-56l720-268-268 720h-56Zm26-148 162-436-436 162 196 78 78 196Zm-78-196Z"/>
                  </svg>
                  <span className="btn-text-full">Mostrar eventos próximos</span>
                  <span className="btn-text-short">Eventos próximos</span>
                </>
              )}
            </button>
            {locationEnabled && userLocation && onClearLocation && (
              <button
                className="location-clear-btn"
                onClick={onClearLocation}
                title="Desativar localização"
              >
                ✕
              </button>
            )}
          </div>
        )}
      </div>
      <div className="event-list">
        {eventsWithDistance.length === 0 ? (
          <div className="no-events">
            <p>Nenhum evento encontrado com os filtros selecionados.</p>
            {Object.values(filters).some(f => f) && (
              <button 
                className="clear-filters-inline-btn"
                onClick={handleClearFilters}
              >
                Limpar filtros
              </button>
            )}
          </div>
        ) : (
          eventsWithDistance.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              onViewDetails={onViewDetails}
              onToggleFavorite={onToggleFavorite}
              isFavorite={isFavorite}
            />
          ))
        )}
      </div>
      {usingAPI && (
        <div className="api-status-bottom">
          <span className="api-badge">✓ Dados carregados da API Ticketmaster</span>
        </div>
      )}
    </div>
  );
}
