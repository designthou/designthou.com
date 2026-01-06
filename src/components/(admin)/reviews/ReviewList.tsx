"use client";

import React from "react";
import { AnimateLoader } from "@/components";
import { useInfiniteScroll, useReviewList } from "@/hooks";
import { convertSupabaseDateToShortHumanReadable } from "@/lib/supabase";
import { cn } from "@/lib/utils";

interface ReviewListProps {
  category: "online-course" | "portfolio";
}

export default function AdminReviewList({ category }: ReviewListProps) {
  const {
    reviews,
    hasNextPage,
    fetchNextPage,
    isLoading,
    noticeReview,
    totalCount,
  } = useReviewList({ category });
  const targetRef = useInfiniteScroll<HTMLDivElement>({
    callback: fetchNextPage,
    isLoading,
    hasNextPage,
  });

  return (
    <>
      <span className="absolute top-6 right-6 font-black text-4xl">
        {totalCount}
      </span>
      <div
        className={
          "shrink-0 w-full gap-2 p-4 bg-blue-50 text-gray-800 rounded-lg"
        }
      >
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <div className="text-base font-semibold">{noticeReview?.title}</div>
          <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
            <div className="flex items-center gap-6">
              <span className="py-1.5 px-3 text-sm text-center bg-blue-200 font-semibold rounded-lg">
                {noticeReview?.username}
              </span>

              <span className="inline-block p-1.5 text-xs rounded-lg">
                {convertSupabaseDateToShortHumanReadable(
                  noticeReview?.created_at,
                )}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Views</span>{" "}
              <span className="inline-block py-1.5 px-3 font-bold rounded-md">
                {noticeReview?.view_count}
              </span>
            </div>
          </div>
        </div>
      </div>
      {reviews.map(
        ({
          id,
          title,
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
                  "shrink-0 w-full gap-2 p-4 bg-white border border-muted rounded-lg",
                  notice ? "bg-gradient-orange-100" : "",
                )}
              >
                <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
                  <div className="text-base font-semibold">{title}</div>
                  <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
                    <div className="flex items-center gap-4">
                      <span className="py-1.5 px-3 bg-gray-100 text-sm text-center text-gray-600 font-semibold rounded-lg">
                        {username}
                      </span>
                      <span className="inline-block p-1.5 text-xs text-gray-500 rounded-lg">
                        {convertSupabaseDateToShortHumanReadable(created_at)}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-2 py-1.5 px-3 w-fit bg-gray-800 text-white text-sm rounded-lg">
                      <span className="font-medium">Views</span>{" "}
                      <span className="font-bold">{view_count}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        ),
      )}
      {hasNextPage && reviews.length !== 0 && (
        <div ref={targetRef} className="ui-flex-center h-32">
          <AnimateLoader />
        </div>
      )}
    </>
  );
}
