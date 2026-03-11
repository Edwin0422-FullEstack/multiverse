import { useState } from 'react';
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
  const [isFlipped, setIsFlipped] = useState(false);
  const fav = isFavorite(character.id);

  const handleFlip = () => setIsFlipped(!isFlipped);

  return (
    <div className="group perspective-1000 w-full h-[520px] cursor-pointer" onClick={handleFlip}>
      <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* CARA FRONTAL */}
        <div className="absolute inset-0 backface-hidden">
          <article className="h-full flex flex-col overflow-hidden rounded-[2.5rem] border border-white/5 bg-zinc-900/40 backdrop-blur-xl shadow-2xl transition-all duration-500 group-hover:border-green-500/30">
            {/* Imagen Principal */}
            <div className="relative h-[300px] w-full overflow-hidden">
              <img
                src={character.image}
                alt={character.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6">
                <StatusBadge status={character.status} />
              </div>
            </div>

            {/* Info Frontal */}
            <div className="flex-1 p-6 flex flex-col justify-center">
              <h2 className="text-3xl font-black text-white leading-tight tracking-tighter group-hover:text-green-400 transition-colors">
                {character.name}
              </h2>
              <p className="text-zinc-500 font-bold text-sm uppercase tracking-widest mt-1">{character.species}</p>
            </div>

            {/* Favorito (Botón Independiente) */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(character.id);
              }}
              className={`absolute top-6 right-6 z-20 p-4 rounded-2xl backdrop-blur-md transition-all duration-300 ${
                fav ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'bg-black/50 text-white/40 hover:text-white border border-white/10'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill={fav ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </article>
        </div>

        {/* CARA TRASERA */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <article className="h-full flex flex-col p-8 rounded-[2.5rem] border-2 border-green-500/30 bg-zinc-950 shadow-[0_0_40px_rgba(34,197,94,0.15)] relative">
            {/* Efecto de luz interna */}
            <div className="absolute -top-24 -right-24 h-48 w-48 bg-purple-500/10 blur-[80px]" />
            <div className="absolute -bottom-24 -left-24 h-48 w-48 bg-green-500/10 blur-[80px]" />

            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-2xl font-black text-green-400 mb-6 uppercase tracking-tighter">Ficha del Espécimen</h3>
              
              <div className="space-y-5 flex-1">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Última Ubicación</p>
                  <p className="text-white font-bold text-sm truncate">{character.location.name}</p>
                </div>
                
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Origen Conocido</p>
                  <p className="text-white font-bold text-sm truncate">{character.origin.name}</p>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Género</p>
                    <p className="text-white font-bold text-sm">{character.gender}</p>
                  </div>
                  <div className="flex-1 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">ID Dimension</p>
                    <p className="text-white font-bold text-sm">#{character.id}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/characters/${character.id}`);
                }}
                className="mt-6 w-full py-4 rounded-2xl bg-green-500 text-black font-black uppercase tracking-widest hover:bg-green-400 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_10px_20px_rgba(34,197,94,0.3)]"
              >
                Ver Detalle Completo
              </button>
            </div>
          </article>
        </div>

      </div>
    </div>
  );
};