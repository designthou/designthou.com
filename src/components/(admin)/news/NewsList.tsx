"use client";

import Link from "next/link";
import { Edit, Sparkle, X } from "lucide-react";
import { AnimateLoader, Button, Wip } from "@/components";
import { useInfiniteScroll, useNewsList } from "@/hooks";
import { convertSupabaseDateToShortHumanReadable } from "@/lib/supabase";

interface NewsListProps {
  year: string;
}

export default function NewsList({ year }: NewsListProps) {
  const { newsList, hasNewsList, hasNextPage, fetchNextPage, isLoading } =
    useNewsList({ target: "admin", year });

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
        {newsList?.map(({ id, title, url, category, created_at }) => (
          <li
            key={id}
            className="flex items-center bg-light border border-muted rounded-lg"
          >
            <Link
              href={url}
              target="_blank"
              className="flex flex-col gap-4 p-3 w-full h-full"
            >
              <div className="flex flex-col justify-between gap-4 w-full h-full">
                <div className="flex justify-between gap-4">
                  <div className="font-bold">{title}</div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" size="icon-sm" variant="ghost">
                      <Edit size={21} />
                    </Button>
                    <Button type="button" size="icon-sm" variant="ghost">
                      <X size={21} />
                    </Button>
                  </div>
                </div>
                <div className="ui-flex-center-between">
                  <span className="text-gray-700 text-xs sm:text-sm">
                    {convertSupabaseDateToShortHumanReadable(created_at)}
                  </span>
                  <span className="px-2 py-1 text-gray-700 text-xs font-semibold border border-full border-gray-300 rounded-lg sm:text-sm">
                    {category}
                  </span>
                </div>
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
