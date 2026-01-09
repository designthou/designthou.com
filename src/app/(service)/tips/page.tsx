import { Metadata } from "next";
import dynamic from "next/dynamic";
import React from "react";
import { SiteConfig } from "@/app/config";
import { AnimateLoader, Skeleton, TipList } from "@/components";

export const metadata: Metadata = {
  title: SiteConfig.title.TIPS,
  description: SiteConfig.description.TIPS,
  openGraph: {
    title: SiteConfig.title.TIPS,
    description: SiteConfig.title.TIPS,
    images: [
      {
        url: `${SiteConfig.url}/og/tips`,
        width: 1200,
        height: 630,
      },
    ],
  },
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
      <div className="flex flex-col justify-center gap-4 py-8 px-4 w-full text-center bg-light rounded-lg border border-muted">
        <h2 className="page-title">Youtube Tips</h2>
        <p className="text-center outlined-text font-bold text-lg sm:text-xl lg:text-2xl">
          Meet our beneficial work tips
        </p>
      </div>
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
