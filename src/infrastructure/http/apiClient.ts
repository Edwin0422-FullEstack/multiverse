
// La Base URL oficial del reto
const BASE_URL = 'https://rickandmortyapi.com/api';

export const apiClient = {
  // Un método genérico GET que ya sabe cómo parsear el JSON y manejar errores
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      // Si la API devuelve un error (ej. 404 cuando no hay personajes), lanzamos la excepción
      throw new Error(`Error fetching data: ${response.status}`);
    }
    
    return response.json();
  }
};