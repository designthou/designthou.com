import { Skeleton } from "@/components";

export default function NewsPageLoading() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <Skeleton className="h-8 w-[120px]" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}
