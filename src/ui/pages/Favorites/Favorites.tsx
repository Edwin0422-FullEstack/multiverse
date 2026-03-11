import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { characterRepository } from '../../../infrastructure/repositories/character.repository';
import { useFavorites } from '../../../application/hooks/useFavorites';
import { CharacterGrid } from '../../components/organisms/CharacterGrid';
import { CharacterCardSkeleton } from '../../components/molecules/CharacterCardSkeleton';

export const Favorites = () => {
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  const { data: characters, isLoading, isError } = useQuery({
    queryKey: ['favorite-characters', favorites],
    queryFn: () => characterRepository.getCharactersByIds(favorites),
    enabled: favorites.length > 0,
  });

  return (
    <main className="min-h-screen bg-zinc-950 p-6 md:p-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <h1 className="text-4xl font-black text-white">
          MIS <span className="text-green-400">FAVORITOS</span>
        </h1>
        <button 
          onClick={() => navigate('/characters')}
          className="text-green-400 hover:text-green-300 font-bold transition-colors"
        >
          Explorar más personajes →
        </button>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-6 text-zinc-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <p className="text-xl text-zinc-500 font-bold">Aún no has reclutado especímenes favoritos.</p>
          <button 
            onClick={() => navigate('/characters')}
            className="mt-8 bg-green-600 px-8 py-3 rounded-xl font-bold text-white hover:bg-green-500 transition-all hover:scale-105"
          >
            Ir al explorador
          </button>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <CharacterCardSkeleton key={i} />)}
        </div>
      ) : isError ? (
        <div className="text-center text-red-500 py-20">No se pudieron cargar tus especímenes favoritos.</div>
      ) : (
        <CharacterGrid characters={characters || []} />
      )}
    </main>
  );
};
