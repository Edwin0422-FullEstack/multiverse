import { Skeleton } from '../atoms/Skeleton';

export const CharacterCardSkeleton = () => (
  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-700/30 bg-zinc-800/40 p-0 shadow-lg">
    {/* Imagen */}
    <Skeleton variant="rectangular" className="aspect-square w-full" />
    
    {/* Contenido */}
    <div className="flex flex-1 flex-col justify-between p-5 space-y-6">
      <div className="space-y-3">
        {/* Nombre */}
        <Skeleton variant="text" width="80%" height={32} className="rounded-md" />
        
        {/* Badges */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton variant="circular" width={12} height={12} />
            <Skeleton variant="text" width={60} />
          </div>
          <Skeleton variant="rounded" width={80} height={24} />
        </div>
      </div>
    </div>
  </div>
);