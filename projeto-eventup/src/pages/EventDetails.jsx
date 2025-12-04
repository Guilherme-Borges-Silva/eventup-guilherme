import React from "react";

export default function EventDetails({ event, onBack, onToggleFavorite, isFavorite }) {
  // verifica se o evento existe, se não tiver mostra mensagem de erro
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

  const handleShare = async () => {
    // tenta usar a API nativa de compartilhamento do navegador
    // se não funcionar, copia o link pro clipboard
    const shareData = {
      title: event.title,
      text: `${event.title} - ${event.date} às ${event.time}`,
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // se o navegador não suporta compartilhamento nativo, copia o link
        await navigator.clipboard.writeText(window.location.href);
        alert('Link do evento copiado para a área de transferência!');
      }
    } catch (error) {
      // se der erro mas não for porque o usuário cancelou, tenta copiar mesmo assim
      if (error.name !== 'AbortError') {
        try {
          await navigator.clipboard.writeText(window.location.href);
          alert('Link do evento copiado para a área de transferência!');
        } catch (clipboardError) {
          console.error('Erro ao compartilhar:', clipboardError);
        }
      }
    }
  };

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
            {/* só mostra o botão de favorito se a função isFavorite existir */}
            {typeof isFavorite === 'function' && (
              <button 
                className={`cta-button ${isFavorite(event.id) ? 'favorited' : ''}`}
                onClick={() => onToggleFavorite && onToggleFavorite(event)}
              >
                {isFavorite(event.id) ? '❤️ Remover dos Favoritos' : '🤍 Adicionar aos Favoritos'}
              </button>
            )}
            <button className="secondary-button share-button" onClick={handleShare}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                <path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z"/>
              </svg>
              <span>Compartilhar</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

