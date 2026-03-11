import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useFavorites } from './useFavorites';

describe('useFavorites Hook', () => {
  beforeEach(() => {
    // Limpiamos el localStorage antes de cada test para evitar contaminación
    localStorage.clear();
  });

  it('adds, removes and persists favorites in localStorage', () => {
    const { result } = renderHook(() => useFavorites());

    // 1. Estado inicial vacío
    expect(result.current.favorites).toEqual([]);

    // 2. Agregamos favorito (ID 1)
    act(() => {
      result.current.toggleFavorite(1);
    });

    expect(result.current.favorites).toContain(1);
    expect(result.current.isFavorite(1)).toBe(true);
    // Verificamos persistencia
    expect(localStorage.getItem('multiverse_favorites')).toEqual('[1]');

    // 3. Lo volvemos a quitar ("toggle")
    act(() => {
      result.current.toggleFavorite(1);
    });

    expect(result.current.favorites).not.toContain(1);
    expect(result.current.isFavorite(1)).toBe(false);
    expect(localStorage.getItem('multiverse_favorites')).toEqual('[]');
  });
});
