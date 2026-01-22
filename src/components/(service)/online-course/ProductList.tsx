import Link from 'next/link';
import { formatDate, getProductList } from '@/app/(service)/products/utils';
import { AspectRatio } from '@/components/ui';
import Image from 'next/image';

export default async function ProductList() {
	const allProducts = await getProductList();

	return (
		<div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-3 lg:grid-cols-4">
			{allProducts
				.sort((a, b) => {
					if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
						return -1;
					}
					return 1;
				})
				.map(post => (
					<Link key={post.slug} href={`/products/${post.slug}`} className="flex flex-col p-2 gap-2 rounded-lg post-hover">
						<AspectRatio ratio={1 / 1}>
							<Image
								src={post.metadata.image}
								alt={`${post.metadata.title} thumbnail`}
								fill
								sizes="(max-width: 360px) 300px, (max-width: 640px) 600px, (max-width: 1024px) 1000px, 2000px"
								className="w-full h-full rounded-lg object-cover"
							/>
						</AspectRatio>
						<div className="flex flex-col gap-2 p-2 rounded-lg">
							<span className="text-base text-gray-900 font-semibold tracking-tight sm:text-lg transition-all">{post.metadata.title}</span>
							<p className="text-sm text-gray-600 tabular-nums">{formatDate(post.metadata.publishedAt, false)}</p>
						</div>
					</Link>
				))}
		</div>
	);
}
