import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCharacters } from '../../../application/hooks/useCharacters';
import { useDebounce } from '../../../application/hooks/useDebounce';
import { CharacterGrid } from '../../components/organisms/CharacterGrid';
import { CharacterCardSkeleton } from '../../components/molecules/CharacterCardSkeleton';
import { FilterBar } from '../../components/organisms/FilterBar';

export const CharacterList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Sincronización con URL 
  const page = Number(searchParams.get('page')) || 1;
  const nameQuery = searchParams.get('name') || '';
  const statusQuery = searchParams.get('status') || '';
  const speciesQuery = searchParams.get('species') || '';

  const [searchTerm, setSearchTerm] = useState(nameQuery);
  const [speciesTerm, setSpeciesTerm] = useState(speciesQuery);
  
  const debouncedName = useDebounce(searchTerm, 500); 
  const debouncedSpecies = useDebounce(speciesTerm, 500);

  const { data, isLoading, isError, error, refetch } = useCharacters(page, debouncedName, statusQuery, debouncedSpecies);

  // Actualizar URL cuando cambian filtros
  useEffect(() => {
    setSearchParams({ 
      name: debouncedName, 
      status: statusQuery, 
      species: debouncedSpecies,
      page: '1' 
    });
  }, [debouncedName, statusQuery, debouncedSpecies, setSearchParams]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ 
      name: debouncedName, 
      status: statusQuery, 
      species: debouncedSpecies,
      page: String(newPage) 
    });
  };

  if (isError) return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white">
      <p className="text-red-500 font-bold text-xl">Error: {(error as Error).message}</p>
      <button onClick={() => refetch()} className="mt-4 bg-green-600 px-6 py-2 rounded-lg">Reintentar</button>
    </div>
  );

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
        onStatusChange={(val) => setSearchParams({ name: debouncedName, status: val, species: debouncedSpecies, page: '1' })} 
      />

      {isLoading ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => <CharacterCardSkeleton key={i} />)}
        </div>
      ) : data?.results.length === 0 ? (
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
          <CharacterGrid characters={data?.results || []} />
          
          <div className="mt-20 flex justify-center items-center gap-8">
            <button 
              disabled={!data?.info.prev} 
              onClick={() => handlePageChange(page - 1)}
              className="group flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-8 py-4 rounded-2xl text-white font-bold transition-all hover:border-green-500/50 hover:bg-green-500/5 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 transition-transform group-hover:-translate-x-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Anterior
            </button>

            <div className="flex flex-col items-center">
              <span className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-1">Dimensión</span>
              <span className="text-2xl font-black text-green-400 leading-none">{page} / {data?.info.pages}</span>
            </div>

            <button 
              disabled={!data?.info.next} 
              onClick={() => handlePageChange(page + 1)}
              className="group flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-8 py-4 rounded-2xl text-white font-bold transition-all hover:border-green-500/50 hover:bg-green-500/5 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              Siguiente
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 transition-transform group-hover:translate-x-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </>
      )}
    </main>
  );
};