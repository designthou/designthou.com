"use client";

import Link from "next/link";
import { MotionBlock } from "@/components";
import { News } from "@/lib/supabase/schema";
import { convertSupabaseDateToShortHumanReadable } from "@/lib/supabase";
import { generateGradient } from "@/utils/seedGradient";

export default function HomeNewsList({ newsList }: { newsList: News[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {newsList?.map(({ id, title, url, category, created_at }) => (
        <MotionBlock key={id}>
          <Link
            href={url}
            target="_blank"
            rel="noopenner noreferrer"
            className="flex justify-between gap-4 p-4 w-full h-full bg-light border border-muted rounded-lg"
          >
            <div className="flex flex-col justify-between gap-4 w-full">
              <p className="font-semibold sm:text-base">{title}</p>
              <div className="ui-flex-center-between gap-4 w-full">
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
        </MotionBlock>
      ))}
    </div>
  );
}
