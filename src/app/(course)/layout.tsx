import '../globals.css';
import type { Metadata, Viewport } from 'next';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryProvider } from '@/providers';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
	title: {
		default: 'Course | Designthou',
		template: 'Course | %s',
	},
	description: 'Designthou Course page',
	icons: {
		icon: [
			{ url: '/favicon/favicon.ico', sizes: 'any' },
			{ url: '/favicon/favicon.ico', sizes: 'image/x-icon' },
			{ url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
			{ url: '/favicon/favicon.svg', type: 'image/svg+xml' },
		],
		shortcut: '/favicon/favicon.ico',
		apple: '/favicon/apple-touch-icon.png',
	},
	manifest: '/favicon/site.webmanifest',
	appleWebApp: {
		title: 'Designthou Online Course',
	},
	other: {
		'msapplication-TileColor': '#ffffff',
	},
	robots: {
		index: false,
		follow: false,
		googleBot: {
			index: false,
			follow: false,
		},
	},
	verification: undefined,
};

export const viewport: Viewport = {
	themeColor: '#ffffff',
};

export default function CourseRootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ReactQueryProvider>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
			<Analytics />
		</ReactQueryProvider>
	);
}
