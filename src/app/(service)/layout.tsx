import '../globals.css';
import { Analytics } from '@vercel/analytics/next';
import { Footer, KakaoOpenChat, Main, Nav, NotifySection, ScrollToTopButton } from '@/components';
import { AuthProvider, ReactQueryProvider } from '@/providers';
import { createClient } from '@/lib/supabase/server';

export default async function ServiceLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<>
			<div className="h-screen mx-auto w-full">
				<ReactQueryProvider>
					<AuthProvider>
						<NotifySection />
						<Nav user={user} />
						<Main>{children}</Main>
						<Footer />
						<KakaoOpenChat />
						<ScrollToTopButton />
					</AuthProvider>
				</ReactQueryProvider>
			</div>
			<Analytics />
		</>
	);
}
