import { LayoutContainerLoader, Skeleton } from '@/components';

export default function ProductsLoading() {
	return (
		<section className="p-4 max-w-300">
			<div className="flex flex-col justify-center gap-4 py-8 px-4 w-full text-center bg-light rounded-lg border border-muted">
				<h2 className="page-title" aria-label="Product Page Title">
					Online Classes
				</h2>
				<p className="text-center outlined-text font-bold text-lg sm:text-xl lg:text-2xl">
					Meet our selected high-quality Designthou classes
				</p>
			</div>
			<Skeleton className="mt-8 w-full h-120" />
			<LayoutContainerLoader />;
		</section>
	);
}
