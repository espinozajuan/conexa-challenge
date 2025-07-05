import { Character, Episode } from "../types/api";
import { getEpisodeIdFromUrl } from "./api";

// Obtener todos los IDs únicos de episodios de dos personajes
export function getAllEpisodeIds(
  char1: Character | null,
  char2: Character | null
): number[] {
  const episodeIds = new Set<number>();

  if (char1) {
    char1.episode.forEach((url) => {
      const id = getEpisodeIdFromUrl(url);
      if (id > 0) episodeIds.add(id);
    });
  }

  if (char2) {
    char2.episode.forEach((url) => {
      const id = getEpisodeIdFromUrl(url);
      if (id > 0) episodeIds.add(id);
    });
  }

  return Array.from(episodeIds);
}

// Separar episodios en solo-personaje1, compartidos y solo-personaje2
export function separateEpisodes(
  char1: Character | null,
  char2: Character | null,
  episodes: Episode[]
) {
  if (!char1 || !char2) {
    return {
      character1Only: [],
      shared: [],
      character2Only: [],
    };
  }

  // Obtener IDs de episodios para cada personaje
  const char1EpisodeIds = new Set(
    char1.episode.map((url) => getEpisodeIdFromUrl(url))
  );
  const char2EpisodeIds = new Set(
    char2.episode.map((url) => getEpisodeIdFromUrl(url))
  );

  const character1Only: Episode[] = [];
  const shared: Episode[] = [];
  const character2Only: Episode[] = [];

  episodes.forEach((episode) => {
    const inChar1 = char1EpisodeIds.has(episode.id);
    const inChar2 = char2EpisodeIds.has(episode.id);

    if (inChar1 && inChar2) {
      shared.push(episode);
    } else if (inChar1) {
      character1Only.push(episode);
    } else if (inChar2) {
      character2Only.push(episode);
    }
  });

  return {
    character1Only,
    shared,
    character2Only,
  };
}
