import { useInfiniteQuery } from '@tanstack/react-query';
import { characterRepository } from '../../infrastructure/repositories/character.repository';

export const useCharacters = (name: string, status: string, species: string) => {
  return useInfiniteQuery({
    queryKey: ['characters', { name, status, species }],
    // React Query pasará automáticamente el pageParam
    queryFn: ({ pageParam }) => characterRepository.getCharacters(pageParam, name, status, species),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // Extraemos el número de página de la URL 'next' proporcionada por la API
      if (!lastPage.info.next) return undefined;
      const url = new URL(lastPage.info.next);
      const nextPage = url.searchParams.get('page');
      return nextPage ? Number(nextPage) : undefined;
    },
    staleTime: 1000 * 60 * 5, 
    // Mantenemos la caché por 10 minutos
    gcTime: 1000 * 60 * 10,
    // Bonus: Reintento automático en caso de fallo de red ("Failed to fetch")
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};