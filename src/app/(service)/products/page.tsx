import { Metadata } from 'next';
import { SiteConfig } from '@/app/config';
import { ProductList, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components';

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

export default function ProductsPage() {
	return (
		<section className="p-4 max-w-300">
			<h2 className="page-title hidden" aria-label="Online Course Title">
				Online Course
			</h2>
			<div>
				<div className="ui-flex-center-between">
					<h3 className="page-subtitle">전체 클래스</h3>
					<Select value={'최신 순'}>
						<SelectTrigger size="sm" className="w-40" id="order-trigger">
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

				<ProductList />
			</div>
		</section>
	);
}
