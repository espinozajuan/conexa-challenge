import { CharacterSectionProps } from "./CharacterSection.types";
import CharacterCard from "../CharacterCard";
import Pagination from "../Pagination";
import Loader from "../Loader";

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
  error = null,
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

      {error ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="text-lg text-red-600 mb-2">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Recargar página
            </button>
          </div>
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader message="Cargando personajes..." size="md" />
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
