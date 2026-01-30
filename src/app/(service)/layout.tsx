import '../globals.css';
import { Analytics } from '@vercel/analytics/next';
import { Footer, KakaoOpenChat, Main, Nav, NotifySection, ScrollToTopButton } from '@/components';
import { ReactQueryProvider } from '@/providers';

export default function ServiceLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className="h-screen mx-auto w-full">
				<ReactQueryProvider>
					<NotifySection />
					<Nav />
					<Main>{children}</Main>
					<Footer />
					<KakaoOpenChat />
					<ScrollToTopButton />
				</ReactQueryProvider>
			</div>
			<Analytics />
		</>
	);
}
