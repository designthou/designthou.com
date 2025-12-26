import { Metadata } from "next";
import React from "react";
import {
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ServiceNewsList,
} from "@/components";
import { SiteConfig } from "@/app/config";
import { triggers } from "@/constants";

export const metadata: Metadata = {
  title: SiteConfig.title.NEWS,
  description: SiteConfig.description.NEWS,
};

export default function ServiceNewsPage() {
  return (
    <section className="p-4 max-w-300">
      <h2 className="page-title">News</h2>
      <div className="relative grid grid-cols-50 gap-0 mt-4 w-full rounded-lg sm:grid-cols-100">
        {Array.from({ length: 1200 }, (_, idx) => (
          <div
            key={idx}
            className="w-3 h-3 border border-gray-300 rounded-md"
          />
        ))}
        <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full text-center outlined-text font-bold text-2xl sm:text-4xl lg:text-6xl">
          Meet our selected news
        </p>
      </div>
      <div className="mt-8">
        <Tabs defaultValue={triggers[0]}>
          <TabsList>
            {triggers.map((trigger) => (
              <TabsTrigger key={trigger} value={trigger}>
                {trigger}
              </TabsTrigger>
            ))}
          </TabsList>

          <React.Suspense
            fallback={
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {Array.from({ length: 12 }, (_, idx) => (
                  <Skeleton key={idx} className="h-23 w-full" />
                ))}
              </div>
            }
          >
            {triggers.map((trigger) => (
              <TabsContent key={trigger} value={trigger}>
                <ServiceNewsList year={trigger} />
              </TabsContent>
            ))}
          </React.Suspense>
        </Tabs>
      </div>
    </section>
  );
}
