import { CourseSidebar, ScrollToTopButton, Separator, SidebarInset, SidebarProvider, SidebarTrigger } from '@/components';
import { TABLE } from '@/lib/supabase';
import { createClient } from '@/lib/supabase/server';
import { mapOnlineCourseRowToView } from '@/types';

export default async function CourseDetailLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ courseId: string }>;
}>) {
	const { courseId } = await params;

	const supabaseServerClient = await createClient();
	const { data, error } = await supabaseServerClient.from(TABLE.ONLINE_COURSES).select('*').eq('id', courseId);

	if (error) {
		throw error;
	}

	return (
		<SidebarProvider>
			<SidebarInset>
				<header className="flex shrink-0 justify-between items-center gap-2 h-12 border-b px-4">
					<h1 className="font-bold text-primary text-base" aria-label="Online Class Title">
						{data?.map(mapOnlineCourseRowToView)[0]?.title}
					</h1>
					<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
					<SidebarTrigger className="-ml-1" />
				</header>
				<main className="p-4">{children}</main>
			</SidebarInset>
			<CourseSidebar side="right" courseId={courseId} />
			<ScrollToTopButton />
		</SidebarProvider>
	);
}
