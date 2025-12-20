import { Skeleton } from "@/components";

export default function NewsPageLoading() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <Skeleton className="h-8 w-[120px]" />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {Array.from({ length: 8 }, (_, idx) => (
          <Skeleton key={idx} className="h-20 w-full" />
        ))}
      </div>
    </div>
  );
}
