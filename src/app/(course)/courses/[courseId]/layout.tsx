import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button, CourseSidebar, ScrollToTopButton, Separator, SidebarInset, SidebarProvider, SidebarTrigger } from '@/components';
import { createClient } from '@/lib/supabase/server';
import { getCourse } from '@/lib/supabase';
import { route } from '@/constants';

export default async function CourseDetailLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ courseId: string }>;
}>) {
	const { courseId } = await params;

	const supabaseServerClient = await createClient();

	const {
		data: { user },
	} = await supabaseServerClient.auth.getUser();

	const course = await getCourse(courseId);

	return (
		<SidebarProvider>
			<SidebarInset>
				<header className="flex shrink-0 justify-between items-center gap-2 h-12 border-b py-2 px-4">
					<div className="ui-flex-center gap-2">
						<Button asChild variant="secondary" size="icon-sm">
							<Link href={route.SERVICE.DASHBOARD}>
								<ArrowLeft />
							</Link>
						</Button>
						<h1 className="text-sm font-bold text-primary w-60 truncate sm:text-base sm:w-auto" aria-label="Online Class Title">
							{course?.title}
						</h1>
					</div>
					<div className="ui-flex-center gap-2">
						<Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
						<SidebarTrigger className="" />
					</div>
				</header>
				<main className="px-4 py-3">{children}</main>
			</SidebarInset>
			<CourseSidebar side="right" courseId={courseId} user={user} />
			<ScrollToTopButton />
		</SidebarProvider>
	);
}
