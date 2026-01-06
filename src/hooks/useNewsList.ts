import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getNewsListByPage, NEWS_LIST_PAGE_SIZE } from "@/lib/supabase";
import { queryKey, staleTime } from "@/constants";

export default function useNewsList({ year }: { year: string }) {
  const { data, hasNextPage, fetchNextPage, isLoading } =
    useSuspenseInfiniteQuery({
      queryKey: [...queryKey.SERVICE.NEWS_LIST_BY_PAGE, year],
      queryFn: ({ pageParam }) =>
        getNewsListByPage({ pageParam, pageSize: NEWS_LIST_PAGE_SIZE, year }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const isLastPage = lastPage.length < NEWS_LIST_PAGE_SIZE;
        return isLastPage ? undefined : allPages.length + 1;
      },
      select: (data) => {
        return data.pages.flat();
      },
      staleTime: staleTime.SERVICE.NEWS_LIST.ALL_WITH_PAGINATION,
    });

  const hasNewsList = data?.length !== 0;

  return {
    newsList: data,
    hasNewsList,
    hasNextPage,
    fetchNextPage,
    isLoading,
  };
}
