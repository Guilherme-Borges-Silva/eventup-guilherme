/* eslint-env vitest */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import EventCard from "../components/EventCard";

const mockEvent = {
  id: "test-1",
  title: "Evento de Teste",
  date: "15 de Janeiro, 2026",
  time: "14:30",
  location: "São Paulo, SP",
  description: "Descrição completa do evento de teste para validação",
  category: "Tecnologia",
  distance: 5.2
};

describe("EventCard", () => {
  it("renderiza todos os dados do evento completamente", () => {
    const mockOnViewDetails = vi.fn();
    const mockOnToggleFavorite = vi.fn();
    const mockIsFavorite = vi.fn(() => false);

    render(
      <EventCard
        event={mockEvent}
        onViewDetails={mockOnViewDetails}
        onToggleFavorite={mockOnToggleFavorite}
        isFavorite={mockIsFavorite}
      />
    );

    // verifica se todos os dados principais estão sendo renderizados
    expect(screen.getByText("Evento de Teste")).toBeInTheDocument();
    // usa regex para evitar falha por prefixos (ex: emojis) no conteúdo
    expect(screen.getByText(/15 de Janeiro, 2026/)).toBeInTheDocument();
    expect(screen.getByText(/14:30/)).toBeInTheDocument();
    expect(screen.getByText(/São Paulo, SP/)).toBeInTheDocument();
    expect(screen.getByText("Descrição completa do evento de teste para validação")).toBeInTheDocument();
    expect(screen.getByText("Tecnologia")).toBeInTheDocument();
    expect(screen.getByText(/5\.2km/i)).toBeInTheDocument();
  });

  it("ao clicar em favoritar, o evento é adicionado aos favoritos", async () => {
    const user = userEvent.setup();
    const mockOnToggleFavorite = vi.fn();
    const mockIsFavorite = vi.fn(() => false);

    render(
      <EventCard
        event={mockEvent}
        onViewDetails={vi.fn()}
        onToggleFavorite={mockOnToggleFavorite}
        isFavorite={mockIsFavorite}
      />
    );

    const favoriteButton = screen.getByTitle("Adicionar aos favoritos");
    await user.click(favoriteButton);

    // verifica se a função foi chamada com o evento correto
    expect(mockOnToggleFavorite).toHaveBeenCalledTimes(1);
    expect(mockOnToggleFavorite).toHaveBeenCalledWith(mockEvent);
  });

  it("ao clicar em ver detalhes, o evento é passado para a função de visualização", async () => {
    const user = userEvent.setup();
    const mockOnViewDetails = vi.fn();

    render(
      <EventCard
        event={mockEvent}
        onViewDetails={mockOnViewDetails}
        onToggleFavorite={vi.fn()}
        isFavorite={vi.fn(() => false)}
      />
    );

    const detailsButton = screen.getByRole("button", { name: /Ver Detalhes/i });
    await user.click(detailsButton);

    // verifica se a função foi chamada com o evento correto
    expect(mockOnViewDetails).toHaveBeenCalledTimes(1);
    expect(mockOnViewDetails).toHaveBeenCalledWith(mockEvent);
  });

  it("exibe o estado de favoritado quando o evento está nos favoritos", () => {
    const mockIsFavorite = vi.fn(() => true);

    render(
      <EventCard
        event={mockEvent}
        onViewDetails={vi.fn()}
        onToggleFavorite={vi.fn()}
        isFavorite={mockIsFavorite}
      />
    );

    // verifica se o botão mostra o estado favoritado
    expect(screen.getByTitle("Remover dos favoritos")).toBeInTheDocument();
    expect(screen.getByText("❤️")).toBeInTheDocument();
    expect(screen.queryByText("🤍")).not.toBeInTheDocument();
  });

  it("não exibe distância quando o evento não tem informação de distância", () => {
    const eventWithoutDistance = { ...mockEvent, distance: null };

    render(
      <EventCard
        event={eventWithoutDistance}
        onViewDetails={vi.fn()}
        onToggleFavorite={vi.fn()}
        isFavorite={vi.fn(() => false)}
      />
    );

    // verifica que a distância não é exibida
    expect(screen.queryByText(/km/i)).not.toBeInTheDocument();
  });
});

