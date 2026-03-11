import type { Character } from '../../../core/models/character/model';
import { LazyCharacterCard } from '../molecules/LazyCharacterCard';

interface Props {
  characters: Character[];
}

export const CharacterGrid = ({ characters }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {characters.map((character) => (
        <LazyCharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
};