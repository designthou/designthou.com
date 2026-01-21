import Link from 'next/link';
import { formatDate, getProductList } from '@/app/(service)/products/utils';

export default async function ProductList() {
	const allProducts = await getProductList();

	return (
		<div className="flex flex-col gap-4 py-16">
			{allProducts
				.sort((a, b) => {
					if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
						return -1;
					}
					return 1;
				})
				.map(post => (
					<Link key={post.slug} href={`/products/${post.slug}`} className="flex flex-col justify-center p-2 min-h-24 rounded-lg post-hover">
						<p className="text-lg text-gray-900 font-semibold tracking-tight sm:text-xl transition-all">{post.metadata.title}</p>
						<p className="text-sm text-gray-600 tabular-nums">{formatDate(post.metadata.publishedAt, false)}</p>
					</Link>
				))}
		</div>
	);
}
