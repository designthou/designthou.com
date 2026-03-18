import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getOfflineCourseStudentByPage, OFFLINE_COURSE_STUDENT_LIST_PAGE_SIZE } from '@/lib/supabase';
import { queryKey, staleTime } from '@/constants';

export default function useOfflineCourseStudentList() {
	const { data, hasNextPage, fetchNextPage, isLoading } = useSuspenseInfiniteQuery({
		queryKey: [...queryKey.SERVICE.OFFLINE_COURSE_STUDENTS_BY_PAGE],
		queryFn: ({ pageParam }) => getOfflineCourseStudentByPage({ pageParam, pageSize: OFFLINE_COURSE_STUDENT_LIST_PAGE_SIZE }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			const isLastPage = lastPage.length < OFFLINE_COURSE_STUDENT_LIST_PAGE_SIZE;
			return isLastPage ? undefined : allPages.length + 1;
		},
		select: data => {
			return data.pages.flat();
		},
		staleTime: staleTime.SERVICE.OFFLINE_COURSE_STUDENT_LIST.ALL_WITH_PAGINATION,
	});

	const hasOfflineCourseStudentList = data?.length !== 0;

	return {
		newsList: data,
		hasOfflineCourseStudentList,
		hasNextPage,
		fetchNextPage,
		isLoading,
	};
}
