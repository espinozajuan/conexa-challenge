import { Character } from "../../types/api";

export interface CharacterSectionProps {
  title: string;
  characters: Character[];
  selectedCharacter: Character | null;
  disabledCharacter?: Character | null;
  currentPage: number;
  totalPages: number;
  onCharacterSelect: (character: Character | null) => void;
  onPageChange: (page: number) => void;
  loading?: boolean;
  error?: string | null;
}
