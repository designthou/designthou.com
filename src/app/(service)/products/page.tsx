import { Metadata } from 'next';
import { SiteConfig } from '@/app/config';
import { ProductList, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Wip, ProductCarousel } from '@/components';
import { createClient } from '@/lib/supabase/server';
import { TABLE } from '@/lib/supabase';

export const metadata: Metadata = {
	title: SiteConfig.title.PRODUCTS,
	description: SiteConfig.description.PRODUCTS,
	openGraph: {
		title: SiteConfig.title.PRODUCTS,
		description: SiteConfig.title.PRODUCTS,
		images: [
			{
				url: `${SiteConfig.url}/og/static`,
				width: 1200,
				height: 630,
			},
		],
	},
};

export default async function ProductsPage() {
	const supabase = await createClient();
	const { data, error } = await supabase.from(TABLE.VIEW.REVIEW_COUNT_BY_PRODUCT).select('*');

	if (error) {
		throw new Error(error?.message);
	}

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
			<ProductCarousel />

			<div className="ui-flex-center-between mt-4">
				<h3 className="page-subtitle">전체 클래스</h3>
				<Select value={'최신 순'}>
					<SelectTrigger size="sm" className="w-24" id="order-trigger">
						<SelectValue placeholder={'업로드 날짜'} />
					</SelectTrigger>
					<SelectContent side="top">
						{['최신 순', '오래된 순'].map(trigger => (
							<SelectItem key={trigger} value={`${trigger}`}>
								{trigger}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<ProductList reviewCounts={data} />
			<Wip
				message={'플랫폼 점검으로 인해 현재 온라인 강의는 판매 중단 중 입니다.'}
				className="mt-12 bg-white text-black border border-muted bg-light"
			/>
		</section>
	);
}
