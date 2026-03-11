import { apiClient } from '../http/apiClient';
import type { Character, CharacterResponse } from '../../core/models/character/model';

export const characterRepository = {
  /**
   * Obtiene la lista de personajes con soporte para paginación y filtros.
   */
  getCharacters: async (
    page: number = 1, 
    name: string = '', 
    status: string = '',
    species: string = ''
  ): Promise<CharacterResponse> => {
    
    const params = new URLSearchParams({
      page: page.toString(),
    });

    if (name) params.append('name', name);
    if (status) params.append('status', status);
    if (species) params.append('species', species);

    try {
      return await apiClient.get<CharacterResponse>(`/character/?${params.toString()}`);
    } catch (error) {
      // La API de Rick and Morty devuelve 404 cuando no hay resultados para un filtro.
      // Manejamos esto devolviendo una estructura vacía en lugar de un error.
      if (error instanceof Error && error.message.includes('404')) {
        return {
          info: { count: 0, pages: 0, next: null, prev: null },
          results: []
        };
      }
      throw error;
    }
  },

  getCharacterById: async (id: number): Promise<Character> => {
    return apiClient.get<Character>(`/character/${id}`);
  },

  getCharactersByIds: async (ids: number[]): Promise<Character[]> => {
    if (ids.length === 0) return [];
    const result = await apiClient.get<Character | Character[]>(`/character/${ids.join(',')}`);
    return Array.isArray(result) ? result : [result];
  }
};