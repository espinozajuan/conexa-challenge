// Tests del componente CharacterCard

import { render, screen, fireEvent } from "@testing-library/react";
import CharacterCard from "./CharacterCard";
import { Character } from "../../types/api";

describe("CharacterCard Component", () => {
  const mockCharacter: Character = {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    episode: ["https://rickandmortyapi.com/api/episode/1"],
  };

  const mockDeadCharacter: Character = {
    ...mockCharacter,
    id: 2,
    name: "Morty Smith",
    status: "Dead",
    species: "Human",
  };

  const mockUnknownCharacter: Character = {
    ...mockCharacter,
    id: 3,
    name: "Jerry Smith",
    status: "unknown",
    species: "Human",
  };

  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  describe("Renderizado básico", () => {
    it("debe renderizar correctamente el nombre del personaje", () => {
      render(
        <CharacterCard character={mockCharacter} onSelect={mockOnSelect} />
      );

      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    });

    it("debe renderizar correctamente la imagen del personaje", () => {
      render(
        <CharacterCard character={mockCharacter} onSelect={mockOnSelect} />
      );

      const image = screen.getByAltText("Rick Sanchez");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", mockCharacter.image);
    });

    it("debe renderizar correctamente el estado y especie del personaje", () => {
      render(
        <CharacterCard character={mockCharacter} onSelect={mockOnSelect} />
      );

      expect(screen.getByText("Alive - Human")).toBeInTheDocument();
    });

    it("debe renderizar diferentes estados de personajes", () => {
      const { rerender } = render(
        <CharacterCard character={mockDeadCharacter} onSelect={mockOnSelect} />
      );

      expect(screen.getByText("Dead - Human")).toBeInTheDocument();

      rerender(
        <CharacterCard
          character={mockUnknownCharacter}
          onSelect={mockOnSelect}
        />
      );

      expect(screen.getByText("unknown - Human")).toBeInTheDocument();
    });
  });

  describe("Funcionalidad de selección", () => {
    it("debe llamar onSelect con el personaje cuando se hace clic y no está seleccionado", () => {
      render(
        <CharacterCard
          character={mockCharacter}
          isSelected={false}
          onSelect={mockOnSelect}
        />
      );

      const card = screen
        .getByText("Rick Sanchez")
        .closest("div[class*='border']");
      fireEvent.click(card!);

      expect(mockOnSelect).toHaveBeenCalledWith(mockCharacter);
    });

    it("debe llamar onSelect con null cuando se hace clic y ya está seleccionado", () => {
      render(
        <CharacterCard
          character={mockCharacter}
          isSelected={true}
          onSelect={mockOnSelect}
        />
      );

      const card = screen
        .getByText("Rick Sanchez")
        .closest("div[class*='border']");
      fireEvent.click(card!);

      expect(mockOnSelect).toHaveBeenCalledWith(null);
    });

    it("debe mostrar el ícono de check cuando está seleccionado", () => {
      render(
        <CharacterCard
          character={mockCharacter}
          isSelected={true}
          onSelect={mockOnSelect}
        />
      );

      expect(screen.getByText("✓")).toBeInTheDocument();
    });
  });

  describe("Prevención de selección duplicada", () => {
    it("no debe permitir selección cuando está deshabilitado", () => {
      render(
        <CharacterCard
          character={mockCharacter}
          disabled={true}
          onSelect={mockOnSelect}
        />
      );

      const card = screen
        .getByText("Rick Sanchez")
        .closest("div[class*='border']");
      fireEvent.click(card!);

      expect(mockOnSelect).not.toHaveBeenCalled();
    });

    it("debe mostrar el mensaje 'Ya seleccionado en otra columna' cuando está deshabilitado", () => {
      render(
        <CharacterCard
          character={mockCharacter}
          disabled={true}
          onSelect={mockOnSelect}
        />
      );

      expect(
        screen.getByText("Ya seleccionado en otra columna")
      ).toBeInTheDocument();
    });

    it("debe mostrar el ícono X cuando está deshabilitado", () => {
      render(
        <CharacterCard
          character={mockCharacter}
          disabled={true}
          onSelect={mockOnSelect}
        />
      );

      expect(screen.getByText("✕")).toBeInTheDocument();
    });
  });

  describe("Casos sin onSelect", () => {
    it("debe renderizar correctamente sin la función onSelect", () => {
      render(<CharacterCard character={mockCharacter} />);

      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    });

    it("debe permitir hacer clic sin errores cuando no se proporciona onSelect", () => {
      render(<CharacterCard character={mockCharacter} />);

      const card = screen
        .getByText("Rick Sanchez")
        .closest("div[class*='border']");
      expect(() => fireEvent.click(card!)).not.toThrow();
    });
  });
});
