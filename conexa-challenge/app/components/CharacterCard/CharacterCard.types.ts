import { Character } from "../../types/api";

export interface CharacterCardProps {
  character: Character;
  isSelected?: boolean;
  disabled?: boolean;
  onSelect?: (character: Character | null) => void;
}
