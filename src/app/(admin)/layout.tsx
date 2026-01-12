import { Inter, Geist_Mono } from 'next/font/google'
import { Metadata } from 'next'
import '../globals.css'
import { ReactQueryProvider } from '@/providers'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from '@/components'

const inter = Inter({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
	preload: true,
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Designthou | Admin',
	description: 'This is a Designthou Admin Page',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="ko">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link
					rel="shortcut icon"
					type="image/x-icon"
					href="/admin/favicon.ico"
				/>
				<link
					rel="icon"
					type="image/png"
					href="/admin/favicon-96x96.png"
					sizes="96x96"
				/>
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/admin/apple-touch-icon.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<meta name="apple-mobile-web-app-title" content="Designthou Admin" />
				<meta name="msapplication-TileColor" content="ffffff" />
				<meta name="theme-color" content="#ffffff" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"
				/>
			</head>
			<body className={`${inter.variable} ${geistMono.variable} antialiased`}>
				<ReactQueryProvider>
					{children}
					<Toaster />
					<ReactQueryDevtools initialIsOpen={false} />
				</ReactQueryProvider>
			</body>
		</html>
	)
}
