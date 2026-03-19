import { Skeleton } from '@/components';

export default function OfflineClassLoading() {
	return (
		<section className="p-4">
			<h2 className="font-black font-mono text-xl" aria-label="Offline Class Students Page Title">
				Offline Class Students
			</h2>
			<Skeleton className="mt-4 w-50 h-10" />
			<div className="flex flex-col gap-2 mt-4">
				{Array.from({ length: 20 }, (_, idx) => (
					<Skeleton key={idx} className="h-10 rounded-md" />
				))}
			</div>
		</section>
	);
}
