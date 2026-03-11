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

  const [searchTerm, setSearchTerm] = useState(nameQuery);
  const debouncedName = useDebounce(searchTerm, 500); // Justificación: Optimiza peticiones a la API 

  const { data, isLoading, isError, error, refetch } = useCharacters(page, debouncedName, statusQuery);

  // Actualizar URL cuando cambian filtros
  useEffect(() => {
    setSearchParams({ name: debouncedName, status: statusQuery, page: '1' });
  }, [debouncedName, statusQuery, setSearchParams]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ name: debouncedName, status: statusQuery, page: String(newPage) });
  };

  if (isError) return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white">
      <p className="text-red-500 font-bold text-xl">Error: {(error as Error).message}</p>
      <button onClick={() => refetch()} className="mt-4 bg-green-600 px-6 py-2 rounded-lg">Reintentar</button>
    </div>
  );

  return (
    <main className="min-h-screen bg-zinc-950 p-6 md:p-12">
      <h1 className="text-4xl font-black text-green-400 mb-8">EXPLORADOR</h1>
      
      <FilterBar 
        name={searchTerm} 
        status={statusQuery} 
        onNameChange={setSearchTerm} 
        onStatusChange={(val) => setSearchParams({ name: debouncedName, status: val, page: '1' })} 
      />

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => <CharacterCardSkeleton key={i} />)}
        </div>
      ) : data?.results.length === 0 ? (
        <div className="text-center py-20 text-zinc-500">No se encontraron especímenes en esta dimensión.</div>
      ) : (
        <>
          <CharacterGrid characters={data?.results || []} />
          
          <div className="mt-12 flex justify-center items-center gap-6">
            <button 
              disabled={!data?.info.prev} 
              onClick={() => handlePageChange(page - 1)}
              className="bg-zinc-800 px-6 py-2 rounded-lg text-white disabled:opacity-20"
            >
              Anterior
            </button>
            <span className="text-green-400">Página {page} de {data?.info.pages}</span>
            <button 
              disabled={!data?.info.next} 
              onClick={() => handlePageChange(page + 1)}
              className="bg-zinc-800 px-6 py-2 rounded-lg text-white disabled:opacity-20"
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </main>
  );
};