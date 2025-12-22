"use client";

import Link from "next/link";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useGetPaginationInfo, useInfiniteScroll } from "@/hooks";
import { AnimateLoader, Wip } from "@/components";
import { queryKey, staleTime } from "@/constants";
import {
  NEWS_LIST_PAGE_SIZE,
  convertSupabaseDateToShortHumanReadable,
  getNewsListByPage,
  getNewsListPageInfo,
} from "@/lib/supabase";
import { Sparkle } from "lucide-react";

interface NewsListProps {
  value: string;
}

export default function NewsList({ value }: NewsListProps) {
  const { calculatedTotalPage } = useGetPaginationInfo({
    queryKey: queryKey.ADMIN.NEWS_LIST_PAGE_INFO,
    queryFn: getNewsListPageInfo,
    staleTime: staleTime.ADMIN.NEWS_LIST.PAGE_INFO,
    pageSize: NEWS_LIST_PAGE_SIZE,
  });

  const { data, hasNextPage, fetchNextPage, isLoading } =
    useSuspenseInfiniteQuery({
      queryKey: queryKey.ADMIN.NEWS_LIST_BY_PAGE,
      queryFn: ({ pageParam }) =>
        getNewsListByPage(pageParam, NEWS_LIST_PAGE_SIZE),
      initialPageParam: 1,
      getNextPageParam: (lastPage, __, lastPageParam) => {
        const currentPageSize = lastPage?.length ?? 0;

        if (currentPageSize && lastPageParam < calculatedTotalPage) {
          return lastPageParam + 1;
        }

        return undefined; // explicit return
      },
      staleTime: staleTime.ADMIN.NEWS_LIST.ALL_WITH_PAGINATION,
    });

  const targetRef = useInfiniteScroll<HTMLDivElement>({
    callback: fetchNextPage,
    isLoading,
    hasNextPage,
  });

  const news = data.pages
    .flat()
    .filter(
      ({ created_at }) => `${new Date(created_at).getFullYear()}` === value,
    );

  return (
    <>
      {" "}
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {news?.length === 0 && (
          <Wip
            icon={<Sparkle size={18} />}
            message={`Empty Data on ${value} year`}
          />
        )}
        {news?.map((article) => (
          <li
            key={article.id}
            className="flex items-center bg-light border border-muted rounded-lg"
          >
            <Link
              href={article.url}
              target="_blank"
              className="p-3 w-full h-full"
            >
              <div className="font-bold">{article.title}</div>
              <div>
                {convertSupabaseDateToShortHumanReadable(article.created_at)}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {hasNextPage && (
        <div ref={targetRef} className="ui-flex-center h-32">
          <AnimateLoader />
        </div>
      )}
    </>
  );
}
