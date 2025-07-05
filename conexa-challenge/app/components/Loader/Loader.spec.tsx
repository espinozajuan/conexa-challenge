// Tests del componente Loader

import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader Component", () => {
  it("debe mostrar el mensaje por defecto", () => {
    render(<Loader />);

    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("debe mostrar la imagen loader.png", () => {
    render(<Loader />);

    const image = screen.getByAltText("Loading...");
    expect(image).toHaveAttribute("src", "/loader.png");
  });

  it("debe tener la clase de animación correcta", () => {
    render(<Loader />);

    const image = screen.getByAltText("Loading...");
    expect(image).toHaveClass("animate-spin");
  });

  it("debe aplicar tamaño pequeño correctamente", () => {
    render(<Loader size="sm" />);

    const image = screen.getByAltText("Loading...");
    const imageContainer = image.parentElement;
    expect(imageContainer).toHaveClass("w-12", "h-12");
  });

  it("debe aplicar tamaño mediano correctamente", () => {
    render(<Loader size="md" />);

    const image = screen.getByAltText("Loading...");
    const imageContainer = image.parentElement;
    expect(imageContainer).toHaveClass("w-16", "h-16");
  });

  it("debe aplicar tamaño grande correctamente", () => {
    render(<Loader size="lg" />);

    const image = screen.getByAltText("Loading...");
    const imageContainer = image.parentElement;
    expect(imageContainer).toHaveClass("w-24", "h-24");
  });

  it("debe aplicar className personalizado", () => {
    const customClass = "mi-clase-personalizada";
    render(<Loader className={customClass} />);

    const loaderContainer = screen.getByText("Cargando...").parentElement;
    expect(loaderContainer).toHaveClass(customClass);
  });
});
