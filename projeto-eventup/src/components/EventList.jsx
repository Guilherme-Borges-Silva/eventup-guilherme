import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import { fetchEvents } from "../services/ticketmasterApi";

const fallbackEvents = [
  {
    id: 1,
    title: "Conferência de Tecnologia 2026",
    date: "15 de Fevereiro, 2026",
    time: "09:00 - 18:00",
    location: "Centro de Convenções - São Paulo, SP",
    description: "Uma conferência imperdível sobre as últimas tendências em tecnologia, inteligência artificial e inovação digital. Venha conhecer os maiores especialistas do mercado.",
    category: "Tecnologia"
  },
  {
    id: 2,
    title: "Workshop de React Avançado",
    date: "20 de Fevereiro, 2026",
    time: "14:00 - 17:00",
    location: "Espaço Coworking - Rio de Janeiro, RJ",
    description: "Workshop prático para desenvolvedores que querem dominar React, hooks avançados, performance e boas práticas. Inclui coffee break.",
    category: "Desenvolvimento"
  },
  {
    id: 3,
    title: "Meetup de Desenvolvimento",
    date: "25 de Fevereiro, 2026",
    time: "19:00 - 22:00",
    location: "Casa do Conhecimento - Belo Horizonte, MG",
    description: "Um encontro descontraído para networking, troca de experiências e discussões sobre o futuro do desenvolvimento de software.",
    category: "Networking"
  }
];

export default function EventList({ onViewDetails, onToggleFavorite, isFavorite }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingAPI, setUsingAPI] = useState(false);

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
          setEvents(apiEvents);
          setUsingAPI(true);
        } else {
          setEvents(fallbackEvents);
          setUsingAPI(false);
        }
      } catch (err) {
        console.warn('Erro ao buscar eventos da API, usando dados de fallback:', err);
        setEvents(fallbackEvents);
        setUsingAPI(false);
        setError('Não foi possível carregar eventos da API. Mostrando eventos de exemplo.');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

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
      <div className="event-list">
        {events.length === 0 ? (
          <div className="no-events">
            <p>Nenhum evento encontrado.</p>
          </div>
        ) : (
          events.map(event => (
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
