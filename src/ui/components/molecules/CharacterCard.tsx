import type { Character } from '../../../core/models/character/model';
import { StatusBadge } from '../atoms/StatusBadge';

interface Props {
  character: Character;
}

export const CharacterCard = ({ character }: Props) => {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-800/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-500/50 hover:shadow-[0_8px_30px_rgba(74,222,128,0.15)]">
      
      {/* Contenedor de la Imagen */}
      <div className="relative aspect-square w-full overflow-hidden">
        <img
          src={character.image}
          alt={`Imagen de ${character.name}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Sombra interna para difuminar el borde inferior de la imagen */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-800/90 via-transparent to-transparent" />
      </div>

      {/* Información del personaje */}
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
      
    </article>
  );
};