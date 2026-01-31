import '../../globals.css';
import { Analytics } from '@vercel/analytics/next';
import { AppSidebar, Main, ScrollToTopButton, Separator, SidebarInset, SidebarProvider, SidebarTrigger } from '@/components';
import { ReactQueryProvider } from '@/providers';

export default function CourseLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<ReactQueryProvider>
				<SidebarProvider>
					<SidebarInset>
						<header className="flex shrink-0 justify-between items-center gap-2 h-12 border-b px-4">
							<h1 className="font-bold text-primary text-base" aria-label="Online Class Title">
								Sketchup All-in-one
							</h1>
							<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
							<SidebarTrigger className="-ml-1" />
						</header>
						<Main>{children}</Main>
					</SidebarInset>
					<AppSidebar side="right" />
					<ScrollToTopButton />
				</SidebarProvider>
			</ReactQueryProvider>
			<Analytics />
		</>
	);
}
