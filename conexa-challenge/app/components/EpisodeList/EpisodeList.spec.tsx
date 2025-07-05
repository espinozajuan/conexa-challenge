import { render, screen } from "@testing-library/react";
import EpisodeList from "./EpisodeList";
import { Episode } from "../../types/api";

describe("EpisodeList Component", () => {
  const mockEpisode: Episode = {
    id: 1,
    name: "Pilot",
    air_date: "December 2, 2013",
    episode: "S01E01",
    characters: ["character1", "character2"],
  };

  it("debe renderizar el scroll si hay más de 8 episodios", () => {
    const manyEpisodes: Episode[] = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Episode ${i + 1}`,
      air_date: `Date ${i + 1}`,
      episode: `S01E${(i + 1).toString().padStart(2, "0")}`,
      characters: [],
    }));

    const { container } = render(
      <EpisodeList episodes={manyEpisodes} title="Episodios" />
    );

    const scrollContainer = container.querySelector(".overflow-y-auto");
    expect(scrollContainer).toBeInTheDocument();
  });

  it('debe renderizar "No hay episodios para mostrar" si no hay información', () => {
    render(<EpisodeList episodes={[]} title="Episodios" />);

    expect(
      screen.getByText("No hay episodios para mostrar")
    ).toBeInTheDocument();
  });

  it("debe renderizar correctamente el episodio con su episode, name, y air_date", () => {
    render(<EpisodeList episodes={[mockEpisode]} title="Episodios" />);

    expect(screen.getByText("S01E01")).toBeInTheDocument();
    expect(screen.getByText("Pilot")).toBeInTheDocument();
    expect(screen.getByText("December 2, 2013")).toBeInTheDocument();
  });
});
