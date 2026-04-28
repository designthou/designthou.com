import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Star } from 'lucide-react';
import { formatDate, getProductList } from '@/app/(service)/products/utils';
import { SiteConfig } from '@/app/config';
import {
	Badge,
	Button,
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	CustomMDX,
	NavigationList,
	ApplyCourseContext,
} from '@/components/';
import { BLUR_DATA_URL, route } from '@/constants';
import { createClient } from '@/lib/supabase/server';
import { convertSupabaseDateToShortHumanReadable, TABLE } from '@/lib/supabase';
import sanitizeHtmlServer from '@/utils/sanitizeHtml';
import { generateGradient } from '@/utils/seedGradient';

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

	const decodedSlug = decodeURIComponent(slug);

	const productList = await getProductList();
	const product = productList?.find(product => product.slug === decodedSlug);

	if (!product) notFound();

	const supabase = await createClient();
	const [{ data: reviews, error: getReviewsError }, { data: reviewCountByProduct }] = await Promise.all([
		supabase
			.from(TABLE.COURSE_REVIEWS)
			.select('*')
			.order('created_at', { ascending: false })
			.eq('product_id', product?.metadata.productId)
			.eq('category', product?.metadata.category),
		supabase
			.from(TABLE.VIEW.REVIEW_COUNT_BY_PRODUCT)
			.select('review_count')
			.eq('product_id', product?.metadata.productId)
			.eq('category', product?.metadata.category)
			.maybeSingle(),
	]);

	if (getReviewsError) {
		throw new Error(getReviewsError.message);
	}

	const sanitizedReviews = reviews?.map(review => ({
		...review,
		content: sanitizeHtmlServer(review.content),
	}));

	const reviewCount = reviewCountByProduct?.review_count ?? 0;

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

			<Button type="button" variant="secondary" asChild>
				<Link href={route.SERVICE.PRODUCTS} className="w-fit">
					<ArrowLeft />
					Go Back
				</Link>
			</Button>
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

				<div className="row-span-1 sm:col-span-2 flex flex-col justify-between gap-8 p-6 md:p-8 w-full bg-light border border-muted rounded-xl">
					<h2 className="title font-bold text-3xl tracking-tighter">{product.metadata.title}</h2>
					<div className="flex flex-col gap-8">
						<div className="flex flex-col gap-4">
							<span className="px-3 py-1 w-fit bg-gradient-orange-100 text-sm font-bold text-white rounded-sm">
								{SiteConfig.author.name}
							</span>
							<div className="flex flex-wrap items-center gap-1">
								{product.metadata.tags?.map(tag => (
									<span key={tag} className="px-3 py-1 w-fit bg-white border border-muted text-xs font-bold text-gray-600 rounded-full">
										{tag}
									</span>
								))}
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-4">
								<span className="inline-block min-w-10 text-sm">등록일</span>
								<p className="text-sm text-neutral-600 dark:text-neutral-400">{formatDate(product.metadata.publishedAt)}</p>
							</div>
							<div className="flex items-center gap-2">
								<span className="inline-block min-w-10 text-sm">리 뷰</span>
								<Badge variant="secondary" className="text-muted-foreground">
									<Star className="text-yellow-400" fill="oklch(85.2% 0.199 91.936)" />
									<span className="inline-flex items-center gap-1">
										{(5.0).toFixed(1)}
										<span className="text-gray-700">({reviewCount})</span>
									</span>
								</Badge>
							</div>
						</div>
					</div>

					{slug === 'offline-portfolio-class' ? (
						<ApplyCourseContext />
					) : (
						<Button type="button" disabled={true}>
							온라인 강의는 곧 판매 예정입니다
						</Button>
					)}
				</div>
			</div>

			<div className="flex flex-col gap-2 my-8 md:my-12">
				<h3 className="flex items-center gap-2 text-2xl font-bold tracking-tight md:text-3xl">
					<span className="font-bold">리 뷰</span>
					<span>･</span>
					<span className="font-semibold">{reviewCount}개</span>
				</h3>
				<Carousel
					opts={{
						align: 'start',
						loop: true,
					}}
					className="w-full">
					<div className="flex justify-end gap-2 mb-2">
						<CarouselPrevious className="static translate-y-0" />
						<CarouselNext className="static translate-y-0" />
					</div>
					<CarouselContent className="-ml-2">
						{sanitizedReviews.map(({ title, content, username, created_at }, index) => (
							<CarouselItem key={index} className="pl-2 basis-full md:basis-1/2 lg:basis-1/3">
								<div className="flex flex-col justify-between gap-4 p-3 border border-muted rounded-lg h-full">
									<div className="text-base font-bold">{title}</div>
									<p className="max-w-[300px] line-clamp-8 text-sm" dangerouslySetInnerHTML={{ __html: content }} />
									<div className="flex gap-4">
										<div className="w-12 h-12 rounded-full" style={{ background: generateGradient(content) }} />
										<div className="flex flex-col gap-1">
											<span className="py-1.5 px-3 bg-gray-100 text-sm text-center text-gray-600 font-semibold rounded-lg">{username}</span>
											<span className="inline-block p-1.5 text-xs text-gray-500 rounded-lg">
												{convertSupabaseDateToShortHumanReadable(created_at)}
											</span>
										</div>
									</div>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>

			<NavigationList />

			<article className="prose mb-16">
				<CustomMDX source={product.content} />
			</article>
		</section>
	);
}
