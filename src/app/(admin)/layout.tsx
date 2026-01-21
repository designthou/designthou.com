import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { ReactQueryProvider } from '@/providers';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@/components';

export const metadata: Metadata = {
	title: {
		default: 'Admin | Designthou',
		template: 'Admin | %s',
	},
	description: 'Designthou Admin pages',
	icons: {
		icon: [
			{ url: '/admin/favicon.ico', sizes: 'any' },
			{ url: '/admin/favicon.ico', sizes: 'image/x-icon' },
			{ url: '/admin/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
			{ url: '/admin/favicon.svg', type: 'image/svg+xml' },
		],
		shortcut: '/admin/favicon.ico',
		apple: '/admin/apple-touch-icon.png',
	},
	manifest: '/admin/site.webmanifest',
	appleWebApp: {
		title: 'Designthou Admin',
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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<ReactQueryProvider>
			{children}
			<Toaster />
			<ReactQueryDevtools initialIsOpen={false} />
		</ReactQueryProvider>
	);
}
