import { Metadata } from "next";
import dynamic from "next/dynamic";
import React from "react";
import { SiteConfig } from "@/app/config";
import { AnimateLoader, Skeleton, TipList } from "@/components";

export const metadata: Metadata = {
  title: SiteConfig.title.OPEN_SOURCE,
  description: SiteConfig.description.OPEN_SOURCE,
};

const YoutubeVideo = dynamic(
  () => import("@/components/(service)/tips/YoutubeVideo"),
  {
    loading: () => (
      <div className="ui-flex-center min-h-50 bg-muted rounded-lg sm:min-h-90 md:min-h-130 lg:min-h-160">
        <AnimateLoader />
      </div>
    ),
  }
);

export default function ServiceTipsPage() {
  return (
    <section className="p-4 max-w-300">
      <h2 className="page-title">Youtube Tips</h2>
      <div className="mt-8">
        <YoutubeVideo />
        <div className="mt-8">
          <React.Suspense
            fallback={
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 10 }, (_, idx) => (
                  <Skeleton key={idx} className="h-80 w-full" />
                ))}
              </div>
            }
          >
            <TipList />
          </React.Suspense>
        </div>
      </div>
    </section>
  );
}
