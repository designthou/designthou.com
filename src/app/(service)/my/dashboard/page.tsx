import Link from 'next/link';
import { ArrowUpRight, Hash } from 'lucide-react';
import { Button, GradientCircle } from '@/components';
import { createClient } from '@/lib/supabase/server';
import { mapOnlineCourseRowToView } from '@/types';
import { OnlineCourseRow, TABLE } from '@/lib/supabase';
import { route } from '@/constants';

export default async function MyDashboardPage() {
	const supabaseServerClient = await createClient();
	const { data, error } = await supabaseServerClient.from(TABLE.ONLINE_COURSES).select('*').returns<OnlineCourseRow[]>();

	if (error) {
		throw error;
	}

	const onlineCourseLinks = data?.map(mapOnlineCourseRowToView);

	return (
		<section className="p-4 max-w-300">
			<h2 className="page-subtitle">My Dashboard</h2>
			<div className="flex items-center gap-4 mt-4  p-4 bg-gray-50 rounded-lg">
				<GradientCircle trigger={''} className="w-12 h-12" />
				<dl className="flex flex-col gap-2">
					<div className="flex items-center gap-2">
						<dt className="px-1 py-0.5 bg-gray-100 text-gray-500 rounded-md">이 름</dt>
						<dd className="px-2 py-0.5">???</dd>
					</div>
					<div className="flex items-center gap-2">
						<dt className="px-1 py-0.5 bg-gray-100 text-gray-500 rounded-md">이메일</dt>
						<dd className="px-2 py-0.5">???</dd>
					</div>
				</dl>
			</div>
			<div className="mt-4 p-4 bg-gray-50 rounded-md">
				<div className="ui-flex-center-between">
					<h3 className="font-semibold text-lg text-gray-500">All my courses</h3>
					<span className="font-bold text-4xl">{onlineCourseLinks?.length}</span>
				</div>
				<div className="flex flex-col gap-4 mx-auto mt-4">
					{onlineCourseLinks.map(course => (
						<div key={course.id} className="flex flex-col gap-2 p-3 bg-white rounded-lg border border-gray-100">
							<div className="flex items-center gap-2">
								<span className="inline-flex justify-center items-center p-1.5 w-fit bg-black text-white rounded-full">
									<Hash size={12} />
								</span>
								<p className="font-semibold">{course.title}</p>
							</div>
							<div className="ui-flex-center-between">
								<span className="p-1 text-sm font-medium text-gray-500 bg-muted rounded-md">총 {course.totalVideoDuration}</span>
								<Button key={course.id} variant="outline" asChild className="w-fit ml-auto">
									<Link href={`${route.COURSE.ROOT}/${course.id}`}>
										Learn
										<ArrowUpRight />
									</Link>
								</Button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
