import { VideoPlayer } from '@/components';

export default async function LessonPage({
	params,
}: Readonly<{
	params: Promise<{ courseId: string; lessonId: string }>;
}>) {
	const { courseId, lessonId } = await params;

	return (
		<div>
			<VideoPlayer courseId={courseId} lessonId={lessonId} />
		</div>
	);
}
