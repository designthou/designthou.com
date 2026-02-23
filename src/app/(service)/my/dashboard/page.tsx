import { Metadata } from 'next';
// import Link from 'next/link';
import { redirect } from 'next/navigation';
// import { ArrowUpRight, Hash } from 'lucide-react';
import { SiteConfig } from '@/app/config';
import { LogoutButton, ProfileAvatar } from '@/components';
import { createClient } from '@/lib/supabase/server';
// import { mapOnlineCourseRowToView } from '@/types';
// import { OnlineCourseRow, TABLE } from '@/lib/supabase';
import { route } from '@/constants';

export const metadata: Metadata = {
	title: SiteConfig.title.DASHBOARD,
	description: SiteConfig.description.DASHBOARD,
	openGraph: {
		title: SiteConfig.title.DASHBOARD,
		description: SiteConfig.title.DASHBOARD,
		images: [
			{
				url: `${SiteConfig.url}/og/static`,
				width: 1200,
				height: 630,
			},
		],
	},
};

export default async function MyDashboardPage() {
	const supabaseServerClient = await createClient();

	const {
		data: { user },
	} = await supabaseServerClient.auth.getUser();

	if (!user) {
		redirect(route.AUTH.LOGIN);
	}

	// const { data, error } = await supabaseServerClient.from(TABLE.ONLINE_COURSES).select('*').returns<OnlineCourseRow[]>();

	// if (error) {
	// 	throw error;
	// }

	// const onlineCourseLinks = data?.map(mapOnlineCourseRowToView);

	return (
		<section className="p-4 max-w-300">
			<h2 className="page-subtitle">My Dashboard</h2>
			<div className="flex justify-between gap-4 mt-4 p-4 w-full bg-gray-50 rounded-lg">
				<div className="ui-flex-center gap-8">
					<ProfileAvatar user={user} size={64} />
					<dl className="flex flex-col gap-2">
						<div className="flex items-center gap-2">
							<dt className="min-w-14 px-1 py-0.5 bg-gray-100 text-gray-500 rounded-md text-center">이 름</dt>
							<dd className="px-2 py-0.5">{user?.user_metadata?.name}</dd>
						</div>
						<div className="flex items-center gap-2">
							<dt className="min-w-14 px-1 py-0.5 bg-gray-100 text-gray-500 rounded-md text-center">이메일</dt>
							<dd className="px-2 py-0.5">{user?.user_metadata?.email}</dd>
						</div>
						<div className="flex items-center gap-2">
							<dt className="min-w-14 px-1 py-0.5 bg-gray-100 text-gray-500 rounded-md text-center">로그인</dt>
							<dd className="px-2 py-0.5">{user?.app_metadata.provider}</dd>
						</div>
					</dl>
				</div>
				<LogoutButton className="w-fit" />
			</div>
			<div className="mt-4 p-4 bg-gray-50 rounded-md">
				<div className="ui-flex-center-between">
					<h3 className="font-semibold text-lg text-gray-500">All my courses</h3>
					{/*<span className="font-bold text-4xl">{onlineCourseLinks?.length}</span>*/}
				</div>
				{/*<div className="flex flex-col gap-4 mx-auto mt-4">
					{onlineCourseLinks.map(course => (
						<div key={course.id} className="flex flex-col gap-2 p-3 bg-white rounded-lg border border-gray-100">
							<div className="flex items-center gap-2">
								<span className="inline-flex justify-center items-center p-1.5 w-fit bg-black text-white rounded-full">
									<Hash size={12} />
								</span>
								<p className="font-semibold">{course.title}</p>
							</div>
							<div className="ui-flex-center-between">
								<span className="p-1 text-xs font-medium text-gray-500 bg-muted rounded-md">총 {course.totalVideoDuration}</span>
								<Button key={course.id} variant="outline" asChild className="w-fit ml-auto">
									<Link href={`${route.COURSE.ROOT}/${course.id}`}>
										Learn
										<ArrowUpRight />
									</Link>
								</Button>
							</div>
						</div>
					))}
				</div>*/}
			</div>
		</section>
	);
}
