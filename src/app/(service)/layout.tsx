import '../globals.css';
import { Footer, KakaoOpenChat, Main, Nav, ScrollToTopButton } from '@/components';
import { ReactQueryProvider } from '@/providers';

export default function ServiceLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="h-screen mx-auto w-full">
			<ReactQueryProvider>
				<Nav />
				<Main>{children}</Main>
				<Footer />
				<KakaoOpenChat />
				<ScrollToTopButton />
			</ReactQueryProvider>
		</div>
	);
}
