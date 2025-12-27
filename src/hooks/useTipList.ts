import { queryKey, staleTime } from "@/constants";
import useGetPaginationInfo from "./useGetPaginationInfo";
import {
  getTipListByPage,
  getTipListPageInfo,
  TIP_LIST_PAGE_SIZE,
} from "@/lib/supabase";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Tip } from "@/lib/supabase/schema";

export default function useTipList() {
  const { calculatedTotalPage } = useGetPaginationInfo({
    queryKey: queryKey.SERVICE.TIP_LIST_PAGE_INFO,
    queryFn: getTipListPageInfo,
    staleTime: staleTime.SERVICE.TIP_LIST.PAGE_INFO,
    pageSize: TIP_LIST_PAGE_SIZE,
  });

  const { data, hasNextPage, fetchNextPage, isLoading } =
    useSuspenseInfiniteQuery({
      queryKey: [...queryKey.SERVICE.TIP_LIST_BY_PAGE],
      queryFn: ({ pageParam }) =>
        getTipListByPage(pageParam, TIP_LIST_PAGE_SIZE),
      initialPageParam: 1,
      getNextPageParam: (lastPage, __, lastPageParam) => {
        const currentPageSize = lastPage?.length ?? 0;

        if (currentPageSize && lastPageParam < calculatedTotalPage) {
          return lastPageParam + 1;
        }

        return undefined; // explicit return
      },
      select: (data): Tip[] => data.pages.flat(),
      staleTime: staleTime.SERVICE.TIP_LIST.ALL_WITH_PAGINATION,
    });

  const hasTipList = data.length;

  return { data, hasTipList, hasNextPage, fetchNextPage, isLoading };
}
