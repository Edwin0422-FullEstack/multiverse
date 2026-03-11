import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCharacters } from '../../../application/hooks/useCharacters';
import { useDebounce } from '../../../application/hooks/useDebounce';
import { CharacterGrid } from '../../components/organisms/CharacterGrid';
import { CharacterCardSkeleton } from '../../components/molecules/CharacterCardSkeleton';
import { FilterBar } from '../../components/organisms/FilterBar';

export const CharacterList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Extraemos del router los filtros (Si volvimos atrás, persisten los query params)
  const nameQuery = searchParams.get('name') || '';
  const statusQuery = searchParams.get('status') || '';
  const speciesQuery = searchParams.get('species') || '';

  const [searchTerm, setSearchTerm] = useState(nameQuery);
  const [speciesTerm, setSpeciesTerm] = useState(speciesQuery);
  
  const debouncedName = useDebounce(searchTerm, 500); 
  const debouncedSpecies = useDebounce(speciesTerm, 500);

  // Hook Infinito que ahora trae React Query (con su propia Cache)
  const { 
    data, 
    isLoading, 
    isError, 
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useCharacters(debouncedName, statusQuery, debouncedSpecies);

  // Implementación Robusta de Infinite Scroll (Callback Ref)
  const observer = useRef<IntersectionObserver | null>(null);
  const bottomBoundaryRef = useCallback((node: HTMLDivElement | null) => {
    if (isFetchingNextPage || isLoading) return; // Pausamos el observer si ya está cargando
    if (observer.current) observer.current.disconnect(); // Limpiamos el anterior

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    }, { threshold: 0.5 }); // Margen para que detecte un poco antes

    if (node) observer.current.observe(node);
  }, [isFetchingNextPage, isLoading, hasNextPage, fetchNextPage]);

  // Sincronizar URL para evitar recargas perdidas
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedName) params.set('name', debouncedName);
    if (statusQuery) params.set('status', statusQuery);
    if (debouncedSpecies) params.set('species', debouncedSpecies);
    
    // IMPORTANTE: preventScrollReset evita que el scroll salte al inicio al actualizar la URL mientras scrolleas
    setSearchParams(params, { replace: true, preventScrollReset: true });
  }, [debouncedName, statusQuery, debouncedSpecies, setSearchParams]);

  // Pre-calculamos los personajes para usarlos en las validaciones de error
  const allCharacters = data?.pages.flatMap(page => page.results) || [];

  if (isError && allCharacters.length === 0) return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white text-center px-6">
      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 text-red-500 animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      </div>
      <p className="text-2xl font-black text-white">INTERRUPCIÓN DIMENSIONAL</p>
      <p className="text-zinc-500 mt-2 max-w-sm">La señal se ha perdido al intentar sincronizar con esta zona del multiverso.</p>
      <button onClick={() => refetch()} className="mt-8 group flex items-center gap-2 bg-green-600 border border-green-500 px-8 py-4 rounded-2xl text-white font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]">
        REINTENTAR CONEXIÓN
      </button>
    </div>
  );

  return (
    <main className="relative min-h-screen bg-black galaxy-bg px-6 py-12 md:px-12">
      
      {/* CAPA DE NEBULOSAS DE FONDO */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] animate-[glow-pulse_15s_infinite] rounded-full bg-green-500/5 blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] h-[50%] w-[30%] animate-[glow-pulse_20s_infinite_reverse] rounded-full bg-emerald-500/5 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[20%] h-[30%] w-[50%] animate-[glow-pulse_12s_infinite] rounded-full bg-green-400/5 blur-[100px]" />
      </div>

      <header className="relative z-10 mb-12">
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
          EXPLORA EL <span className="text-green-400">MULTIVERSO</span>
        </h1>
        <p className="text-zinc-500 text-lg max-w-2xl">
          Analiza y clasifica a todos los especímenes encontrados a través de las infinitas dimensiones.
        </p>
      </header>
      
      <div className="relative z-10">
        <FilterBar 
          name={searchTerm} 
          status={statusQuery} 
          species={speciesTerm}
          onNameChange={setSearchTerm} 
          onSpeciesChange={setSpeciesTerm}
          onStatusChange={(val) => {
            setSearchParams(params => {
              if (val) params.set('status', val);
              else params.delete('status');
              return params;
            }, { replace: true, preventScrollReset: true });
          }} 
        />
      </div>

      <section className="relative z-10">
        {/* Cargando por primera vez */}
        {isLoading && allCharacters.length === 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => <CharacterCardSkeleton key={`skeleton-initial-${i}`} />)}
          </div>
        ) : allCharacters.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6 text-zinc-700">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-zinc-400">Dimensión vacía</p>
            <p className="text-zinc-600 mt-2">No se encontraron especímenes con estos criterios.</p>
          </div>
        ) : (
          <>
            <CharacterGrid characters={allCharacters} />
            
            {/* Skeletons para Infinite Scroll Loading */}
            {isFetchingNextPage && (
              <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => <CharacterCardSkeleton key={`skeleton-next-${i}`} />)}
              </div>
            )}

            {/* Manejo de Error al scrollear */}
            {isError && allCharacters.length > 0 && (
              <div className="mt-12 flex flex-col items-center p-8 bg-red-500/5 rounded-3xl border border-red-500/20">
                 <p className="text-red-400 font-bold">⚠️ Error de conexión al cargar más personajes</p>
                 <button 
                  onClick={() => fetchNextPage()}
                  className="mt-4 text-xs font-black uppercase tracking-widest text-white bg-zinc-800 px-6 py-3 rounded-full hover:bg-zinc-700 transition-colors"
                 >
                   Reintentar Carga
                 </button>
              </div>
            )}

            {/* Observer Target */}
            <div ref={bottomBoundaryRef} className="h-10 w-full mt-4" />
            
            {!hasNextPage && allCharacters.length > 0 && !isError && (
              <div className="mt-16 text-center text-zinc-600 font-bold tracking-widest uppercase">
                Fin de la dimensión. No hay más especímenes.
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};