/* eslint-env vitest */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import EventDetails from "../pages/EventDetails";

const mockEvent = {
  id: "test-1",
  title: "Evento Completo de Teste",
  date: "20 de Fevereiro, 2026",
  time: "18:00",
  location: "Rio de Janeiro, RJ",
  description: "Descrição detalhada do evento para testar a renderização completa de todas as informações",
  category: "Música"
};

describe("EventDetails", () => {
  it("renderiza todas as informações completas do evento", () => {
    const mockOnBack = vi.fn();
    const mockOnToggleFavorite = vi.fn();
    const mockIsFavorite = vi.fn(() => false);

    render(
      <EventDetails
        event={mockEvent}
        onBack={mockOnBack}
        onToggleFavorite={mockOnToggleFavorite}
        isFavorite={mockIsFavorite}
      />
    );

    // verifica se todos os dados estão sendo renderizados
    expect(screen.getByText("Evento Completo de Teste")).toBeInTheDocument();
    expect(screen.getByText("Música")).toBeInTheDocument();
    expect(screen.getByText("20 de Fevereiro, 2026")).toBeInTheDocument();
    expect(screen.getByText("18:00")).toBeInTheDocument();
    expect(screen.getByText("Rio de Janeiro, RJ")).toBeInTheDocument();
    expect(screen.getByText("Descrição detalhada do evento para testar a renderização completa de todas as informações")).toBeInTheDocument();
  });

  it("ao favoritar um evento, o estado muda de não favoritado para favoritado", async () => {
    const user = userEvent.setup();
    const mockOnToggleFavorite = vi.fn();
    const mockIsFavorite = vi.fn(() => false);

    const { rerender } = render(
      <EventDetails
        event={mockEvent}
        onBack={vi.fn()}
        onToggleFavorite={mockOnToggleFavorite}
        isFavorite={mockIsFavorite}
      />
    );

    // verifica estado inicial
    expect(screen.getByText(/Adicionar aos Favoritos/i)).toBeInTheDocument();

    const favoriteButton = screen.getByRole("button", { name: /Adicionar aos Favoritos/i });
    await user.click(favoriteButton);

    // verifica se a função foi chamada
    expect(mockOnToggleFavorite).toHaveBeenCalledTimes(1);
    expect(mockOnToggleFavorite).toHaveBeenCalledWith(mockEvent);

    // simula mudança de estado após favoritar
    const mockIsFavoriteAfter = vi.fn(() => true);
    rerender(
      <EventDetails
        event={mockEvent}
        onBack={vi.fn()}
        onToggleFavorite={mockOnToggleFavorite}
        isFavorite={mockIsFavoriteAfter}
      />
    );

    // verifica se o estado mudou para favoritado
    expect(screen.getByText(/Remover dos Favoritos/i)).toBeInTheDocument();
    expect(screen.queryByText(/Adicionar aos Favoritos/i)).not.toBeInTheDocument();
  });

  it("ao clicar em voltar, a função de voltar é chamada", async () => {
    const user = userEvent.setup();
    const mockOnBack = vi.fn();

    render(
      <EventDetails
        event={mockEvent}
        onBack={mockOnBack}
        onToggleFavorite={vi.fn()}
        isFavorite={vi.fn(() => false)}
      />
    );

    const backButton = screen.getByRole("button", { name: /Voltar/i });
    await user.click(backButton);

    // verifica se a função de voltar foi chamada
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it("exibe mensagem de erro quando evento não existe", () => {
    render(
      <EventDetails
        event={null}
        onBack={vi.fn()}
        onToggleFavorite={vi.fn()}
        isFavorite={vi.fn(() => false)}
      />
    );

    // verifica se a mensagem de erro é exibida
    expect(screen.getByText("Evento não encontrado")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Voltar para Início/i })).toBeInTheDocument();
  });

  it("renderiza botão de compartilhar com texto e ícone", () => {
    render(
      <EventDetails
        event={mockEvent}
        onBack={vi.fn()}
        onToggleFavorite={vi.fn()}
        isFavorite={vi.fn(() => false)}
      />
    );

    // verifica se o botão de compartilhar está presente com texto
    expect(screen.getByRole("button", { name: /Compartilhar/i })).toBeInTheDocument();
    expect(screen.getByText("Compartilhar")).toBeInTheDocument();
  });
});

