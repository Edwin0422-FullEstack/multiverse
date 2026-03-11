import { apiClient } from '../http/apiClient';
import type { CharacterResponse } from '../../core/models/character/model';

export const characterRepository = {
  /**
   * Obtiene la lista de personajes con soporte para paginación y filtros.
   */
  getCharacters: async (
    page: number = 1, 
    name: string = '', 
    status: string = ''
  ): Promise<CharacterResponse> => {
    
    // Construimos los parámetros de la URL de forma inteligente
    // URLSearchParams limpia automáticamente los parámetros vacíos si no los enviamos
    const params = new URLSearchParams({
      page: page.toString(),
    });

    if (name) params.append('name', name);
    if (status) params.append('status', status);

    // Hacemos la petición usando nuestro cliente y le decimos que la respuesta 
    // debe respetar la Interfaz CharacterResponse que creamos antes
    return apiClient.get<CharacterResponse>(`/character/?${params.toString()}`);
  }
};