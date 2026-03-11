import { useState, useRef, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useCharacters } from '../../../application/hooks/useCharacters';
import { useDebounce } from '../../../application/hooks/useDebounce';
import { useColumns } from '../../../application/hooks/useColumns';
import { CharacterCard } from '../../components/molecules/CharacterCard';
import { CharacterCardSkeleton } from '../../components/molecules/CharacterCardSkeleton';
import { FilterBar } from '../../components/organisms/FilterBar';

const ROW_HEIGHT = 480; // Estimación más cercana al tamaño real
const GAP = 32;         // gap-8 = 2rem = 32px

export const CharacterList = () => {
  const [searchParams] = useSearchParams();

  const nameQuery    = searchParams.get('name')    || '';
  const statusQuery  = searchParams.get('status')  || '';
  const speciesQuery = searchParams.get('species') || '';

  const [searchTerm,  setSearchTerm]  = useState(nameQuery);
  const [speciesTerm, setSpeciesTerm] = useState(speciesQuery);

  const debouncedName    = useDebounce(searchTerm,  500);
  const debouncedSpecies = useDebounce(speciesTerm, 500);

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCharacters(debouncedName, statusQuery, debouncedSpecies);

  const columns = useColumns();

  // El contenedor de scroll debe ser el elemento con overflow
  const scrollRef = useRef<HTMLDivElement>(null);

  const allCharacters = useMemo(
    () => data?.pages.flatMap(p => p.results) ?? [],
    [data]
  );

  // Agrupa los personajes en filas según columnas
  const rows = useMemo(() => {
    const result: (typeof allCharacters[number] | 'skeleton')[][] = [];
    for (let i = 0; i < allCharacters.length; i += columns) {
      result.push(allCharacters.slice(i, i + columns));
    }
    // Fila de skeletons al final si está cargando más
    if (isFetchingNextPage) {
      result.push(Array(columns).fill('skeleton'));
    }
    return result;
  }, [allCharacters, columns, isFetchingNextPage]);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT + GAP,
    overscan: 3, // Renderiza 3 filas extra arriba/abajo para fluidez
  });

  // Detectar cuándo estamos cerca del final para cargar más
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !hasNextPage || isFetchingNextPage) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    // Gatillo más holgado, digamos 1000px
    if (scrollHeight - scrollTop - clientHeight < 1000) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Actualizar URL de forma silenciosa e imperativa
  const updateURL = useCallback((name: string, status: string, species: string) => {
    const params = new URLSearchParams();
    if (name)    params.set('name',    name);
    if (status)  params.set('status',  status);
    if (species) params.set('species', species);
    // Cambiamos replaceState nativo para no trigger router resets de scroll (v7)
    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }, []);

  const handleNameChange    = (val: string) => { setSearchTerm(val);  updateURL(val, statusQuery, speciesTerm); };
  const handleSpeciesChange = (val: string) => { setSpeciesTerm(val); updateURL(debouncedName, statusQuery, val); };
  const handleStatusChange  = (val: string) => { updateURL(debouncedName, val, speciesTerm); };

  if (isError && allCharacters.length === 0) return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white text-center">
      <p className="text-2xl font-black mb-4">CONEXIÓN PERDIDA EN EL MULTIVERSO</p>
      <button onClick={() => refetch()} className="bg-green-600 px-8 py-4 rounded-xl font-bold">
        REINTENTAR
      </button>
    </div>
  );

  return (
    // CONTENEDOR RAIZ: Pantalla completa, sin scroll nativo (flex layout)
    <div className="h-[100dvh] w-full flex flex-col bg-black galaxy-bg overflow-hidden relative">
      
      {/* Nebulosa decorativa (fija al fondo) */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-green-500/10 to-transparent" />
      </div>

      {/* HEADER FIJO: Mejora masivamente el UX en scroll infinitos y arregla el offset del virtualizer */}
      <header className="relative z-20 shrink-0 px-6 pt-10 md:px-12 md:pt-12 pb-[1px] border-b border-green-500/10 bg-black/40 backdrop-blur-md">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
          EXPLORA EL <span className="text-green-400">MULTIVERSO</span>
        </h1>
        
        <FilterBar
          name={searchTerm}
          status={statusQuery}
          species={speciesTerm}
          onNameChange={handleNameChange}
          onSpeciesChange={handleSpeciesChange}
          onStatusChange={handleStatusChange}
        />
      </header>

      {/* CONTENEDOR DE SCROLL: Solo la lista está acá, así el virtualizador funciona perfectamente desde el top 0 */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 w-full overflow-y-auto overflow-x-hidden custom-scrollbar relative z-10 px-6 md:px-12 pt-[1px]"
      >
        <main className="min-h-full pb-24">

          {/* ESTADO: Carga inicial */}
          {isLoading && allCharacters.length === 0 && (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <CharacterCardSkeleton key={`init-sk-${i}`} />
              ))}
            </div>
          )}

          {/* ESTADO: Sin resultados */}
          {!isLoading && allCharacters.length === 0 && (
            <div className="py-32 text-center text-zinc-500 font-bold">
              Sin rastros de vida en esta dimensión.
            </div>
          )}

          {/* LISTA VIRTUALIZADA */}
          {allCharacters.length > 0 && (
            <div
              // Capa virtual: Simula la altura total para activar el scroll nativo
              style={{ height: `${virtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}
            >
              {virtualizer.getVirtualItems().map((virtualRow) => {
                const rowItems = rows[virtualRow.index];
                return (
                  <div
                    key={virtualRow.key}
                    data-index={virtualRow.index}
                    ref={virtualizer.measureElement}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                    className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-8"
                  >
                    {rowItems.map((item, colIdx) =>
                      item === 'skeleton'
                        ? <div key={`sk-${virtualRow.index}-${colIdx}`}><CharacterCardSkeleton /></div>
                        : <div key={item.id} className="h-full"><CharacterCard character={item} /></div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

        </main>
      </div>
    </div>
  );
};