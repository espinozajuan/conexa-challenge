import { render, screen } from "@testing-library/react";
import CharacterSection from "./CharacterSection";
import { Character } from "../../types/api";

jest.mock("../CharacterCard", () => {
  return function MockCharacterCard({ character }: any) {
    return (
      <div data-testid={`character-card-${character.id}`}>
        <span>{character.name}</span>
      </div>
    );
  };
});

jest.mock("../Pagination", () => {
  return function MockPagination({ currentPage, totalPages }: any) {
    return (
      <div data-testid="pagination">
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>
    );
  };
});

jest.mock("../Loader", () => {
  return function MockLoader({ message }: any) {
    return (
      <div data-testid="loader">
        <span>{message}</span>
      </div>
    );
  };
});

describe("CharacterSection Component", () => {
  const mockCharacters: Character[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Character ${i + 1}`,
    status: "Alive" as const,
    species: "Human",
    image: `https://example.com/char${i + 1}.jpg`,
    episode: ["ep1"],
  }));

  const mockOnCharacterSelect = jest.fn();
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnCharacterSelect.mockClear();
    mockOnPageChange.mockClear();
  });

  it("debe renderizar Pagination", () => {
    render(
      <CharacterSection
        title="Personaje 1"
        characters={mockCharacters}
        selectedCharacter={null}
        currentPage={1}
        totalPages={5}
        onCharacterSelect={mockOnCharacterSelect}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  it("debe renderizar 6 personajes en cada sección", () => {
    render(
      <CharacterSection
        title="Personaje 1"
        characters={mockCharacters}
        selectedCharacter={null}
        currentPage={1}
        totalPages={5}
        onCharacterSelect={mockOnCharacterSelect}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("Character 1")).toBeInTheDocument();
    expect(screen.getByText("Character 6")).toBeInTheDocument();
    expect(screen.queryByText("Character 7")).not.toBeInTheDocument();
  });

  it("debe renderizar el mensaje de error cuando ocurra", () => {
    render(
      <CharacterSection
        title="Personaje 1"
        characters={[]}
        selectedCharacter={null}
        currentPage={1}
        totalPages={5}
        onCharacterSelect={mockOnCharacterSelect}
        onPageChange={mockOnPageChange}
        error="Error al cargar personajes"
      />
    );

    expect(screen.getByText("Error al cargar personajes")).toBeInTheDocument();
  });

  it("debe renderizar el mensaje de 'Cargando personajes...'", () => {
    render(
      <CharacterSection
        title="Personaje 1"
        characters={[]}
        selectedCharacter={null}
        currentPage={1}
        totalPages={5}
        onCharacterSelect={mockOnCharacterSelect}
        onPageChange={mockOnPageChange}
        loading={true}
      />
    );

    expect(screen.getByText("Cargando personajes...")).toBeInTheDocument();
  });
});
