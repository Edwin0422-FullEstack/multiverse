import { useNavigate } from 'react-router-dom';
import type { Character } from '../../../core/models/character/model';
import { useFavorites } from '../../../application/hooks/useFavorites';
import { StatusBadge } from '../atoms/StatusBadge';

interface Props {
  character: Character;
}

export const CharacterCard = ({ character }: Props) => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(character.id);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-800/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-500/50 hover:shadow-[0_8px_30px_rgba(74,222,128,0.15)]">
      
      {/* Botón de Favorito Rápido */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(character.id);
        }}
        className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-xl ${
          fav ? 'bg-red-500 text-white' : 'bg-black/40 text-white/50 hover:bg-black/60 hover:text-white'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill={fav ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </button>

      {/* Contenedor Clickable para Detalle */}
      <div 
        className="cursor-pointer flex-1 flex flex-col"
        onClick={() => navigate(`/characters/${character.id}`)}
      >
        <div className="relative aspect-square w-full overflow-hidden">
          <img
            src={character.image}
            alt={`Imagen de ${character.name}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-800/90 via-transparent to-transparent" />
        </div>

        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <h2 className="truncate text-2xl font-black text-white transition-colors group-hover:text-green-400">
              {character.name}
            </h2>
            
            <div className="mt-4 flex items-center justify-between">
              <StatusBadge status={character.status} />
              <span className="rounded-full border border-zinc-600 bg-zinc-900/50 px-3 py-1 text-xs font-bold tracking-wider text-zinc-400 uppercase">
                {character.species}
              </span>
            </div>
          </div>
        </div>
      </div>
      
    </article>
  );
};