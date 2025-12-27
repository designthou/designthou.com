import { queryKey, staleTime } from "@/constants";
import useGetPaginationInfo from "./useGetPaginationInfo";
import {
  getNoticeReview,
  getReviewListByPage,
  getReviewListPageInfo,
  getReviewsTotalCount,
  REVIEW_LIST_PAGE_SIZE,
} from "@/lib/supabase";
import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Review } from "@/lib/supabase/schema";

export default function useReviewList({ category }: { category: string }) {
  const { calculatedTotalPage } = useGetPaginationInfo({
    queryKey: queryKey.SERVICE.REVIEW_LIST_PAGE_INFO,
    queryFn: getReviewListPageInfo,
    staleTime: staleTime.SERVICE.REVIEW_LIST.PAGE_INFO,
    pageSize: REVIEW_LIST_PAGE_SIZE,
  });
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

  const { data, hasNextPage, fetchNextPage, isLoading } =
    useSuspenseInfiniteQuery({
      queryKey: [...queryKey.SERVICE.REVIEW_LIST_BY_PAGE, category],
      queryFn: ({ pageParam }) =>
        getReviewListByPage(pageParam, REVIEW_LIST_PAGE_SIZE, category),
      initialPageParam: 1,
      getNextPageParam: (lastPage, __, lastPageParam) => {
        const currentPageSize = lastPage?.length ?? 0;

        if (currentPageSize && lastPageParam < calculatedTotalPage) {
          return lastPageParam + 1;
        }

        return undefined;
      },
      select: (data): Review[] =>
        data.pages
          .flat()
          ?.filter((review) => !review.title.includes("Re") && !review.notice),
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
