import { useParams, useNavigate } from 'react-router-dom';
import { useCharacter } from '../../../application/hooks/useCharacter';
import { useEpisodes } from '../../../application/hooks/useEpisodes';
import { useFavorites } from '../../../application/hooks/useFavorites';
import { StatusBadge } from '../../components/atoms/StatusBadge';
import { CharacterCardSkeleton } from '../../components/molecules/CharacterCardSkeleton';

export const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const characterId = Number(id);

  const { data: character, isLoading, isError, error } = useCharacter(characterId);
  const { data: episodes, isLoading: isLoadingEpisodes } = useEpisodes(character?.episode || []);
  const { toggleFavorite, isFavorite } = useFavorites();

  if (isLoading) return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="w-full max-w-lg p-6">
        <CharacterCardSkeleton />
      </div>
    </div>
  );

  if (isError || !character) return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white p-6 text-center">
      <p className="text-red-500 font-bold text-xl mb-4">¡Gubba nub nub doo rah kah! Hubo un error.</p>
      <p className="text-zinc-400 mb-6">{(error as Error)?.message || 'Personaje no encontrado'}</p>
      <button 
        onClick={() => navigate('/characters')}
        className="bg-green-600 px-6 py-2 rounded-lg font-bold hover:bg-green-500 transition-colors"
      >
        Volver al explorador
      </button>
    </div>
  );

  const fav = isFavorite(character.id);

  return (
    <main className="min-h-screen bg-zinc-950 p-6 md:p-12 text-white">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-8 flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
        >
          ← Volver
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Imagen y Acción */}
          <div className="relative group">
            <div className="overflow-hidden rounded-3xl border-2 border-zinc-800 shadow-2xl transition-all duration-500 group-hover:border-green-500/50">
              <img 
                src={character.image} 
                alt={character.name} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            <button 
              onClick={() => toggleFavorite(character.id)}
              className={`absolute top-6 right-6 p-4 rounded-full backdrop-blur-md transition-all duration-300 shadow-xl ${
                fav ? 'bg-red-500 text-white' : 'bg-black/50 text-white/50 hover:bg-black/70 hover:text-white'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill={fav ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>

          {/* Información */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
                {character.name}
              </h1>
              <div className="flex flex-wrap gap-4">
                <StatusBadge status={character.status} />
                <span className="bg-zinc-800 px-4 py-1.5 rounded-full text-zinc-300 font-bold border border-zinc-700">
                  {character.species}
                </span>
                <span className="bg-zinc-800 px-4 py-1.5 rounded-full text-zinc-300 font-bold border border-zinc-700">
                  {character.gender}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
                <p className="text-zinc-500 text-sm uppercase tracking-widest mb-2">Última ubicación</p>
                <p className="text-xl font-bold">{character.location.name}</p>
              </div>
              <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
                <p className="text-zinc-500 text-sm uppercase tracking-widest mb-2">Origen conocido</p>
                <p className="text-xl font-bold">{character.origin.name}</p>
              </div>
            </div>

            <section>
              <h2 className="text-2xl font-black text-green-400 mb-6 uppercase tracking-wider">Apariciones en episodios</h2>
              <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                {isLoadingEpisodes ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-16 w-full animate-pulse bg-zinc-900 rounded-xl" />
                  ))
                ) : episodes?.map((ep) => (
                  <div key={ep.id} className="group flex items-center justify-between bg-zinc-900/40 p-4 rounded-xl border border-zinc-800 transition-all hover:bg-zinc-800/60 hover:border-zinc-700">
                    <div>
                      <p className="text-zinc-100 font-bold">{ep.name}</p>
                      <p className="text-zinc-500 text-sm">{ep.episode} • {ep.air_date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};
