interface Props {
  name: string;
  status: string;
  onNameChange: (val: string) => void;
  onStatusChange: (val: string) => void;
}

export const FilterBar = ({ name, status, onNameChange, onStatusChange }: Props) => (
  <div className="mb-8 flex flex-col gap-4 md:flex-row">
    <input
      type="text"
      placeholder="Buscar por nombre..."
      value={name}
      onChange={(e) => onNameChange(e.target.value)}
      className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white outline-none focus:border-green-500"
    />
    <select
      value={status}
      onChange={(e) => onStatusChange(e.target.value)}
      className="rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white outline-none focus:border-green-500"
    >
      <option value="">Todos los estados</option>
      <option value="alive">Vivo</option>
      <option value="dead">Muerto</option>
      <option value="unknown">Desconocido</option>
    </select>
  </div>
);