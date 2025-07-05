import { Character } from "../types/api";
import CharacterCard from "./CharacterCard";
import Pagination from "./Pagination";

interface CharacterSectionProps {
  title: string;
  characters: Character[];
  selectedCharacter: Character | null;
  disabledCharacter?: Character | null;
  currentPage: number;
  totalPages: number;
  onCharacterSelect: (character: Character | null) => void;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export default function CharacterSection({
  title,
  characters,
  selectedCharacter,
  disabledCharacter = null,
  currentPage,
  totalPages,
  onCharacterSelect,
  onPageChange,
  loading = false,
}: CharacterSectionProps) {
  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-black">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">
          {selectedCharacter
            ? "Haz click en el personaje seleccionado para deseleccionar"
            : disabledCharacter
            ? "Selecciona un personaje (uno ya está seleccionado en la otra columna)"
            : "Selecciona un personaje"}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-black">Cargando personajes...</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {characters.slice(0, 6).map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                isSelected={selectedCharacter?.id === character.id}
                disabled={disabledCharacter?.id === character.id}
                onSelect={onCharacterSelect}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      )}
    </div>
  );
}
