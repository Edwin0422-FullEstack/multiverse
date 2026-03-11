import { useState, useEffect, useRef } from 'react';
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
    error, 
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useCharacters(debouncedName, statusQuery, debouncedSpecies);

  // Intersection Observer para disparar Infinite Scroll
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Cuando tocamos el final, pedimos más a React Query
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(target);
    return () => observer.unobserve(target);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Sincronizar URL para evitar recargas perdidas
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedName) params.set('name', debouncedName);
    if (statusQuery) params.set('status', statusQuery);
    if (debouncedSpecies) params.set('species', debouncedSpecies);
    
    setSearchParams(params, { replace: true });
  }, [debouncedName, statusQuery, debouncedSpecies, setSearchParams]);

  if (isError) return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white">
      <p className="text-red-500 font-bold text-xl">Error: {(error as Error).message}</p>
      <button onClick={() => refetch()} className="mt-4 bg-green-600 px-6 py-2 rounded-lg">Reintentar</button>
    </div>
  );

  // data.pages es un array con todas las páginas cargadas. Lo aplanamos.
  const allCharacters = data?.pages.flatMap(page => page.results) || [];

  return (
    <main className="min-h-screen bg-zinc-950 p-6 md:p-12">
      <header className="mb-12">
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
          EXPLORA EL <span className="text-green-400">MULTIVERSO</span>
        </h1>
        <p className="text-zinc-500 text-lg max-w-2xl">
          Analiza y clasifica a todos los especímenes encontrados a través de las infinitas dimensiones.
        </p>
      </header>
      
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
          }, { replace: true });
        }} 
      />

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

          {/* Observer Target (Invisible). Aquí es donde detecta si llegamos al final */}
          <div ref={observerTarget} className="h-10 w-full mt-4" />
          
          {!hasNextPage && allCharacters.length > 0 && (
            <div className="mt-16 text-center text-zinc-600 font-bold tracking-widest uppercase">
              Fin de la dimensión. No hay más especímenes.
            </div>
          )}
        </>
      )}
    </main>
  );
};