import { useSuspenseQuery } from '@tanstack/react-query';
import { getOfflineCourseStudentByPage, OFFLINE_COURSE_STUDENT_LIST_PAGE_SIZE } from '@/lib/supabase';
import { queryKey, staleTime } from '@/constants';
import { mapOfflineCourseStudentRowToView, OfflineCourseStudentView } from '@/types';

export default function useOfflineCourseStudentList(page: number) {
	const { data, isLoading } = useSuspenseQuery({
		queryKey: [...queryKey.SERVICE.OFFLINE_COURSE_STUDENTS, page],
		queryFn: async () => {
			const response = await fetch(`/api/offline-students?page=${page}`);
			if (!response.ok) throw new Error('Failed to fetch');

			return response.json();
		},
		staleTime: staleTime.SERVICE.OFFLINE_COURSE_STUDENT_LIST.ALL_WITH_PAGINATION,
	});

	return {
		data: data ?? [],
		isLoading,
	};
}
