import { useSuspenseQuery } from '@tanstack/react-query';
import { queryKey, staleTime } from '@/constants';
import { getChaptersByCourseId, getLessonsByCourseId } from '@/lib/supabase';

export default function useCourseCurriculum({ courseId }: { courseId: string }) {
	const { data: curriculum } = useSuspenseQuery({
		queryKey: [...queryKey.COURSE.COURSE_CURRICULUM, ...queryKey.COURSE.LESSONS, courseId],
		queryFn: async () => {
			const [chapters, lessons] = await Promise.all([getChaptersByCourseId({ courseId }), getLessonsByCourseId({ courseId })]);
			return { chapters, lessons };
		},
		staleTime: staleTime.COURSE.ONLINE_COURSES.ALL,
		select: ({ chapters, lessons }) =>
			chapters.map(chapter => ({
				...chapter,
				lessons: lessons.filter(lesson => lesson.chapter_id === chapter.id),
			})),
	});

	return curriculum;
}
