import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulamos un tiempo de carga y luego redirigimos al Home
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 3000); // 3 segundos

    // Limpiamos el timer si el componente se desmonta antes
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-black">
      {/* GIF de fondo a pantalla completa */}
      <img 
        src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGN4ejZlcWdhZmR4Z3dhcm9senk0Nm9lOGlqNGQ4cm4xYXlzemlhcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WDZBrmwNjm5g8qsl1F/giphy.gif" 
        alt="Rick and Morty Splash" 
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      
      {/* Overlay con texto centrado abajo */}
      <div className="absolute bottom-16 flex flex-col items-center z-10">
        <h1 className="text-5xl font-extrabold text-white tracking-widest drop-shadow-lg">
          Escapando de Gargantua 
        </h1>
        {/* Un toque de color pink en honor a PinkTech */}
        <p className="mt-3 text-lg font-medium text-pink-400 animate-pulse drop-shadow-md">
          Abriendo portal...
        </p>
      </div>
    </div>
  );
};