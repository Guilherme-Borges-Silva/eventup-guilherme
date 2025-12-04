/* eslint-env vitest */
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Favorites from "../pages/Favorites";

const mockFavorites = [
  {
    id: "fav-1",
    title: "Evento Favorito 1",
    date: "10 de Março, 2026",
    time: "15:00",
    location: "Belo Horizonte, MG",
    description: "Primeiro evento favorito",
    category: "Esportes"
  },
  {
    id: "fav-2",
    title: "Evento Favorito 2",
    date: "25 de Março, 2026",
    time: "20:00",
    location: "Curitiba, PR",
    description: "Segundo evento favorito",
    category: "Arte"
  }
];

describe("Favorites", () => {
  it("renderiza todos os eventos favoritos completamente", () => {
    const mockOnViewDetails = vi.fn();
    const mockOnToggleFavorite = vi.fn();
    const mockIsFavorite = vi.fn(() => true);

    render(
      <Favorites
        favorites={mockFavorites}
        onViewDetails={mockOnViewDetails}
        onToggleFavorite={mockOnToggleFavorite}
        isFavorite={mockIsFavorite}
      />
    );

    // verifica se todos os eventos favoritos estão sendo renderizados
    expect(screen.getByText("Evento Favorito 1")).toBeInTheDocument();
    expect(screen.getByText("Evento Favorito 2")).toBeInTheDocument();
    // Busca considerando os emojis que podem estar junto com o texto
    expect(screen.getByText(/10 de Março, 2026/i)).toBeInTheDocument();
    expect(screen.getByText(/25 de Março, 2026/i)).toBeInTheDocument();
    expect(screen.getByText(/Belo Horizonte, MG/i)).toBeInTheDocument();
    expect(screen.getByText(/Curitiba, PR/i)).toBeInTheDocument();
    expect(screen.getByText("Esportes")).toBeInTheDocument();
    expect(screen.getByText("Arte")).toBeInTheDocument();
  });

  it("exibe mensagem quando não há favoritos", () => {
    render(
      <Favorites
        favorites={[]}
        onViewDetails={vi.fn()}
        onToggleFavorite={vi.fn()}
        isFavorite={vi.fn(() => false)}
      />
    );

    // verifica se a mensagem de estado vazio é exibida
    expect(screen.getByText("Nenhum favorito ainda")).toBeInTheDocument();
    expect(screen.getByText("Explore os eventos na página inicial e marque seus favoritos!")).toBeInTheDocument();
  });

  it("renderiza o título e descrição da página corretamente", () => {
    render(
      <Favorites
        favorites={mockFavorites}
        onViewDetails={vi.fn()}
        onToggleFavorite={vi.fn()}
        isFavorite={vi.fn(() => true)}
      />
    );

    // verifica se o cabeçalho está completo
    expect(screen.getByText("Meus Favoritos")).toBeInTheDocument();
    expect(screen.getByText("Eventos que você marcou como favoritos")).toBeInTheDocument();
  });
});

