import { Skeleton } from "./Skeleton";

export function CourseCardSkeleton() {
  return (
    <div className="w-64 shrink-0 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/80">
      <Skeleton className="aspect-video w-full rounded-t-2xl" />
      <div className="space-y-1.5 p-3.5">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  );
}

