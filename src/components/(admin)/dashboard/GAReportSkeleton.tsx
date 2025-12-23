import { Skeleton } from "@/components";

export default function GAReportSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Skeleton className="h-36 w-full" />
        <Skeleton className="h-36 w-full" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {Array.from({ length: 3 }, (_, idx) => (
          <Skeleton key={idx} className="h-60 w-full" />
        ))}
      </div>
    </div>
  );
}
