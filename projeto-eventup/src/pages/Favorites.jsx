import React from "react";

export default function Favorites() {
  return (
    <section>
      <div className="page-header">
        <h2>Meus Favoritos</h2>
        <p>Eventos que você marcou como favoritos</p>
      </div>
      <div className="favorites-content">
        <div className="empty-state">
          <div className="empty-icon">⭐</div>
          <h3>Nenhum favorito ainda</h3>
          <p>Explore os eventos na página inicial e marque seus favoritos!</p>
        </div>
      </div>
    </section>
  );
}
