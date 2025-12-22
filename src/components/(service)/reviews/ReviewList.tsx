"use client";

import React from "react";
import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { AnimateLoader } from "@/components";
import { useGetPaginationInfo, useInfiniteScroll } from "@/hooks";
import {
  convertSupabaseDateToShortHumanReadable,
  getAllReviewList,
  getNoticeReview,
  getReviewListByPage,
  getReviewListPageInfo,
  REVIEW_LIST_PAGE_SIZE,
} from "@/lib/supabase";
import { cn } from "@/lib/utils";
import sanitizeHtml from "@/utils/sanitizeHtml";
import { queryKey, staleTime } from "@/constants";

interface ReviewListProps {
  category: "online-course" | "portfolio";
}

export default function ReviewList({ category }: ReviewListProps) {
  const { calculatedTotalPage } = useGetPaginationInfo({
    queryKey: queryKey.SERVICE.REVIEW_LIST_PAGE_INFO,
    queryFn: getReviewListPageInfo,
    staleTime: staleTime.SERVICE.REVIEW_LIST.PAGE_INFO,
    pageSize: REVIEW_LIST_PAGE_SIZE,
  });

  const {
    data: { totalCount },
  } = useSuspenseQuery({
    queryKey: queryKey.SERVICE.REVIEW_TOTAL_COUNT,
    queryFn: getAllReviewList,
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

        return undefined; // explicit return
      },
      staleTime: staleTime.SERVICE.REVIEW_LIST.ALL_WITH_PAGINATION,
    });

  const targetRef = useInfiniteScroll<HTMLDivElement>({
    callback: fetchNextPage,
    isLoading,
    hasNextPage,
  });

  const reviews = data.pages
    .flat()
    ?.filter((review) => !review.title.includes("Re") && !review.notice);

  return (
    <>
      <span className="absolute top-6 right-6 font-black text-4xl">
        {totalCount}
      </span>
      <div
        className={
          "flex flex-col shrink-0 w-full gap-4 p-4 bg-blue-50 text-gray-800 rounded-lg"
        }
      >
        <div className="text-base font-semibold sm:text-lg">
          {noticeReview?.title}
        </div>

        <div
          className="text-sm sm:text-[15px]"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(noticeReview?.content),
          }}
        />

        <div className="flex items-center gap-2">
          <span className="font-medium">Views</span>{" "}
          <span className="inline-block py-1.5 px-3 font-bold rounded-md">
            {noticeReview?.view_count}
          </span>
        </div>

        <div className="flex gap-6">
          <div className="w-12 h-12 rounded-full bg-gradient-indigo-gray-100" />
          <div className="flex flex-col gap-1">
            <span className="py-1.5 px-3 text-sm text-center bg-blue-200 font-semibold rounded-lg">
              {noticeReview?.username}
            </span>

            <span className="inline-block p-1.5 text-xs rounded-lg">
              {convertSupabaseDateToShortHumanReadable(
                noticeReview?.created_at,
              )}
            </span>
          </div>
        </div>
      </div>
      {reviews.map(
        ({
          id,
          title,
          content,
          view_count,
          created_at,
          is_secret,
          notice,
          username,
        }) => (
          <React.Fragment key={id}>
            {!is_secret && (
              <div
                className={cn(
                  "flex flex-col justify-between shrink-0 w-full gap-6 p-4 bg-white rounded-lg",
                  notice ? "bg-gradient-orange-100" : "",
                )}
              >
                <div className="flex flex-col gap-4">
                  <div className="text-base font-semibold sm:text-lg">
                    {title}
                  </div>

                  <div
                    className="text-sm sm:text-[15px]"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(content),
                    }}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <div className="inline-flex items-center gap-2 py-1.5 px-3 w-fit bg-black text-white text-sm rounded-lg">
                    <span className="font-medium">Views</span>{" "}
                    <span className="font-bold">{view_count}</span>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-orange-100" />
                    <div className="flex flex-col gap-1">
                      <span className="py-1.5 px-3 bg-gray-100 text-sm text-center text-gray-600 font-semibold rounded-lg">
                        {username}
                      </span>
                      <span className="inline-block p-1.5 text-xs text-gray-500 rounded-lg">
                        {convertSupabaseDateToShortHumanReadable(created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        ),
      )}
      {hasNextPage && (
        <div ref={targetRef} className="ui-flex-center h-32">
          <AnimateLoader />
        </div>
      )}
    </>
  );
}
