import type { Character } from '../../../core/models/character/model';
import { CharacterCard } from '../molecules/CharacterCard';

interface Props {
  characters: Character[];
}

export const CharacterGrid = ({ characters }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
};