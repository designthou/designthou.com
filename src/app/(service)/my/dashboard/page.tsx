import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight, Hash, SquareArrowOutUpRight } from 'lucide-react';
import { SiteConfig } from '@/app/config';
import { Button, LogoutButton, ProfileAvatar, Progress } from '@/components';
import { mapOfflineCourseStudentRowToSummaryView, mapOnlineCourseRowToView } from '@/types';
import { createClient } from '@/lib/supabase/server';
import { convertSupabaseDateToShortHumanReadable, OnlineCourseRow, TABLE } from '@/lib/supabase';
import { getMonthGap } from '@/utils/date';
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

function NoneOfDataBlock() {
	return (
		<div className="ui-flex-center flex-col gap-4 p-8 min-h-40 border border-gray-200 bg-white text-gray-600 font-medium rounded-md">
			<p>등록한 수업 없음</p>
			<Button variant="outline" size="sm" asChild>
				<Link href={route.SERVICE.PRODUCTS}>수업 신청하러 가기</Link>
			</Button>
		</div>
	);
}

export default async function MyDashboardPage() {
	const supabaseServerClient = await createClient();

	const {
		data: { user },
	} = await supabaseServerClient.auth.getUser();

	if (!user || user?.is_anonymous) {
		redirect(route.AUTH.LOGIN);
	}

	const [
		{ data: onlineCourses, error: getOnlineCoursesError },
		{ data: profile, error: getProfileError },
		{ data: offlineCourses, error: getOfflineCoursesError },
	] = await Promise.all([
		supabaseServerClient.from(TABLE.ONLINE_COURSES).select('*').returns<OnlineCourseRow[]>(),
		supabaseServerClient.from(TABLE.PROFILES).select('legacy_user_id').eq('id', user?.id).maybeSingle(),
		supabaseServerClient
			.from(TABLE.OFFLINE_COURSE_STUDENTS)
			.select('id, name, program, option, description, bank, created_at')
			.eq('email', user?.email),
	]);

	const { data: enrollments, error: getEnrollmentsError } = await supabaseServerClient
		.from(TABLE.ENROLLMENTS)
		.select('course_id, legacy_user_id, access_expires_at, progress, status')
		.eq('legacy_user_id', profile?.legacy_user_id);

	if (getOnlineCoursesError) {
		throw getOnlineCoursesError;
	}

	if (getProfileError) {
		throw getProfileError;
	}

	if (getOfflineCoursesError) {
		throw getOfflineCoursesError;
	}

	if (getEnrollmentsError) {
		throw getEnrollmentsError;
	}

	const checkExpired = (expiresAt: string | null) => {
		if (!expiresAt) return false;

		return getMonthGap(expiresAt) > 6;
	};

	const offlineCourseSummaryList = offlineCourses.map(course => mapOfflineCourseStudentRowToSummaryView(course));
	const enrollmentMap = new Map((enrollments ?? []).map(enrollment => [enrollment.course_id, enrollment]));
	const onlineCourseLinks = onlineCourses
		?.filter(course => enrollmentMap.has(course.id))
		?.map(course => {
			const enrollment = enrollmentMap.get(course.id);

			return {
				...mapOnlineCourseRowToView(course),
				progress: enrollment?.progress,
				status: enrollment?.status,
				expiredAt: enrollment?.access_expires_at,
			};
		});

	return (
		<section className="p-4 max-w-300">
			<h2 className="page-subtitle">My Dashboard</h2>
			<div className="flex flex-col justify-between gap-4 mt-4 p-4 w-full bg-gray-50 rounded-lg sm:flex-row">
				<div className="ui-flex-center gap-4 sm:gap-8">
					<ProfileAvatar user={user} size={64} />
					<dl className="flex flex-col gap-3 text-sm sm:text-base">
						<div className="flex items-center gap-2">
							<dt className="min-w-14 px-1 py-0.5 bg-gray-100 text-gray-500 rounded-md text-center">이 름</dt>
							<dd className="px-2 py-0.5">
								{user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? user?.user_metadata?.display_name ?? '이름 없음'}
							</dd>
						</div>
						<div className="flex items-center gap-2">
							<dt className="min-w-14 px-1 py-0.5 bg-gray-100 text-gray-500 rounded-md text-center">이메일</dt>
							<dd className="px-2 py-0.5">{user?.user_metadata?.email}</dd>
						</div>
						<div className="flex items-center gap-2">
							<dt className="min-w-14 px-1 py-0.5 bg-gray-100 text-gray-500 rounded-md text-center">로그인</dt>
							<dd className="flex items-center gap-2 px-2 py-0.5">
								{(user?.app_metadata?.providers ?? [])?.map(provider => (
									<li key={provider} className="py-1 px-2 bg-white text-sm text-gray-600 rounded-full">
										{provider}
									</li>
								))}
							</dd>
						</div>
					</dl>
				</div>
				<div className="flex flex-col justify-between gap-2">
					{user?.user_metadata?.role === 'admin' && (
						<Button type="button" asChild variant="default">
							<Link href={route.ADMIN.ROOT} target="_blank" rel="noopenner noreferrer">
								<SquareArrowOutUpRight />
								관리자 페이지
							</Link>
						</Button>
					)}
					<LogoutButton className="ml-auto" />
				</div>
			</div>
			<div className="grid grid-cols-1 gap-4 mt-4 rounded-lg md:grid-cols-3">
				<div className="col-span-1 p-4 bg-gray-50 rounded-md">
					<div className="ui-flex-center-between">
						<h3 className="font-semibold text-lg text-gray-500">Offline Class</h3>
						<span className="font-bold text-4xl">{offlineCourseSummaryList?.length}</span>
					</div>
					<div className="grid grid-cols-1 gap-4 mx-auto mt-4">
						{offlineCourseSummaryList.length > 0 ? (
							offlineCourseSummaryList?.map(course => (
								<div key={course.id} className="flex flex-col gap-3 p-3 bg-white rounded-lg border border-gray-100">
									<div className="flex items-center gap-4">
										<span className="inline-block min-w-20 text-gray-700 font-semibold">신청 옵션</span>
										<span className="inline-block p-1.5 text-gray-700 bg-muted rounded-lg">{course?.option}</span>
									</div>
									<div className="flex items-center gap-4">
										<span className="inline-block min-w-20 text-gray-700 font-semibold">신청 프로그램</span>
										<span className="inline-block p-1.5  text-gray-700 bg-muted rounded-lg">{course?.program}</span>
									</div>
									<div className="flex items-center gap-4">
										<span className="inline-block min-w-20 text-gray-700 font-semibold">신청일 </span>
										<span className="inline-block p-1.5  text-gray-700 bg-muted rounded-lg">
											{convertSupabaseDateToShortHumanReadable(course?.createdAt)}
										</span>
									</div>
								</div>
							))
						) : (
							<NoneOfDataBlock />
						)}
					</div>
				</div>

				<div className="col-span-2 p-4 bg-gray-50 rounded-lg">
					<div className="ui-flex-center-between">
						<h3 className="font-semibold text-lg text-gray-500">Online Courses</h3>
						<span className="font-bold text-4xl">{onlineCourseLinks?.length}</span>
					</div>
					<div className="flex flex-col gap-4 mx-auto mt-4">
						{onlineCourseLinks.length > 0 ? (
							onlineCourseLinks.map(course => {
								const isExpired = checkExpired(course?.expiredAt);

								return (
									<div key={course.id} className="flex flex-col gap-3 p-3 bg-white rounded-lg border border-gray-100">
										<div className="flex items-center gap-2">
											<span className="inline-flex justify-center items-center p-1.5 w-fit bg-black text-white rounded-full">
												<Hash size={12} />
											</span>
											<p className="font-semibold">{course.title}</p>
										</div>
										<div className="flex flex-col gap-2 p-3 bg-light rounded-lg">
											<div className="flex justify-between items-center text-xs text-gray-500">
												<span>진도율</span>
												<span>{course.progress}/100 (%)</span>
											</div>
											<Progress value={course.progress} />
										</div>
										<div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
											<div className="flex items-center gap-2">
												<span className="p-1 text-xs font-medium text-gray-500 bg-muted rounded-md">총 {course.totalVideoDuration}</span>
												{course.expiredAt ? (
													<span className="p-1 text-xs font-medium text-gray-500 bg-white border border-muted rounded-md">
														{convertSupabaseDateToShortHumanReadable(course.expiredAt)}까지
													</span>
												) : null}
											</div>
											<Button
												key={course.id}
												variant={isExpired ? 'secondary' : 'outline'}
												asChild
												disabled={isExpired ? true : false}
												className="w-fit ml-auto">
												{isExpired ? (
													<span>수강 만료</span>
												) : (
													<Link href={`${route.COURSE.ROOT}/${course.id}`}>
														Learn
														<ArrowUpRight />
													</Link>
												)}
											</Button>
										</div>
									</div>
								);
							})
						) : (
							<NoneOfDataBlock />
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
