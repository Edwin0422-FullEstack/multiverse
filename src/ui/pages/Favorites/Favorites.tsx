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
    <main className="h-screen w-full bg-black main-gradient-bg galaxy-bg text-white relative overflow-y-auto overflow-x-hidden custom-scrollbar">
      {/* Nebulosa decorativa */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-green-500/10 to-transparent" />
      </div>

      <div className="relative z-10 p-6 md:p-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-green-500 font-black tracking-[0.3em] uppercase text-xs mb-3">Colección Personal</p>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
              MIS <span className="text-green-400">FAVORITOS</span>
            </h1>
          </div>
          <button 
            onClick={() => navigate('/characters')}
            className="group flex items-center gap-2 text-green-400 hover:text-green-300 font-black transition-all bg-green-500/5 px-6 py-3 rounded-2xl border border-green-500/10 hover:bg-green-500/10"
          >
            Explorar más personajes 
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 text-center animate-fade-in">
            <div className="w-32 h-32 bg-zinc-900/50 backdrop-blur-md rounded-full flex items-center justify-center mb-8 text-green-500/20 shadow-[0_0_50px_rgba(74,222,128,0.1)] border border-green-500/5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <p className="text-2xl text-zinc-400 font-black tracking-tight mb-2">EL LABORATORIO ESTÁ VACÍO</p>
            <p className="text-zinc-600 font-bold max-w-xs mx-auto">Aún no has reclutado especímenes favoritos para tu colección interdimensional.</p>
            <button 
              onClick={() => navigate('/characters')}
              className="mt-10 bg-green-600 px-10 py-4 rounded-2xl font-black text-white hover:bg-green-500 transition-all hover:scale-105 shadow-[0_10px_30px_rgba(22,163,74,0.3)]"
            >
              IR AL EXPLORADOR
            </button>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => <CharacterCardSkeleton key={i} />)}
          </div>
        ) : isError ? (
          <div className="text-center text-red-500 py-20 font-black">ERROR EN LA CRONOLOGÍA: No se pudieron cargar tus favoritos.</div>
        ) : (
          <div className="pb-24">
            <CharacterGrid characters={characters || []} />
          </div>
        )}
      </div>
    </main>
  );
};
