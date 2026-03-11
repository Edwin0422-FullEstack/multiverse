import { useQuery } from '@tanstack/react-query';
import { characterRepository } from '../../infrastructure/repositories/character.repository';

export const useCharacter = (id: number) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => characterRepository.getCharacterById(id),
    staleTime: 1000 * 60 * 10, // 10 minutos
  });
};
