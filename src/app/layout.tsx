import type { Metadata, Viewport } from 'next';
import './globals.css';
import Script from 'next/script';
import { Geist_Mono, Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { GAProvider } from '@/lib/ga4';
import { SiteConfig } from './config';

const inter = Inter({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
	preload: true,
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: {
		template: `%s`,
		default: SiteConfig.title.default,
	},
	description: SiteConfig.subtitle,
	openGraph: {
		title: SiteConfig.title.default,
		description: SiteConfig.subtitle,
		siteName: 'Designthou',
		locale: 'ko_KR',
		type: 'website',
		url: SiteConfig.url,
		images: [
			{
				url: `${SiteConfig.url}/designthou.png`,
				width: 1200,
				height: 630,
				type: 'image/png',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: SiteConfig.title.default,
		description: 'Designthou - Spatial Content Platform',
		images: [`${SiteConfig.url}/designthou.png`],
	},
	icons: {
		icon: [
			{ url: '/favicon/favicon.ico', sizes: 'any' },
			{ url: '/favicon/favicon.ico', type: 'image/x-icon' },
			{ url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
			{ url: '/favicon/favicon.svg', type: 'image/svg+xml' },
		],
		shortcut: '/favicon/favicon.ico',
		apple: '/favicon/apple-touch-icon.png',
	},
	manifest: '/favicon/site.webmanifest',
	appleWebApp: {
		title: 'Designthou',
		capable: true,
		statusBarStyle: 'black-translucent',
	},
	other: {
		'msapplication-TileColor': '#ffffff',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		},
	},
	verification: {
		google: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_ID,
		other: {
			'naver-site-verification': process.env.NEXT_PUBLIC_NAVER_SEARCH_CONSOLE_ID!,
		},
	},
};

export const viewport: Viewport = {
	themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="ko">
			<head>
				<meta name="msapplication-TileColor" content="ffffff" />
				<meta name="theme-color" content="#ffffff" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
				<meta name="robots" content="index, follow" />
				<Script
					async
					src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}`}
					crossOrigin="anonymous"
					strategy="afterInteractive"
				/>
			</head>
			<body className={`${inter.variable} ${geistMono.variable} antialiased`}>
				{children}

				{process.env.NEXT_PUBLIC_GA4_ID ? <GAProvider gaId={process.env.NEXT_PUBLIC_GA4_ID} /> : null}
				<Analytics />
			</body>
		</html>
	);
}
