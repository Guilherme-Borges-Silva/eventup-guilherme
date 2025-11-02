import React from "react";
import EventList from "../components/EventList";

export default function Home({ onViewDetails, onToggleFavorite, isFavorite }) {
  return (
    <section>
      <div className="page-header">
        <h2>Próximos Eventos</h2>
        <p>Descubra os melhores eventos que estão acontecendo por aí</p>
      </div>
      <EventList 
        onViewDetails={onViewDetails}
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
      />
    </section>
  );
}
