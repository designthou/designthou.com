import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button, CourseSidebar, ScrollToTopButton, Separator, SidebarInset, SidebarProvider, SidebarTrigger } from '@/components';
import { route } from '@/constants';
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
				<header className="flex shrink-0 justify-between items-center gap-2 h-12 border-b py-2 px-4">
					<div className="ui-flex-center gap-2">
						<Button asChild variant="secondary" size="icon-sm">
							<Link href={route.SERVICE.DASHBOARD}>
								<ArrowLeft />
							</Link>
						</Button>
						<h1 className="text-sm font-bold text-primary w-60 truncate sm:text-base sm:w-auto" aria-label="Online Class Title">
							{data?.map(mapOnlineCourseRowToView)[0]?.title}
						</h1>
					</div>
					<div className="ui-flex-center gap-2">
						<Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
						<SidebarTrigger className="" />
					</div>
				</header>
				<main className="p-4">{children}</main>
			</SidebarInset>
			<CourseSidebar side="right" courseId={courseId} />
			<ScrollToTopButton />
		</SidebarProvider>
	);
}
