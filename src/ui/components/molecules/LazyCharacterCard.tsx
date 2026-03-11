import { useState, useRef, useEffect } from 'react';
import type { Character } from '../../../core/models/character/model';
import { CharacterCard } from './CharacterCard';
import { CharacterCardSkeleton } from './CharacterCardSkeleton';

interface Props {
  character: Character;
}

export const LazyCharacterCard = ({ character }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        // Un margen amplio (600px) asegura que el usuario no vea el cambio de skeleton a card
        // pero que las cards muy lejanas se "apaguen" para ahorrar memoria.
        rootMargin: '600px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full min-h-[400px]">
      {isVisible ? (
        <CharacterCard character={character} />
      ) : (
        <CharacterCardSkeleton />
      )}
    </div>
  );
};
