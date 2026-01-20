import type { Metadata, Viewport } from 'next';
import '../../globals.css';
import Link from 'next/link';
import { Toaster } from 'sonner';
import { SiteConfig } from '@/app/config';
import { ReactQueryProvider } from '@/providers';
import { route } from '@/constants';

export const metadata: Metadata = {
	title: SiteConfig.title.AUTH,
	description: SiteConfig.subtitle,
	openGraph: {
		title: SiteConfig.title.AUTH,
	},
	twitter: {
		title: SiteConfig.title.AUTH,
	},
};

export const viewport: Viewport = {
	themeColor: '#ffffff',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ReactQueryProvider>
			<div className="flex flex-col justify-center min-h-screen mx-auto w-full p-4 bg-muted sm:p-8 lg:p-12">
				<h1 className="mx-auto mt-4 w-fit">
					<Link
						href={route.SERVICE.ROOT}
						className="px-4 py-2 w-full h-full text-2xl text-white font-black font-mono text-center bg-gradient-orange-100 rounded-lg cursor-pointer">
						Designthou
					</Link>
				</h1>
				<section className="max-w-120 mx-auto mt-8 w-full sm:mt-16">{children}</section>
			</div>
			<Toaster />
		</ReactQueryProvider>
	);
}
