import { LayoutContainerLoader, Skeleton } from '@/components';

export default function ProductsSlugLoading() {
	return (
		<section className="max-w-300">
			<Skeleton className="w-full h-95" />
			<LayoutContainerLoader />;
		</section>
	);
}
