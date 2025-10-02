import React from "react";
import EventList from "../components/EventList";

export default function Home() {
  return (
    <section>
      <div className="page-header">
        <h2>Próximos Eventos</h2>
        <p>Descubra os melhores eventos que estão acontecendo por aí</p>
      </div>
      <EventList />
    </section>
  );
}
