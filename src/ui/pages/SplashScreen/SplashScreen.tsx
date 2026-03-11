import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 5000); 
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black flex items-center justify-center">
      
      {/* FONDO CINEMATOGRÁFICO CON GRADIENTES Y PARTÍCULAS */}
      <div className="absolute inset-0 bg-[url('/splash_bg.png')] bg-cover bg-center opacity-60 scale-105 animate-[pulse_8s_infinite]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
      
      {/* EFECTO DE LUZ RADIACTIVA DETRÁS */}
      <div className="absolute h-[600px] w-[600px] rounded-full bg-green-500/10 blur-[150px] animate-pulse" />

      {/* CONTENEDOR PRINCIPAL */}
      <div className="relative z-10 flex flex-col items-center max-w-lg px-6 text-center">
        
        {/* LOGO Animado (Rick & Morty Style) */}
        <div className="mb-12 animate-[bounce_3s_infinite]">
          <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-green-300 via-green-500 to-emerald-700 drop-shadow-[0_0_20px_rgba(34,197,94,0.6)] select-none">
            Rick <span className="text-4xl md:text-5xl align-middle mx-[-10px] text-green-400">&</span> Morty
          </h1>
          <div className="mt-[-15px] text-zinc-400 font-black tracking-[1em] text-xs md:text-sm uppercase opacity-50">
            Explorer Dimension
          </div>
        </div>

        {/* PORTAL SIMBOLIZADO */}
        <div className="relative w-48 h-48 mb-16">
          <div className="absolute inset-0 animate-slow-spin rounded-full border-t-2 border-l-2 border-green-500 opacity-50 blur-[2px]" />
          <div className="absolute inset-4 animate-reverse-spin rounded-full border-b-2 border-r-2 border-emerald-500 opacity-40 blur-[1px]" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_20px_white] animate-pulse" />
          </div>
        </div>

        {/* BARRA DE PROGRESO PREMIUM */}
        <div className="w-64 space-y-3">
          <div className="flex justify-between text-[10px] font-black uppercase text-green-400 tracking-widest opacity-80">
            <span>Sincronizando Realidad</span>
            <span className="animate-pulse">Cargando...</span>
          </div>
          <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden p-[1px] border border-zinc-800/50">
            <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full animate-[loading_5s_ease-in-out_forwards] shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          </div>
        </div>
      </div>

      {/* DETALLES TECH */}
      <div className="absolute bottom-8 left-8 flex gap-8">
         <div className="flex flex-col">
            <span className="text-zinc-700 text-[10px] font-black uppercase tracking-widest">Dimension</span>
            <span className="text-zinc-500 text-xs font-mono">C-137</span>
         </div>
         <div className="flex flex-col border-l border-zinc-800 pl-8">
            <span className="text-zinc-700 text-[10px] font-black uppercase tracking-widest">Status</span>
            <span className="text-green-500 text-xs font-mono animate-pulse">Stable</span>
         </div>
      </div>
    </div>
  );
};