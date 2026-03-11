import { useQuery } from '@tanstack/react-query';
import { characterRepository } from '../../infrastructure/repositories/character.repository';

export const useCharacters = (page: number, name: string, status: string) => {
  return useQuery({
    // La 'queryKey' es vital: si cambia la página, el nombre o el status, 
    // React Query dispara automáticamente una nueva petición.
    queryKey: ['characters', { page, name, status }],
    queryFn: () => characterRepository.getCharacters(page, name, status),
    
    // Bonus de Performance: Mantiene los datos anteriores mientras carga los nuevos [cite: 380]
    placeholderData: (previousData) => previousData,
    
    // No re-petición innecesaria si los datos tienen menos de 5 minutos
    staleTime: 1000 * 60 * 5, 
  });
};