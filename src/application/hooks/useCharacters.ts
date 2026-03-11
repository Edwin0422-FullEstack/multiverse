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
    // Mantenemos la caché (memoization) por 10 minutos para evitar re-fetch al volver atrás
    gcTime: 1000 * 60 * 10,
  });
};