import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { queryKey, staleTime } from '@/constants';
import { type Tip, getTipListByPage, TIP_LIST_PAGE_SIZE } from '@/lib/supabase';

export default function useTipList() {
	const { data, hasNextPage, fetchNextPage, isLoading } = useSuspenseInfiniteQuery({
		queryKey: [...queryKey.SERVICE.TIP_LIST_BY_PAGE],
		queryFn: ({ pageParam }) => getTipListByPage(pageParam, TIP_LIST_PAGE_SIZE),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			const isLastPage = lastPage.length < TIP_LIST_PAGE_SIZE;
			return isLastPage ? undefined : allPages.length + 1;
		},
		select: (data): Tip[] => data.pages.flat(),
		staleTime: staleTime.SERVICE.TIP_LIST.ALL_WITH_PAGINATION,
	});

	const hasTipList = data.length;

	return { data, hasTipList, hasNextPage, fetchNextPage, isLoading };
}
