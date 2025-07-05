import { Character } from "../types/api";

interface CharacterCardProps {
  character: Character;
  isSelected?: boolean;
  disabled?: boolean;
  onSelect?: (character: Character | null) => void;
}

export default function CharacterCard({
  character,
  isSelected = false,
  disabled = false,
  onSelect,
}: CharacterCardProps) {
  return (
    <div
      className={`border rounded-lg p-4 transition-all ${
        disabled
          ? "bg-gray-100 border-gray-300 cursor-not-allowed opacity-60"
          : isSelected
          ? "border-blue-500 bg-blue-50 shadow-md cursor-pointer active:scale-95"
          : "border-gray-200 hover:border-gray-300 hover:shadow-md cursor-pointer active:scale-95 bg-white"
      }`}
      onClick={() => {
        if (disabled) return; // No hacer nada si está disabled

        if (isSelected) {
          onSelect?.(null);
        } else {
          onSelect?.(character);
        }
      }}
    >
      <div className="flex gap-4">
        <div className="relative">
          <img
            src={character.image}
            alt={character.name}
            className="w-20 h-20 rounded-md object-cover"
          />
          {isSelected && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
          {disabled && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✕</span>
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3
            className={`font-semibold text-lg ${
              disabled ? "text-gray-400" : "text-black"
            }`}
          >
            {character.name}
          </h3>
          <p
            className={`text-sm ${
              disabled ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <span className="inline-block w-2 h-2 bg-current rounded-full mr-2"></span>
            {character.status} - {character.species}
          </p>
          {disabled && (
            <p className="text-xs text-gray-400 mt-1 italic">
              Ya seleccionado en otra columna
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
