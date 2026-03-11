import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ... (El hook useTypewriter se queda igual) ...
const useTypewriter = (text: string, startTyping: boolean, speed: number = 30) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!startTyping) return;
    let i = 0;
    setDisplayedText(''); 
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, startTyping, speed]);

  return displayedText;
};

// Cambiamos el nombre de Home a Welcome
export const Welcome = () => {
  const [visitorName, setVisitorName] = useState('');
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);
  
  // Agregamos el hook de navegación
  const navigate = useNavigate();

  const rickFullText = `¡Burp! Oye Morty, mira la pantalla. Un tal ${visitorName.toUpperCase()} quiere acceder al multiverso de la Explorer App... ¿Lo dejamos pasar o pruebo mi nuevo desintegrador subatómico?`;
  const mortyFullText = `A-ah, no lo sé Rick, suena como mucha responsabilidad... p-pero supongo que si sabe React y TypeScript, e-está bien, ¿no? ¡Dejémoslo entrar, por favor no desintegres a nadie hoy!`;

  const rickTypedText = useTypewriter(rickFullText, isNameSubmitted, 35);
  const mortyTypedText = useTypewriter(mortyFullText, isNameSubmitted, 25);

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (visitorName.trim().length > 0) {
      setIsNameSubmitted(true);
    }
  };

  // Función para redirigir a la ruta oficial del reto
  const handleEnterMultiverse = () => {
    navigate('/characters');
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-zinc-950 p-4 text-white font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-green-500/10 blur-[120px] pointer-events-none"></div>

      {!isNameSubmitted ? (
        <div className="relative z-10 w-full max-w-md animate-fade-in rounded-2xl border border-purple-500/40 bg-zinc-900/80 p-8 shadow-[0_0_40px_rgba(168,85,247,0.2)] backdrop-blur-md">
          {/* ... (Contenido del formulario igual) ... */}
          <h1 className="mb-6 text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]">
            Control de Acceso
          </h1>
          <form onSubmit={handleAccessSubmit} className="flex flex-col gap-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-purple-300">
                Identificación de la dimensión C-137:
              </label>
              <input
                id="name"
                type="text"
                placeholder="Ingresa tu nombre..."
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                className="w-full rounded-lg border-2 border-green-500/50 bg-black/60 p-4 text-lg text-green-300 placeholder-green-700/50 outline-none transition-all focus:border-green-400 focus:shadow-[0_0_20px_rgba(74,222,128,0.5)] focus:ring-1 focus:ring-green-400"
                autoComplete="off"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-purple-600 px-4 py-4 text-lg font-bold text-white transition-all hover:bg-purple-500 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] active:scale-95"
            >
              Solicitar Permiso
            </button>
          </form>
        </div>
      ) : (
        <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-10 animate-fade-in">
          <div className="flex w-full flex-col gap-8 md:flex-row">
            {/* ... (Tarjetas de Rick y Morty iguales) ... */}
            <div className="flex-1 transform rounded-2xl border-2 border-green-500/40 bg-zinc-900/90 p-6 shadow-[0_0_35px_rgba(74,222,128,0.25)] transition-all hover:scale-[1.02]">
              <div className="flex items-center gap-5 mb-4 border-b border-green-500/20 pb-4">
                <img src="https://rickandmortyapi.com/api/character/avatar/1.jpeg" alt="Rick" className="h-24 w-24 rounded-full border-4 border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.6)]" />
                <h3 className="font-black text-2xl text-green-400 tracking-wide">Rick Sanchez</h3>
              </div>
              <p className="text-zinc-300 text-lg leading-relaxed min-h-[120px]">
                {rickTypedText}
                <span className="animate-pulse text-green-400">_</span>
              </p>
            </div>
            <div className="flex-1 transform rounded-2xl border-2 border-yellow-500/40 bg-zinc-900/90 p-6 shadow-[0_0_35px_rgba(234,179,8,0.25)] transition-all hover:scale-[1.02] md:mt-12">
              <div className="flex items-center justify-end gap-5 mb-4 border-b border-yellow-500/20 pb-4">
                <h3 className="font-black text-2xl text-yellow-400 tracking-wide">Morty Smith</h3>
                <img src="https://rickandmortyapi.com/api/character/avatar/2.jpeg" alt="Morty" className="h-24 w-24 rounded-full border-4 border-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.6)]" />
              </div>
              <p className="text-zinc-300 text-lg leading-relaxed text-right min-h-[120px]">
                {mortyTypedText}
                <span className="animate-pulse text-yellow-400">_</span>
              </p>
            </div>
          </div>
          
          {/* Cambiamos el onClick para que use la función handleEnterMultiverse */}
          <button 
            onClick={handleEnterMultiverse}
            className="group relative mt-6 overflow-hidden rounded-full border-2 border-green-400 bg-black px-12 py-5 text-xl font-extrabold text-green-400 uppercase tracking-widest transition-all hover:shadow-[0_0_50px_rgba(74,222,128,0.7)] hover:scale-105"
          >
            <span className="relative z-10">Entrar al Multiverso</span>
            <div className="absolute inset-0 h-full w-full translate-x-[-100%] bg-green-400/20 transition-transform duration-500 group-hover:translate-x-[100%]"></div>
          </button>
        </div>
      )}
    </div>
  );
};