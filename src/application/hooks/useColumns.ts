import { useState, useEffect } from 'react';

export const useColumns = () => {
  const getColumns = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth >= 1280) return 4; // xl
    if (window.innerWidth >= 1024) return 3; // lg
    if (window.innerWidth >= 640)  return 2; // sm
    return 1;
  };

  const [columns, setColumns] = useState(getColumns);

  useEffect(() => {
    const handler = () => setColumns(getColumns());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return columns;
};
