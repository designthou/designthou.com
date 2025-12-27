"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKey, staleTime } from "@/constants";
import {
  convertSupabaseDateToShortHumanReadable,
  getPortfolioReviewList,
} from "@/lib/supabase";
import { generateGradient } from "@/utils/seedGradient";

export default function HomeReviewList() {
  const { data } = useSuspenseQuery({
    queryKey: queryKey.SERVICE.PORTFOLIO_REVIEWS,
    queryFn: getPortfolioReviewList,
    staleTime: staleTime.SERVICE.REVIEW_LIST.PORTFOLIO,
  });

  return (
    <div className="flex gap-4 w-full overflow-x-auto scrollbar-thin ">
      {data.map(({ title, content, username, created_at }, idx) => (
        <div
          key={idx}
          className="flex flex-col justify-between gap-4 p-4 min-h-90 min-w-[300px] border border-muted rounded-lg sm:min-w-[350px]"
        >
          <div className="text-base font-bold">{title}</div>
          <p
            className="max-w-[300px] line-clamp-8 text-sm"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className="flex gap-4">
            <div
              className="w-12 h-12 rounded-full"
              style={{ background: generateGradient(content) }}
            />
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
      ))}
    </div>
  );
}
