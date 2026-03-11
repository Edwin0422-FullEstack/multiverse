import { createBrowserRouter, Navigate } from 'react-router-dom';
import { SplashScreen } from '../ui/pages/SplashScreen/SplashScreen';
import { Welcome } from '../ui/pages/Welcome/Welcome';
import { CharacterList } from '../ui/pages/CharacterList/CharacterList';
import { CharacterDetail } from '../ui/pages/CharacterDetail/CharacterDetail';
import { Favorites } from '../ui/pages/Favorites/Favorites';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SplashScreen />,
  },
  {
    path: '/welcome',
    element: <Welcome />,
  },
  {
    path: '/characters',
    element: <CharacterList />,
  },
  {
    path: '/characters/:id',
    element: <CharacterDetail />,
  },
  {
    path: '/favorites',
    element: <Favorites />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />, 
  }
]);