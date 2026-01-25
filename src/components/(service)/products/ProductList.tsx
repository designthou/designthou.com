import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';

import { AspectRatio, Badge, Button } from '@/components';
import { formatDate, getProductList } from '@/app/(service)/products/utils';
import { mapReviewCountByProductView, ReviewCountByProductViewSchema } from '@/types';
import { imageMap, BLUR_DATA_URL } from '@/constants';
import { getLocalImage } from '@/utils/plaiceholder';

export default async function ProductList({ reviewCounts }: { reviewCounts: ReviewCountByProductViewSchema[] }) {
	const productList = await getProductList();

	const asyncProductList = await Promise.all(
		productList.map(async product => ({ ...product, image: await getLocalImage(`${product.metadata.image}`) })),
	);

	const reviewCountsView = reviewCounts.map(mapReviewCountByProductView);
	const allProductsWithReviewCounts = asyncProductList.map(product => ({
		...product,
		reviewCount: reviewCountsView.find(review => review?.productId === product?.metadata?.productId)?.reviewCount ?? 4,
	}));

	return (
		<div className="grid grid-cols-1 gap-8 mt-4 sm:grid-cols-3 sm:gap-4 sm:mt-8 lg:grid-cols-4">
			{allProductsWithReviewCounts
				.sort((a, b) => {
					if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
						return -1;
					}
					return 1;
				})
				.map(post => (
					<Link
						key={post.slug}
						href={`/products/${post.slug}?reviewCount=${post?.reviewCount}`}
						className="flex flex-col gap-2 p-1 rounded-lg hover:bg-gray-50 transition-colors">
						<AspectRatio ratio={1 / 1}>
							<Image
								src={post.metadata.image}
								alt={`${post.metadata.title} thumbnail`}
								fill
								placeholder="blur"
								blurDataURL={BLUR_DATA_URL}
								sizes="(max-width: 360px) 300px, (max-width: 640px) 600px, (max-width: 1024px) 1000px, 2000px"
								className="w-full h-full rounded-lg object-cover"
							/>
						</AspectRatio>
						<div className="flex flex-col gap-2 py-1 rounded-lg">
							<span className="h-6 overflow-hidden break-keep text-base text-ellipsis font-bold tracking-tight sm:h-12">
								{post.metadata.title}
							</span>
							<p className="text-muted-foreground text-xs whitespace-nowrap text-ellipsis overflow-hidden">
								{formatDate(post.metadata.publishedAt, false)}
							</p>
							<div className="flex items-center gap-2">
								<Badge variant="secondary" className="text-muted-foreground">
									<Star className="text-yellow-400" fill="oklch(85.2% 0.199 91.936)" />
									<span className="inline-flex items-center gap-1">
										{(5.0).toFixed(1)}
										<span className="text-gray-700">({post?.reviewCount})</span>
									</span>
								</Badge>
							</div>
						</div>
					</Link>
				))}
			<div className="flex flex-col gap-2 rounded-lg">
				<AspectRatio ratio={1 / 1}>
					<Image
						src={imageMap.UNSPLASH}
						alt="Photo by Drew Beamer"
						fill
						placeholder="blur"
						blurDataURL={BLUR_DATA_URL}
						sizes="(max-width: 360px) 300px, (max-width: 640px) 600px, (max-width: 1024px) 1000px, 2000px"
						className="w-full h-full rounded-lg object-cover dark:brightness-[0.2] grayscale"
					/>
				</AspectRatio>
				<div className="flex flex-col gap-2 py-2 px-2 border border-dotted rounded-lg">
					<p className="text-muted-foreground font-semibold">새로운 강의를 기대해 주세요!</p>
					<Button type="button" variant="secondary" size="sm" disabled>
						강의 추천하기
					</Button>
				</div>
			</div>
		</div>
	);
}
