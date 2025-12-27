import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import {
  getNewsListByPage,
  getNewsListPageInfo,
  NEWS_LIST_PAGE_SIZE,
} from "@/lib/supabase";
import { queryKey, staleTime } from "@/constants";
import { useGetPaginationInfo } from ".";

export default function useNewsList({
  target,
  year,
}: {
  target: "service" | "admin";
  year: string;
}) {
  const { calculatedTotalPage } = useGetPaginationInfo({
    queryKey:
      queryKey[target === "service" ? "SERVICE" : "ADMIN"].NEWS_LIST_PAGE_INFO,
    queryFn: getNewsListPageInfo,
    staleTime:
      staleTime[target === "service" ? "SERVICE" : "ADMIN"].NEWS_LIST.PAGE_INFO,
    pageSize: NEWS_LIST_PAGE_SIZE,
  });

  const { data, hasNextPage, fetchNextPage, isLoading } =
    useSuspenseInfiniteQuery({
      queryKey: [...queryKey.ADMIN.NEWS_LIST_BY_PAGE, year],
      queryFn: ({ pageParam }) =>
        getNewsListByPage({ pageParam, pageSize: NEWS_LIST_PAGE_SIZE, year }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, __, lastPageParam) => {
        const currentPageSize = lastPage?.length ?? 0;

        if (currentPageSize && lastPageParam < calculatedTotalPage) {
          return lastPageParam + 1;
        }

        return undefined; // explicit return
      },
      select: (data) => {
        return data.pages.flat();
      },
      staleTime: staleTime.ADMIN.NEWS_LIST.ALL_WITH_PAGINATION,
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
