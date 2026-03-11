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
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/5 bg-zinc-900/50 backdrop-blur-md transition-all duration-500 hover:-translate-y-3 hover:rotate-1 hover:shadow-[0_20px_50px_rgba(34,197,94,0.2)]">
      
      {/* EFECTO DE LUZ RADIACTIVA TRASERA */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500/20 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

      {/* Botón de Favorito Rápido */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(character.id);
        }}
        className={`absolute top-6 right-6 z-20 p-3 rounded-2xl backdrop-blur-xl transition-all duration-300 shadow-2xl border ${
          fav 
            ? 'bg-red-500 text-white border-red-400' 
            : 'bg-black/40 text-white/50 border-white/10 hover:bg-green-500/20 hover:text-green-400 hover:border-green-500/50'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill={fav ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </button>

      {/* Contenedor Clickable para Detalle */}
      <div 
        className="relative z-10 cursor-pointer flex-1 flex flex-col p-4"
        onClick={() => navigate(`/characters/${character.id}`)}
      >
        {/* IMAGEN CON MÁSCARA Y EFECTO */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] bg-zinc-800 shadow-inner">
          <img
            src={character.image}
            alt={character.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Capas de Luz */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
          <div className="absolute inset-0 border-[8px] border-zinc-900/50 rounded-[1.5rem] pointer-events-none" />
        </div>

        {/* INFO */}
        <div className="flex-1 p-4 pb-2 space-y-4">
          <div>
            <h2 className="text-2xl font-black text-white leading-tight transition-colors group-hover:text-green-400">
              {character.name}
            </h2>
            <div className="mt-3 flex items-center justify-between">
              <StatusBadge status={character.status} />
              <div className="flex flex-col items-end">
                 <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Specie</span>
                 <span className="text-xs font-bold text-zinc-300">{character.species}</span>
              </div>
            </div>
          </div>

          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500">
             <span>ID: #{character.id.toString().padStart(3, '0')}</span>
             <span className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">Ver Detalle →</span>
          </div>
        </div>
      </div>
      
    </article>
  );
};