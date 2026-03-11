import { useQuery } from '@tanstack/react-query';
import { characterRepository } from '../../infrastructure/repositories/character.repository';

export const useCharacters = (page: number, name: string, status: string, species: string) => {
  return useQuery({
    // La 'queryKey' es vital: si cambia cualquier filtro, React Query dispara la petición.
    queryKey: ['characters', { page, name, status, species }],
    queryFn: () => characterRepository.getCharacters(page, name, status, species),
    
    // Bonus de Performance: Mantiene los datos anteriores mientras carga los nuevos [cite: 380]
    placeholderData: (previousData) => previousData,
    
    // No re-petición innecesaria si los datos tienen menos de 5 minutos
    staleTime: 1000 * 60 * 5, 
  });
};