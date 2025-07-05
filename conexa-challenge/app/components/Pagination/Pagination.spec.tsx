import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  describe("Botón Anterior", () => {
    it("debe estar deshabilitado cuando esté en la primera página", () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const prevButton = screen.getByText("Anterior");
      expect(prevButton).toBeDisabled();
      expect(prevButton).toHaveClass("cursor-not-allowed");
    });

    it("debe estar habilitado cuando esté después de la primera página", () => {
      render(
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const prevButton = screen.getByText("Anterior");
      expect(prevButton).not.toBeDisabled();
      expect(prevButton).toHaveClass("hover:bg-blue-600");
    });

    it("debe llamar onPageChange con la página anterior cuando se hace clic", () => {
      render(
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const prevButton = screen.getByText("Anterior");
      fireEvent.click(prevButton);

      expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });
  });

  describe("Botón Siguiente", () => {
    it("debe estar deshabilitado cuando esté en la última página", () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const nextButton = screen.getByText("Siguiente");
      expect(nextButton).toBeDisabled();
      expect(nextButton).toHaveClass("cursor-not-allowed");
    });

    it("debe estar habilitado cuando esté en cualquier página menor a la última", () => {
      render(
        <Pagination
          currentPage={2}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const nextButton = screen.getByText("Siguiente");
      expect(nextButton).not.toBeDisabled();
      expect(nextButton).toHaveClass("hover:bg-blue-600");
    });

    it("debe llamar onPageChange con la página siguiente cuando se hace clic", () => {
      render(
        <Pagination
          currentPage={2}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const nextButton = screen.getByText("Siguiente");
      fireEvent.click(nextButton);

      expect(mockOnPageChange).toHaveBeenCalledWith(3);
    });
  });

  describe("Texto de paginación", () => {
    it('debe mostrar "Página X de XX" con los valores correctos', () => {
      render(
        <Pagination
          currentPage={3}
          totalPages={10}
          onPageChange={mockOnPageChange}
        />
      );

      expect(screen.getByText("Página 3 de 10")).toBeInTheDocument();
    });

    it('debe mostrar "Página 1 de 1" cuando solo hay una página', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={1}
          onPageChange={mockOnPageChange}
        />
      );

      expect(screen.getByText("Página 1 de 1")).toBeInTheDocument();
    });
  });

  describe("Casos extremos", () => {
    it("debe manejar correctamente cuando currentPage=1 y totalPages=1", () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={1}
          onPageChange={mockOnPageChange}
        />
      );

      const prevButton = screen.getByText("Anterior");
      const nextButton = screen.getByText("Siguiente");

      expect(prevButton).toBeDisabled();
      expect(nextButton).toBeDisabled();
      expect(screen.getByText("Página 1 de 1")).toBeInTheDocument();
    });

    it("debe manejar correctamente la primera página de múltiples páginas", () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={10}
          onPageChange={mockOnPageChange}
        />
      );

      const prevButton = screen.getByText("Anterior");
      const nextButton = screen.getByText("Siguiente");

      expect(prevButton).toBeDisabled();
      expect(nextButton).not.toBeDisabled();
      expect(screen.getByText("Página 1 de 10")).toBeInTheDocument();
    });

    it("debe manejar correctamente la última página de múltiples páginas", () => {
      render(
        <Pagination
          currentPage={10}
          totalPages={10}
          onPageChange={mockOnPageChange}
        />
      );

      const prevButton = screen.getByText("Anterior");
      const nextButton = screen.getByText("Siguiente");

      expect(prevButton).not.toBeDisabled();
      expect(nextButton).toBeDisabled();
      expect(screen.getByText("Página 10 de 10")).toBeInTheDocument();
    });
  });

  describe("Estilos de botones", () => {
    it("debe aplicar estilos correctos a botones habilitados", () => {
      render(
        <Pagination
          currentPage={2}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const prevButton = screen.getByText("Anterior");
      const nextButton = screen.getByText("Siguiente");

      expect(prevButton).toHaveClass("bg-blue-500", "text-white");
      expect(nextButton).toHaveClass("bg-blue-500", "text-white");
    });

    it("debe aplicar estilos correctos a botones deshabilitados", () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={1}
          onPageChange={mockOnPageChange}
        />
      );

      const prevButton = screen.getByText("Anterior");
      const nextButton = screen.getByText("Siguiente");

      expect(prevButton).toHaveClass("bg-gray-100", "text-gray-400");
      expect(nextButton).toHaveClass("bg-gray-100", "text-gray-400");
    });
  });
});
