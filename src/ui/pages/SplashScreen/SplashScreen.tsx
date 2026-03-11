// src/ui/pages/SplashScreen/SplashScreen.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 4000); // 4 segundos para disfrutar el efecto
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-zinc-950">
      
      {/* CAPA 1: Brillo de fondo estático */}
      <div className="absolute h-[500px] w-[500px] rounded-full bg-green-500/10 blur-[120px]" />

      {/* CAPA 2: Portal Externo (Giro lento) */}
      <div className="absolute h-[400px] w-[400px] animate-slow-spin rounded-full border-t-4 border-l-4 border-green-400 opacity-40 blur-sm" />

      {/* CAPA 3: Núcleo del Portal (Efecto radiactivo) */}
      <div className="relative flex items-center justify-center">
        {/* Anillo de energía principal */}
        <div className="h-64 w-64 animate-reverse-spin rounded-full bg-gradient-to-tr from-green-400 via-emerald-500 to-cyan-400 p-1 shadow-[0_0_50px_rgba(74,222,128,0.6)]">
          <div className="h-full w-full rounded-full bg-zinc-950" />
        </div>
        
        {/* Destello central */}
        <div className="absolute h-10 w-10 animate-pulse rounded-full bg-white blur-md" />
      </div>

      {/* TEXTO INFORMATIVO */}
      <div className="absolute bottom-16 flex flex-col items-center z-10">
        <h1 className="text-4xl font-black tracking-[0.2em] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] uppercase">
          Multiverso <span className="text-green-400">Explorer</span>
        </h1>
        
        <div className="mt-6 flex items-center gap-3">
          <div className="h-1 w-12 rounded-full bg-gradient-to-r from-transparent to-green-400" />
          <p className="text-sm font-bold uppercase tracking-widest text-green-400 animate-pulse">
            Sincronizando realidad...
          </p>
          <div className="h-1 w-12 rounded-full bg-gradient-to-l from-transparent to-green-400" />
        </div>
      </div>

      {/* Toque de estilo PinkTech [cite: 1] */}
      <div className="absolute top-8 right-8 text-[10px] font-mono text-zinc-700 uppercase tracking-[0.5em]">
        System Status: Stable
      </div>
    </div>
  );
};