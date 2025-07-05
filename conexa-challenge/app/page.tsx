"use client";

import { useEffect, useState } from "react";
import { getCharacters, getEpisodes } from "./lib/api";
import { getAllEpisodeIds, separateEpisodes } from "./lib/episodes";
import { Character, Episode } from "./types/api";
import CharacterSection from "./components/CharacterSection";
import EpisodeList from "./components/EpisodeList";

export default function Home() {
  const [charactersCol1, setCharactersCol1] = useState<Character[]>([]);
  const [charactersCol2, setCharactersCol2] = useState<Character[]>([]);

  const [selectedChar1, setSelectedChar1] = useState<Character | null>(null);
  const [selectedChar2, setSelectedChar2] = useState<Character | null>(null);

  const [pageCol1, setPageCol1] = useState(1);
  const [pageCol2, setPageCol2] = useState(1);
  const [totalPagesCol1, setTotalPagesCol1] = useState(1);
  const [totalPagesCol2, setTotalPagesCol2] = useState(1);

  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [episodeSections, setEpisodeSections] = useState({
    character1Only: [] as Episode[],
    shared: [] as Episode[],
    character2Only: [] as Episode[],
  });

  const [loadingCol1, setLoadingCol1] = useState(true);
  const [loadingCol2, setLoadingCol2] = useState(true);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);

  const loadCharactersCol1 = async (page: number) => {
    setLoadingCol1(true);
    try {
      const data = await getCharacters(page);
      setCharactersCol1(data.results);
      setTotalPagesCol1(data.info.pages);
    } catch (error) {
      console.error("Error loading characters col1:", error);
    } finally {
      setLoadingCol1(false);
    }
  };

  const loadCharactersCol2 = async (page: number) => {
    setLoadingCol2(true);
    try {
      const data = await getCharacters(page);
      setCharactersCol2(data.results);
      setTotalPagesCol2(data.info.pages);
    } catch (error) {
      console.error("Error loading characters col2:", error);
    } finally {
      setLoadingCol2(false);
    }
  };

  const loadEpisodes = async () => {
    if (!selectedChar1 || !selectedChar2) {
      setEpisodes([]);
      setEpisodeSections({
        character1Only: [],
        shared: [],
        character2Only: [],
      });
      return;
    }

    setLoadingEpisodes(true);
    try {
      const episodeIds = getAllEpisodeIds(selectedChar1, selectedChar2);
      const episodeData = await getEpisodes(episodeIds);
      setEpisodes(episodeData);

      const sections = separateEpisodes(
        selectedChar1,
        selectedChar2,
        episodeData
      );
      setEpisodeSections(sections);
    } catch (error) {
      console.error("Error loading episodes:", error);
    } finally {
      setLoadingEpisodes(false);
    }
  };

  useEffect(() => {
    loadCharactersCol1(1);
    loadCharactersCol2(1);
  }, []);

  useEffect(() => {
    loadEpisodes();
  }, [selectedChar1, selectedChar2]);

  const handlePageChangeCol1 = (page: number) => {
    setPageCol1(page);
    loadCharactersCol1(page);
  };

  const handlePageChangeCol2 = (page: number) => {
    setPageCol2(page);
    loadCharactersCol2(page);
  };

  const hasChar1 = selectedChar1 !== null;
  const hasChar2 = selectedChar2 !== null;
  const bothSelected = hasChar1 && hasChar2;

  return (
    <div className="container mx-auto p-6 max-w-7xl min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">
          Rick & Morty Explorador de Episodios
        </h1>
        <p className="text-gray-600">
          Selecciona dos personajes para comparar sus episodios
        </p>
      </div>

      {/* Sección de personajes - Dos columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <CharacterSection
          title="Personaje 1"
          characters={charactersCol1}
          selectedCharacter={selectedChar1}
          disabledCharacter={selectedChar2}
          currentPage={pageCol1}
          totalPages={totalPagesCol1}
          onCharacterSelect={setSelectedChar1}
          onPageChange={handlePageChangeCol1}
          loading={loadingCol1}
        />

        <CharacterSection
          title="Personaje 2"
          characters={charactersCol2}
          selectedCharacter={selectedChar2}
          disabledCharacter={selectedChar1}
          currentPage={pageCol2}
          totalPages={totalPagesCol2}
          onCharacterSelect={setSelectedChar2}
          onPageChange={handlePageChangeCol2}
          loading={loadingCol2}
        />
      </div>

      <div className="border-t border-gray-200 mx-8"></div>

      <div className="space-y-6 mt-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-black">
            Comparación de Episodios
          </h2>
          {bothSelected ? (
            <p className="text-gray-600">
              {selectedChar1!.name} vs {selectedChar2!.name}
            </p>
          ) : (
            <p className="text-gray-500">
              {!hasChar1 && !hasChar2
                ? "Selecciona un personaje de cada columna"
                : !hasChar1
                ? "Selecciona un Personaje #1"
                : "Selecciona un Personaje #2"}
            </p>
          )}
        </div>

        {loadingEpisodes ? (
          <div className="flex justify-center items-center h-32">
            <div className="text-lg text-black">Cargando episodios...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <EpisodeList
              episodes={bothSelected ? episodeSections.character1Only : []}
              title={
                hasChar1
                  ? `${selectedChar1!.name} - Episodios Solista`
                  : "Personaje 1 - Episodios Solista"
              }
            />

            <EpisodeList
              episodes={bothSelected ? episodeSections.shared : []}
              title="Episodios Compartidos"
            />

            <EpisodeList
              episodes={bothSelected ? episodeSections.character2Only : []}
              title={
                hasChar2
                  ? `${selectedChar2!.name} - Episodios Solista`
                  : "Personaje #2 - Episodios Solista"
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
