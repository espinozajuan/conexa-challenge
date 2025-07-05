import { Character, Episode, ApiResponse } from "../types/api";

const API_BASE = "https://rickandmortyapi.com/api";

// Función para hacer fetch a la API
async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

// Obtener personajes con paginación
export async function getCharacters(
  page: number = 1
): Promise<ApiResponse<Character>> {
  return fetchFromAPI<ApiResponse<Character>>(`/character?page=${page}`);
}

// Obtener episodios por IDs
export async function getEpisodes(ids: number[]): Promise<Episode[]> {
  if (ids.length === 0) return [];

  const idsString = ids.join(",");
  const result = await fetchFromAPI<Episode | Episode[]>(
    `/episode/${idsString}`
  );

  // La API devuelve un episodio si hay un ID, array si hay múltiples
  return Array.isArray(result) ? result : [result];
}

// Extraer ID de episodio desde URL
export function getEpisodeIdFromUrl(url: string): number {
  const match = url.match(/\/episode\/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}
