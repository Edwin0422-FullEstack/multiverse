import { useQuery } from '@tanstack/react-query';
import { episodeRepository } from '../../infrastructure/repositories/episode.repository';

export const useEpisodes = (episodeUrls: string[]) => {
  // Extraemos los IDs de las URLs de los episodios
  // Ejemplo: "https://rickandmortyapi.com/api/episode/1" -> 1
  const ids = episodeUrls
    .map(url => url.split('/').pop())
    .filter(Boolean)
    .map(Number);

  return useQuery({
    queryKey: ['episodes', ids],
    queryFn: () => episodeRepository.getEpisodes(ids),
    enabled: ids.length > 0,
    staleTime: 1000 * 60 * 60, // Los episodios cambian poco
  });
};
