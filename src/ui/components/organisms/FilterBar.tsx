import { useNavigate } from 'react-router-dom';

interface Props {
  name: string;
  status: string;
  species: string;
  onNameChange: (val: string) => void;
  onStatusChange: (val: string) => void;
  onSpeciesChange: (val: string) => void;
}

export const FilterBar = ({ name, status, species, onNameChange, onStatusChange, onSpeciesChange }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="mb-10 flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        {/* Búsqueda por Nombre */}
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-zinc-500 group-focus-within:text-green-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 outline-none backdrop-blur-md transition-all focus:border-green-500/50 focus:ring-4 focus:ring-green-500/10"
          />
        </div>

        {/* Especie */}
        <div className="relative group lg:w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-zinc-500 group-focus-within:text-green-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Especie..."
            value={species}
            onChange={(e) => onSpeciesChange(e.target.value)}
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 outline-none backdrop-blur-md transition-all focus:border-green-500/50 focus:ring-4 focus:ring-green-500/10"
          />
        </div>

        {/* Estado (Select Mejorado) */}
        <div className="relative group lg:w-64">
           <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-zinc-500 group-focus-within:text-green-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full appearance-none rounded-2xl border border-zinc-800 bg-zinc-900/50 py-4 pl-12 pr-10 text-white outline-none backdrop-blur-md transition-all focus:border-green-500/50 focus:ring-4 focus:ring-green-500/10 cursor-pointer"
          >
            <option value="">Cualquier estado</option>
            <option value="alive">Vivo (Alive)</option>
            <option value="dead">Muerto (Dead)</option>
            <option value="unknown">Desconocido</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-zinc-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>

        {/* Botón Favoritos */}
        <button
          onClick={() => navigate('/favorites')}
          className="flex items-center justify-center gap-2 rounded-2xl bg-zinc-800/50 py-4 px-6 text-white border border-zinc-700/50 backdrop-blur-md transition-all hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 transition-transform group-hover:scale-110">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          <span className="font-bold">Favoritos</span>
        </button>
      </div>

      {/* Chips de estado actual (Quick Feedback) */}
      <div className="flex flex-wrap gap-2">
        {status && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold uppercase tracking-wider">
            {status}
            <button onClick={() => onStatusChange('')} className="hover:text-white">×</button>
          </span>
        )}
        {species && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-wider">
            {species}
            <button onClick={() => onSpeciesChange('')} className="hover:text-white">×</button>
          </span>
        )}
      </div>
    </div>
  );
};