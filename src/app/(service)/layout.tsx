import '../globals.css';
import { Analytics } from '@vercel/analytics/next';
import { Footer, KakaoOpenChat, Main, Nav, NotifySection, ScrollToTopButton } from '@/components';
import { AuthProvider, ReactQueryProvider } from '@/providers';

export default async function ServiceLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-screen mx-auto w-full">
			<ReactQueryProvider>
				<AuthProvider>
					<NotifySection />
					<Nav />
					<Main>{children}</Main>
					<Footer />
					<KakaoOpenChat />
					<ScrollToTopButton />
				</AuthProvider>
			</ReactQueryProvider>
			<Analytics />
		</div>
	);
}
