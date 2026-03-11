import { apiClient } from '../http/apiClient';
import type { Episode } from '../../core/models/episode/model';

export const episodeRepository = {
  /**
   * Obtiene uno o varios episodios por ID(s).
   * La API soporta /episode/[1,2,3] para obtener múltiples episodios en una sola petición.
   */
  getEpisodes: async (ids: number[]): Promise<Episode[]> => {
    if (ids.length === 0) return [];
    
    // Si es un solo ID, la API devuelve un objeto, si son varios, un array.
    // Normalizamos siempre a array.
    const result = await apiClient.get<Episode | Episode[]>(`/episode/${ids.join(',')}`);
    return Array.isArray(result) ? result : [result];
  }
};
