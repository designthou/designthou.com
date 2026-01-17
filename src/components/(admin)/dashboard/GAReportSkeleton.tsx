import { Skeleton } from '@/components';

export default function GAReportSkeleton() {
	return (
		<div className="flex flex-col gap-4">
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<Skeleton className="h-36 w-full" />
				<Skeleton className="h-36 w-full" />
			</div>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-start">
				<Skeleton className="flex-1 min-h-[200px] w-full lg:h-150 lg:col-span-3" />
				<Skeleton className="flex-1 min-h-[200px] w-full lg:h-100 lg:col-span-2 lg:min-h-[400px]" />
				<Skeleton className="flex-1 min-h-[200px] w-full lg:h-100 lg:col-span-1 lg:min-h-[400px]" />
			</div>
		</div>
	);
}
