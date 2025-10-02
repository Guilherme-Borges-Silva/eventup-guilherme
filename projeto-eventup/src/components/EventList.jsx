import React from "react";
import EventCard from "./EventCard";

export default function EventList() {
  const events = [
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
    },
    {
      id: 4,
      title: "Festival de Música Indie",
      date: "3 de Março, 2026",
      time: "16:00 - 23:00",
      location: "Parque da Cidade - Brasília, DF",
      description: "Um festival incrível com as melhores bandas independentes do Brasil. Comida, bebida e muita música de qualidade.",
      category: "Música"
    },
    {
      id: 5,
      title: "Expo de Startups",
      date: "10 de Março, 2026",
      time: "10:00 - 19:00",
      location: "Centro de Eventos - São Paulo, SP",
      description: "Conheça as startups mais inovadoras do país, participe de palestras e conecte-se com investidores e empreendedores.",
      category: "Empreendedorismo"
    },
    {
      id: 6,
      title: "Workshop de UX/UI Design",
      date: "17 de Março, 2026",
      time: "09:00 - 16:00",
      location: "Escola de Design - Porto Alegre, RS",
      description: "Aprenda as melhores práticas de design de interface e experiência do usuário com profissionais renomados do mercado.",
      category: "Design"
    }
  ];

  return (
    <div className="event-list">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
