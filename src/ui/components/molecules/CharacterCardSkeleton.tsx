import { Skeleton } from '../atoms/Skeleton';

export const CharacterCardSkeleton = () => (
  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 shadow-lg">
    <Skeleton className="aspect-square w-full rounded-xl" />
    <div className="mt-4 space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  </div>
);