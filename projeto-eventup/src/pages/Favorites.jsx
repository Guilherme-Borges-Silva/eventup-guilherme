import React from "react";
import EventCard from "../components/EventCard";

export default function Favorites({ favorites, onViewDetails, onToggleFavorite, isFavorite }) {
  return (
    <section>
      <div className="page-header">
        <h2>Meus Favoritos</h2>
        <p>Eventos que você marcou como favoritos</p>
      </div>
      <div className="favorites-content">
        {favorites && favorites.length > 0 ? (
          <div className="event-list">
            {favorites.map(event => (
              <EventCard 
                key={event.id} 
                event={event} 
                onViewDetails={onViewDetails}
                onToggleFavorite={onToggleFavorite}
                isFavorite={isFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">⭐</div>
            <h3>Nenhum favorito ainda</h3>
            <p>Explore os eventos na página inicial e marque seus favoritos!</p>
          </div>
        )}
      </div>
    </section>
  );
}
