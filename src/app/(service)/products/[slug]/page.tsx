import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CustomMDX } from '@/components/common/';
import { formatDate, getProductList } from '@/app//(service)/products/utils';
import { SiteConfig } from '@/app/config';

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

	const product = productList?.find(product => product.slug === decodeURIComponent(slug));

	if (!product) {
		notFound();
	}

	return (
		<section>
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
			<h1 className="title font-bold text-3xl tracking-tighter">{product.metadata.title}</h1>
			<div className="flex justify-between items-center mt-2 mb-8 text-sm">
				<p className="text-sm text-neutral-600 dark:text-neutral-400">{formatDate(product.metadata.publishedAt)}</p>
			</div>
			<article className="prose mb-16">
				<CustomMDX source={product.content} />
			</article>
		</section>
	);
}
