"use client";

import React from "react";
import {
  AnimateLoader,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components";
import { useInfiniteScroll, useReviewList } from "@/hooks";
import { convertSupabaseDateToShortHumanReadable } from "@/lib/supabase";
import { SquarePen } from "lucide-react";

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
      <span className="absolute top-4 right-4 font-black text-2xl text-foreground">
        {totalCount}
      </span>

      <Table className="border border-muted rounded-lg">
        <TableHeader className="rounded-lg">
          <TableRow className="rounded-lg font-semibold">
            <TableHead className="w-3" />
            <TableHead className="min-w-60">Title</TableHead>
            <TableHead className="">Username</TableHead>
            <TableHead className="">Date</TableHead>
            <TableHead className="text-right">View Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="rounded-lg">
          <TableRow className="bg-orange-50 font-semibold rounded-lg">
            <TableCell className="w-3">
              <Button type="button" variant="outline" size="icon-sm">
                <SquarePen size={16} />
              </Button>
            </TableCell>
            <TableCell className="">{noticeReview.title}</TableCell>
            <TableCell className="">{noticeReview.username}</TableCell>
            <TableCell>
              {convertSupabaseDateToShortHumanReadable(noticeReview.created_at)}
            </TableCell>
            <TableCell className="text-right">
              {noticeReview.view_count}
            </TableCell>
          </TableRow>
          {reviews.map((review) => (
            <TableRow key={review.id} className="rounded-lg">
              <TableCell className="w-3 last:rounded-b-lg" />
              <TableCell className="font-medium">{review.title}</TableCell>
              <TableCell>{review.username}</TableCell>
              <TableCell>
                {convertSupabaseDateToShortHumanReadable(review.created_at)}
              </TableCell>
              <TableCell className="text-right">{review.view_count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {hasNextPage && reviews.length !== 0 && (
        <div ref={targetRef} className="ui-flex-center h-32">
          <AnimateLoader />
        </div>
      )}
      {/*{reviews.map(
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
                      <span className="py-1.5 bg-gray-100 text-sm text-center text-gray-600 font-semibold rounded-lg">
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
      )}*/}
    </>
  );
}
