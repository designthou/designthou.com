'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { useCourseCurriculum } from '@/hooks';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function VideoPlayer({ courseId, lessonId }: { courseId: string; lessonId: string }) {
	const curriculum = useCourseCurriculum({ courseId });
	const lesson = curriculum?.flatMap(chapter => chapter.lessons)?.find(lesson => lesson.id === lessonId);

	if (!lesson?.video_url) {
		return <div>No Video Available</div>;
	}

	return (
		<div className="aspect-video w-full">
			<ReactPlayer url={lesson.video_url} playing controls width="100%" height="100%" />
		</div>
	);
}
