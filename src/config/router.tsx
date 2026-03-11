import { createBrowserRouter, Navigate } from 'react-router-dom';
import { SplashScreen } from '../ui/pages/SplashScreen/SplashScreen';
import { Welcome } from '../ui/pages/Welcome/Welcome';
import { CharacterList } from '../ui/pages/CharacterList/CharacterList'; // Importamos el nuevo componente

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SplashScreen />,
  },
  {
    path: '/welcome',
    element: <Welcome />, // Aquí asignamos la pantalla de diálogo interactivo
  },
  {
    path: '/characters', // La ruta obligatoria del reto [cite: 263, 285]
    element: <CharacterList />, // El listado real
  },
  {
    path: '*',
    element: <Navigate to="/" replace />, 
  }
]);