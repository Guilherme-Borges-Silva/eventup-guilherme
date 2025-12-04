/* eslint-env vitest */
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Header from "../components/Header";
import { AuthProvider } from "../contexts/AuthContext";
import { SearchProvider } from "../contexts/SearchContext";

// Mock do AuthContext para simular usuário autenticado quando necessário
const mockAuthValue = {
  user: { email: "test@test.com", name: "Teste" },
  isAuthenticated: false,
  loading: false,
  login: vi.fn(),
  logout: vi.fn(),
  saveUserFavorites: vi.fn(),
  loadUserFavorites: vi.fn()
};

vi.mock("../contexts/AuthContext", async () => {
  const actual = await vi.importActual("../contexts/AuthContext");
  return {
    ...actual,
    useAuth: () => mockAuthValue
  };
});

const renderHeader = (props = {}) => {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <SearchProvider>
          <Header
            currentPage="home"
            favoritesCount={0}
            onLogout={vi.fn()}
            {...props}
          />
        </SearchProvider>
      </AuthProvider>
    </MemoryRouter>
  );
};

describe("Header", () => {
  it("renderiza o título e tagline da aplicação", () => {
    renderHeader();

    expect(screen.getByText("EventUp")).toBeInTheDocument();
    expect(screen.getByText("Eventos na palma da mão")).toBeInTheDocument();
  });

  it("ao digitar na busca, o termo é atualizado e exibido no campo", async () => {
    const user = userEvent.setup();
    renderHeader();

    // Busca o campo de busca (pode estar em desktop ou mobile)
    const searchInputs = screen.getAllByPlaceholderText("Buscar eventos...");
    const searchInput = searchInputs[0];
    await user.type(searchInput, "tecnologia");

    // verifica se o termo digitado está no campo
    await waitFor(() => {
      expect(searchInput).toHaveValue("tecnologia");
    });
  });

  it("ao limpar a busca, o campo fica vazio e o botão de limpar desaparece", async () => {
    const user = userEvent.setup();
    renderHeader();

    const searchInputs = screen.getAllByPlaceholderText("Buscar eventos...");
    const searchInput = searchInputs[0];
    await user.type(searchInput, "teste");

    // verifica se o botão de limpar aparece dentro do mesmo bloco de busca usado
    const clearButton = within(searchInput.closest('.search-bar') ?? searchInput.parentElement).getByLabelText("Limpar busca");
    expect(clearButton).toBeInTheDocument();

    await user.click(clearButton);

    // verifica se o campo foi limpo
    await waitFor(() => {
      expect(searchInput).toHaveValue("");
      // consulta o DOM novamente em vez de reutilizar a referência antiga
      expect(screen.queryByLabelText("Limpar busca")).not.toBeInTheDocument();
    });
  });

  it("exibe o contador de favoritos quando há favoritos", () => {
    // Mock de usuário autenticado para ver o link de favoritos
    mockAuthValue.isAuthenticated = true;
    
    renderHeader({ favoritesCount: 3 });

    // verifica se o contador é exibido
    expect(screen.getByText(/Favoritos/i)).toBeInTheDocument();
    expect(screen.getByText("(3)")).toBeInTheDocument();
    
    // Restaura o mock
    mockAuthValue.isAuthenticated = false;
  });

  it("renderiza os links de navegação corretamente", () => {
    renderHeader();

    // verifica se os links de navegação estão presentes
    expect(screen.getByRole("link", { name: /Início/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Entrar/i })).toBeInTheDocument();
  });
});

