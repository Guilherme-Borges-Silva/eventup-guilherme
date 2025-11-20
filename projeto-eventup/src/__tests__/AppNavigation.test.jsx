/* eslint-env vitest */
import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import App from "../App";

const mockEvents = [
  {
    id: "test-1",
    title: "Evento Teste",
    date: "01 de Janeiro, 2026",
    time: "10:00",
    location: "São Paulo, SP",
    description: "Descrição de teste",
    category: "Tecnologia",
  },
  {
    id: "test-2",
    title: "Segundo Evento",
    date: "02 de Janeiro, 2026",
    time: "14:00",
    location: "Rio de Janeiro, RJ",
    description: "Outro evento de exemplo",
    category: "Negócios",
  },
];

vi.mock("../services/ticketmasterApi", () => ({
  fetchEvents: vi.fn(() => Promise.resolve(mockEvents)),
}));

const renderApp = () =>
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

describe("App navigation experiences", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("permite navegar pelo menu entre Início e Favoritos", async () => {
    renderApp();

    expect(await screen.findByText(/Próximos Eventos/i)).toBeInTheDocument();

    const nav = await screen.findByRole("navigation");
    const favoritesLink = within(nav).getByRole("link", { name: /Favoritos/i });

    await userEvent.click(favoritesLink);

    expect(await screen.findByText(/Meus Favoritos/i)).toBeInTheDocument();
  });

  it("habilita gesto de swipe para ir até favoritos", async () => {
    renderApp();
    const main = await screen.findByTestId("app-main");

    fireEvent.touchStart(main, { touches: [{ clientX: 220, clientY: 150 }] });
    fireEvent.touchEnd(main, { changedTouches: [{ clientX: 20, clientY: 150 }] });

    expect(await screen.findByText(/Meus Favoritos/i)).toBeInTheDocument();
  });

  it("permite voltar dos detalhes com gesto de swipe para baixo", async () => {
    renderApp();

    const detailsButtons = await screen.findAllByRole("button", { name: /Ver Detalhes/i });
    await userEvent.click(detailsButtons[0]);

    expect(await screen.findByRole("button", { name: /Voltar/i })).toBeInTheDocument();

    const main = screen.getByTestId("app-main");
    fireEvent.touchStart(main, { touches: [{ clientX: 120, clientY: 30 }] });
    fireEvent.touchEnd(main, { changedTouches: [{ clientX: 120, clientY: 160 }] });

    expect(await screen.findByText(/Próximos Eventos/i)).toBeInTheDocument();
  });
});

