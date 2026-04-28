import { Metadata } from 'next';
import Link from 'next/link';
import { SiteConfig } from '@/app/config';
import { route } from '@/constants';
import { Callout } from '@/components';
import { Star } from 'lucide-react';

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
			<Callout
				message="Download our high quality sources below"
				className="mt-4 p-4 w-full bg-linear-to-r from-gray-100 to-gray-300 text-gray-500"
			/>
			<div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2">
				<Link
					href={route.SERVICE.OPEN_SOURCE_AI}
					className="col-span-1 ui-flex-center aspect-square font-bold rounded-lg bg-linear-to-tl from-blue-200 to-blue-50 text-gray-600 hover:ring-2 ring-blue-200 transition-all">
					Adobe Illustrator (.ai)
				</Link>
				<Link
					href={route.SERVICE.OPEN_SOURCE_CAD}
					className="col-span-1 ui-flex-center aspect-square font-bold rounded-lg bg-linear-to-br from-blue-200 to-blue-50 text-gray-600 hover:ring-2 ring-blue-200 transition-all">
					AutoCAD (.cad)
				</Link>
			</div>
		</section>
	);
}
