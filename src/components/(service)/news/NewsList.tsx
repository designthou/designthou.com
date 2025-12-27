"use client";

import Link from "next/link";
import { Sparkle } from "lucide-react";
import { AnimateLoader, Wip } from "@/components";
import { useInfiniteScroll, useNewsList } from "@/hooks";
import { convertSupabaseDateToShortHumanReadable } from "@/lib/supabase";
import { generateGradient } from "@/utils/seedGradient";

interface NewsListProps {
  year: string;
}

export default function NewsList({ year }: NewsListProps) {
  const { newsList, hasNewsList, hasNextPage, fetchNextPage, isLoading } =
    useNewsList({ target: "service", year });

  const targetRef = useInfiniteScroll<HTMLDivElement>({
    callback: fetchNextPage,
    isLoading,
    hasNextPage,
  });

  return (
    <>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {!hasNewsList && (
          <Wip
            icon={<Sparkle size={18} />}
            message={`Empty Data on ${year} year`}
          />
        )}
        {newsList?.map(({ id, url, title, category, created_at }) => (
          <li
            key={id}
            className="flex items-center bg-light border border-muted rounded-lg"
          >
            <Link
              href={id}
              target="_blank"
              className="flex justify-between gap-4 p-3 w-full h-full"
            >
              <div className="flex flex-col justify-between gap-4 w-full h-full">
                <div className="font-bold">{title}</div>
                <div className="ui-flex-center-between">
                  <span className="text-gray-700 text-xs sm:text-sm">
                    {convertSupabaseDateToShortHumanReadable(created_at)}
                  </span>
                  <span className="px-2 py-1 text-gray-700 text-xs font-semibold border border-full border-gray-300 rounded-lg sm:text-sm">
                    {category}
                  </span>
                </div>
              </div>
              <div className="flex justify-center h-full">
                <div
                  className="p-4 w-[50px] h-[50px] rounded-full sm:w-[100px] sm:h-[100px] sm:rounded-xl"
                  style={{ background: generateGradient(url) }}
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {hasNextPage && hasNewsList && (
        <div ref={targetRef} className="ui-flex-center h-32">
          <AnimateLoader />
        </div>
      )}
    </>
  );
}
