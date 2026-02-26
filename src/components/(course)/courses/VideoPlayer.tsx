'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { LoaderCircle } from 'lucide-react';
import { Skeleton } from '@/components';
import { useCourseCurriculum } from '@/hooks';

const ReactPlayer = dynamic(() => import('react-player'), {
	ssr: false,
	loading: () => (
		<Skeleton className="w-full h-screen ui-flex-center">
			<LoaderCircle className="animate-spin" size={18} />
		</Skeleton>
	),
});

export default function VideoPlayer({ courseId, lessonId }: { courseId: string; lessonId: string }) {
	const curriculum = useCourseCurriculum({ courseId });
	const lesson = curriculum?.flatMap(chapter => chapter.lessons)?.find(lesson => lesson.id === lessonId);

	if (!lesson?.video_url) {
		return <div>No Video Available</div>;
	}

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-2">
				<h2 className="font-semibold">
					{lesson.order_index} - {lesson?.title}
				</h2>
				<p className="shrink-0 px-3 py-1.5 w-fit font-semibold text-gray-600 bg-gray-100 rounded-md">{lesson.video_duration_seconds}</p>
			</div>

			<div className="aspect-video w-full rounded-lg">
				<ReactPlayer url={lesson.video_url} playing controls width="100%" height="100%" className="rounded-lg" />
			</div>
		</div>
	);
}
