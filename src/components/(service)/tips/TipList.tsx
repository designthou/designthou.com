"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkle } from "lucide-react";
import { AnimateLoader, Wip } from "@/components";
import { useInfiniteScroll, useTipList } from "@/hooks";
import { convertSupabaseDateToShortHumanReadable } from "@/lib/supabase";
import { generateGradient } from "@/utils/seedGradient";

export default function TipList() {
  const { data, hasTipList, hasNextPage, fetchNextPage, isLoading } =
    useTipList();

  const targetRef = useInfiniteScroll<HTMLDivElement>({
    callback: fetchNextPage,
    isLoading,
    hasNextPage,
  });

  return (
    <>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {!hasTipList && (
          <Wip icon={<Sparkle size={18} />} message={`Empty Data`} />
        )}
        {data?.map(({ id, title, imgSrc, url, category, created_at }) => (
          <li
            key={id}
            className="flex items-center bg-light border border-muted rounded-lg"
          >
            <Link
              href={`/tips/${id}`}
              className="flex flex-col justify-between gap-4 p-3 w-full h-full rounded-lg"
            >
              {imgSrc ? (
                <Image
                  src={imgSrc}
                  alt={title}
                  width={500}
                  height={300}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOsqQcAAX0A/RBYaRQAAAAASUVORK5CYII="
                  className="aspect-[5/2.8] object-cover"
                />
              ) : (
                <div
                  className="aspect-4/3 p-4 min-w-[50px] max-h-[50px] rounded-full sm:min-w-[100px] sm:max-h-none sm:rounded-lg"
                  style={{ background: generateGradient(url) }}
                />
              )}
              <div className="flex flex-col justify-between gap-4 w-full h-full">
                <div className="text-base font-bold sm:text-lg">{title}</div>
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
      {hasNextPage && hasTipList && (
        <div ref={targetRef} className="ui-flex-center h-32">
          <AnimateLoader />
        </div>
      )}
    </>
  );
}
