"use client";

import { useEffect, useState } from "react";
import { getCharacters } from "./lib/api";
import { Character } from "./types/api";

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCharacters(1);
        setCharacters(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error fetching data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading characters...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Rick & Morty Characters</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {characters.map((character) => (
          <div key={character.id} className="border rounded-lg p-4 shadow-md">
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{character.name}</h2>
            <p className="text-gray-600">Status: {character.status}</p>
            <p className="text-gray-600">Species: {character.species}</p>
            <p className="text-sm text-gray-500 mt-2">
              Episodes: {character.episode.length}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
