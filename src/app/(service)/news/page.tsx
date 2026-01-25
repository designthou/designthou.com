import { Metadata } from 'next';
import React from 'react';
import { Skeleton, Tabs, TabsContent, TabsList, TabsTrigger, ServiceNewsList } from '@/components';
import { SiteConfig } from '@/app/config';
import { triggers } from '@/constants';

export const metadata: Metadata = {
	title: SiteConfig.title.NEWS,
	description: SiteConfig.description.NEWS,
	openGraph: {
		title: SiteConfig.title.NEWS,
		description: SiteConfig.title.NEWS,
		images: [
			{
				url: `${SiteConfig.url}/og/static`,
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function ServiceNewsPage() {
	return (
		<section className="p-4 max-w-300">
			<div className="flex flex-col justify-center gap-4 py-8 px-4 w-full text-center bg-light rounded-lg border border-muted">
				<h2 className="page-title" aria-label="News Page Title">
					News
				</h2>
				<p className="text-center outlined-text font-bold text-lg sm:text-xl lg:text-2xl">Meet our selected news</p>
			</div>

			<div className="mt-8">
				<Tabs defaultValue={triggers[0]}>
					<TabsList>
						{triggers.map(trigger => (
							<TabsTrigger key={trigger} value={trigger}>
								{trigger}
							</TabsTrigger>
						))}
					</TabsList>

					<React.Suspense
						fallback={
							<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
								{Array.from({ length: 12 }, (_, idx) => (
									<Skeleton key={idx} className="h-28 w-full sm:h-31" />
								))}
							</div>
						}>
						{triggers.map(trigger => (
							<TabsContent key={trigger} value={trigger}>
								<ServiceNewsList year={trigger} />
							</TabsContent>
						))}
					</React.Suspense>
				</Tabs>
			</div>
		</section>
	);
}
