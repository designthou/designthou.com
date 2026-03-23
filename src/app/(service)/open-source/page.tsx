import { Metadata } from 'next';
import Link from 'next/link';
import { SiteConfig } from '@/app/config';
import { route } from '@/constants';

export const metadata: Metadata = {
	title: SiteConfig.title.OPEN_SOURCE,
	description: SiteConfig.description.OPEN_SOURCE,
	openGraph: {
		title: SiteConfig.title.OPEN_SOURCE,
		description: SiteConfig.title.OPEN_SOURCE,
		images: [
			{
				url: `${SiteConfig.url}/og/static`,
				width: 1200,
				height: 630,
			},
		],
	},
};

export default async function ServiceOpenSourcePage() {
	return (
		<section className="p-4 mx-auto max-w-200">
			<h2 className="page-title">Open Source</h2>
			<div className="flex flex-col gap-4 mt-8 md:flex-row">
				<Link
					href={route.SERVICE.OPEN_SOURCE_AI}
					className="ui-flex-center aspect-square md:w-100 md:h-100 bg-light font-bold rounded-lg text-gray-600 hover:ring-2 ring-gray-200 transition-all">
					Adobe Illustrator (.ai)
				</Link>
				<Link
					href={route.SERVICE.OPEN_SOURCE_CAD}
					className="ui-flex-center aspect-square md:w-100 md:h-100 bg-light font-bold rounded-lg text-gray-600 hover:ring-2 ring-gray-200 transition-all">
					AutoCAD (.cad)
				</Link>
			</div>
		</section>
	);
}
