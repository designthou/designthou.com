import { useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';
import { queryKey, staleTime } from '@/constants';
import { type Review, getNoticeReview, getReviewListByPage, getReviewsTotalCount, REVIEW_LIST_PAGE_SIZE } from '@/lib/supabase';

export default function useReviewList({ category }: { category: string }) {
	const { data: totalCount } = useSuspenseQuery({
		queryKey: queryKey.SERVICE.REVIEW_TOTAL_COUNT,
		queryFn: getReviewsTotalCount,
		staleTime: staleTime.SERVICE.REVIEW_LIST.TOTAL_COUNT,
	});

	const { data: noticeReview } = useSuspenseQuery({
		queryKey: queryKey.SERVICE.NOTICE_REVIEW,
		queryFn: getNoticeReview,
		staleTime: staleTime.SERVICE.REVIEW_LIST.NOTICE,
	});

	const { data, hasNextPage, fetchNextPage, isLoading } = useSuspenseInfiniteQuery({
		queryKey: [...queryKey.SERVICE.REVIEW_LIST_BY_PAGE, category],
		queryFn: ({ pageParam }) => getReviewListByPage(pageParam, REVIEW_LIST_PAGE_SIZE, category),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			const isLastPage = lastPage.length < REVIEW_LIST_PAGE_SIZE;
			return isLastPage ? undefined : allPages.length + 1;
		},
		select: (data): Review[] => data.pages.flat()?.filter(review => !review.title.includes('Re') && !review.notice),
		staleTime: staleTime.SERVICE.REVIEW_LIST.ALL_WITH_PAGINATION,
	});

	return {
		noticeReview,
		totalCount,
		reviews: data,
		hasNextPage,
		fetchNextPage,
		isLoading,
	};
}
