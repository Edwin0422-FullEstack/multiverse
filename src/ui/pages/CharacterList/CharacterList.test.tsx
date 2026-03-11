import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CharacterList } from './CharacterList';
import { useCharacters } from '../../../application/hooks/useCharacters';

// Mockeamos el hook que se comunica con la API
vi.mock('../../../application/hooks/useCharacters', () => ({
  useCharacters: vi.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

describe('CharacterList Component', () => {
  it('renders a list of characters successfully', () => {
    // Definimos el estado simulado (Mock Data) que devolvería React Query
    const mockData = {
      pages: [
        {
          info: { count: 2, pages: 1, next: null, prev: null },
          results: [
            { id: 1, name: 'Rick Sanchez', species: 'Human', status: 'Alive', image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' },
            { id: 2, name: 'Morty Smith', species: 'Human', status: 'Alive', image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg' },
          ]
        }
      ]
    };

    // Aplicamos el mock
    (useCharacters as any).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CharacterList />
        </BrowserRouter>
      </QueryClientProvider>
    );

    // Assertions: Verificamos que los personajes están en el DOM
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });
});
