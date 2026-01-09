import { Metadata } from "next";
import React from "react";
import { SiteConfig } from "@/app/config";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ReviewList,
  Skeleton,
  AddReviewContext,
} from "@/components";

export const metadata: Metadata = {
  title: SiteConfig.title.REVIEWS,
  description: SiteConfig.description.REVIEWS,
  openGraph: {
    title: SiteConfig.title.REVIEWS,
    description: SiteConfig.title.REVIEWS,
    images: [
      {
        url: `${SiteConfig.url}/og/static`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function ReviewListPage() {
  const tabsTrigger = ["online-course", "portfolio"] as const;

  return (
    <section className="p-4 bg-light rounded-lg">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">Reviews</h2>
        <AddReviewContext />
      </div>
      <Tabs defaultValue="online-course" className="">
        <TabsList>
          {tabsTrigger.map((tabTrigger) => (
            <TabsTrigger key={tabTrigger} value={tabTrigger}>
              {tabTrigger}
            </TabsTrigger>
          ))}
        </TabsList>
        <React.Suspense
          fallback={
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 10 }, (_, idx) => (
                <Skeleton key={idx} className="h-120 w-full" />
              ))}
            </div>
          }
        >
          {tabsTrigger.map((tab, idx) => (
            <TabsContent
              key={idx}
              value={tab}
              className="grid grid-cols-1 items-start gap-4 w-full sm:grid-cols-2 lg:grid-cols-3"
            >
              <ReviewList category={tab} />
            </TabsContent>
          ))}
        </React.Suspense>
      </Tabs>
    </section>
  );
}
