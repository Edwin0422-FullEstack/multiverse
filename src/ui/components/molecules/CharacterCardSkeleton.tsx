import { Skeleton } from '../atoms/Skeleton';

export const CharacterCardSkeleton = () => (
  <div className="animate-pulse-green flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/5 bg-zinc-900/50 backdrop-blur-md p-4">
    {/* Contenedor Imagen */}
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] bg-zinc-800/20">
      <Skeleton variant="rectangular" className="h-full w-full opacity-20" />
      {/* Máscara de borde igual a la card real */}
      <div className="absolute inset-0 border-[8px] border-zinc-900/50 rounded-[1.5rem] pointer-events-none" />
    </div>
    
    {/* Contenido */}
    <div className="flex flex-1 flex-col p-4 space-y-6">
      <div className="space-y-4">
        {/* Nombre */}
        <Skeleton variant="text" width="90%" height={32} className="rounded-md bg-white/5" />
        
        {/* Badges/Info */}
        <div className="flex items-center justify-between">
          <Skeleton variant="rounded" width={80} height={24} className="bg-white/5" />
          <div className="flex flex-col items-end gap-1">
            <Skeleton variant="text" width={40} height={10} className="bg-white/5" />
            <Skeleton variant="text" width={60} height={14} className="bg-white/5" />
          </div>
        </div>
      </div>

      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="flex items-center justify-between">
         <Skeleton variant="text" width={50} height={12} className="bg-white/5" />
         <Skeleton variant="text" width={70} height={12} className="bg-white/5" />
      </div>
    </div>
  </div>
);