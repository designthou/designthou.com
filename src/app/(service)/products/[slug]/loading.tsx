import { LayoutContainerLoader, Skeleton } from '@/components';

export default function ProductsSlugLoading() {
	return (
		<section className="flex flex-col gap-4 max-w-300">
			<Skeleton className="w-25 h-9" />
			<Skeleton className="w-full h-95" />
			<Skeleton className="mt-8 w-30 h-9" />
			<div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-3">
				{Array.from({ length: 3 }, (_, idx) => (
					<Skeleton key={idx} className="col-span-1 h-95" />
				))}
			</div>
			<LayoutContainerLoader />;
		</section>
	);
}
