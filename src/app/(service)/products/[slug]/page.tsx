import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { formatDate, getProductList } from '@/app//(service)/products/utils';
import { SiteConfig } from '@/app/config';
import { Badge, CustomMDX } from '@/components/';
import { BLUR_DATA_URL } from '@/constants';
import { createClient } from '@/lib/supabase/server';

type PageProps = {
	params: Promise<{
		slug: string;
	}>;
};

export async function generateStaticParams() {
	const products = await getProductList();

	return products.map(({ slug }) => ({
		slug,
	}));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const productList = await getProductList();
	const product = productList.find(post => post.slug === decodeURIComponent(slug));

	if (!product) {
		return {};
	}

	const { title, summary: description, image } = product.metadata;

	const ogImage = image ? image : `${SiteConfig.url}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `${SiteConfig.url}/products/${product.slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	};
}

export default async function ProductPage({ params }: PageProps) {
	const { slug } = await params;
	const productList = await getProductList();
	const supabase = await createClient();

	const product = productList?.find(product => product.slug === decodeURIComponent(slug));

	const { data: reviewCountByProduct } = await supabase
		.from('review_count_by_product')
		.select('review_count')
		.eq('product_id', product?.metadata.productId)
		.single();

	if (!product) {
		notFound();
	}

	return (
		<section className="flex flex-col gap-4">
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'ProductPosting',
						headline: product.metadata.title,
						datePublished: product.metadata.publishedAt,
						dateModified: product.metadata.publishedAt,
						description: product.metadata.summary,
						image: product.metadata.image
							? `${SiteConfig.url}${product.metadata.image}`
							: `/og?title=${encodeURIComponent(product.metadata.title)}`,
						url: `${SiteConfig.url}/products/${product.slug}`,
						author: {
							'@type': 'Person',
							name: SiteConfig.author.name,
						},
					}),
				}}
			/>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:max-h-[400px]">
				<div className="ui-flex-center row-span-1 sm:col-span-1">
					<Image
						src={product.metadata.image}
						alt={product.metadata.title}
						className="w-full h-full object-cover rounded-xl"
						width={360}
						height={360}
						placeholder="blur"
						blurDataURL={BLUR_DATA_URL}
					/>
				</div>

				<div className="row-span-1 sm:col-span-2 flex flex-col gap-4 py-8 px-8 w-full bg-light border border-muted rounded-xl">
					<h2 className="title font-bold text-3xl tracking-tighter">{product.metadata.title}</h2>
					<span className="px-3 py-1 w-fit bg-gradient-orange-100 text-sm font-bold text-white rounded-full">{SiteConfig.author.name}</span>
					<div className="flex items-center gap-4 text-sm">
						<span>등록일</span>
						<p className="text-sm text-neutral-600 dark:text-neutral-400">{formatDate(product.metadata.publishedAt)}</p>
					</div>
					<div className="flex items-center gap-2">
						<Badge variant="secondary" className="text-muted-foreground">
							<Star className="text-yellow-400" fill="oklch(85.2% 0.199 91.936)" />
							<span className="inline-flex items-center gap-1">
								{(5.0).toFixed(1)}
								<span className="text-gray-700">({reviewCountByProduct?.review_count ?? 4})</span>
							</span>
						</Badge>
					</div>
				</div>
			</div>

			<article className="prose mb-16">
				<CustomMDX source={product.content} />
			</article>
		</section>
	);
}
