import type { Character } from '../../../core/models/character/model';

interface Props {
  status: Character['status'];
}

export const StatusBadge = ({ status }: Props) => {
  // Diccionario de colores dependiendo del estado
  const statusColors = {
    Alive: 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]',
    Dead: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]',
    unknown: 'bg-zinc-500 shadow-[0_0_8px_rgba(113,113,122,0.6)]',
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded-full ${statusColors[status]}`} />
      <span className="text-sm font-medium text-zinc-300 capitalize">{status}</span>
    </div>
  );
};