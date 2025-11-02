import React from "react";

export default function EventCard({ event, onViewDetails, onToggleFavorite, isFavorite }) {
  const isFavorited = isFavorite && isFavorite(event.id);

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(event);
    }
  };

  return (
    <div className="event-card">
      <div className="event-header">
        <div className="event-category">{event.category}</div>
        <button 
          className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
          onClick={handleToggleFavorite}
          title={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          {isFavorited ? '❤️' : '🤍'}
        </button>
      </div>
      <h3>{event.title}</h3>
      <div className="event-info">
        <p className="event-date">📅 {event.date}</p>
        <p className="event-time">🕒 {event.time}</p>
        <p className="event-location">📍 {event.location}</p>
      </div>
      <p className="event-description">{event.description}</p>
      <button 
        className="details-btn"
        onClick={() => onViewDetails(event)}
      >
        Ver Detalhes
      </button>
    </div>
  );
}
