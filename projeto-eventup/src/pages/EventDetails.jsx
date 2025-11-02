import React from "react";

export default function EventDetails({ event, onBack, onToggleFavorite, isFavorite }) {
  if (!event) {
    return (
      <section>
        <div className="page-header">
          <h2>Evento não encontrado</h2>
          <button onClick={onBack} className="back-btn">Voltar para Início</button>
        </div>
      </section>
    );
  }

  return (
    <section className="event-details">
      <button onClick={onBack} className="back-btn">← Voltar</button>
      
      <div className="event-details-header">
        <div className="event-category-badge">{event.category}</div>
        <h1>{event.title}</h1>
      </div>

      <div className="event-details-content">
        <div className="event-details-main">
          <div className="event-info-section">
            <h3>Informações do Evento</h3>
            <div className="event-info-grid">
              <div className="info-item">
                <span className="info-icon">📅</span>
                <div className="info-content">
                  <strong>Data</strong>
                  <p>{event.date}</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">🕒</span>
                <div className="info-content">
                  <strong>Horário</strong>
                  <p>{event.time}</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">📍</span>
                <div className="info-content">
                  <strong>Localização</strong>
                  <p>{event.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="event-description-section">
            <h3>Sobre o Evento</h3>
            <p className="event-full-description">{event.description}</p>
          </div>
        </div>

        <div className="event-details-sidebar">
          <div className="action-card">
            <h3>Interessado no evento?</h3>
            {isFavorite && (
              <button 
                className={`cta-button ${isFavorite(event.id) ? 'favorited' : ''}`}
                onClick={() => onToggleFavorite && onToggleFavorite(event)}
              >
                {isFavorite(event.id) ? '❤️ Remover dos Favoritos' : '🤍 Adicionar aos Favoritos'}
              </button>
            )}
            <button className="secondary-button">Compartilhar</button>
          </div>
        </div>
      </div>
    </section>
  );
}

