import React from "react";

import {
  AdminReviewList,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components";

export default function AdminReviewsPage() {
  const tabsTrigger = ["online-course", "portfolio"] as const;

  return (
    <section className="relative flex-1 p-4">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold hidden" aria-label="Review Page Title">
          Reviews
        </h2>
      </div>
      <Tabs defaultValue="online-course">
        <TabsList>
          {tabsTrigger.map((tabTrigger) => (
            <TabsTrigger key={tabTrigger} value={tabTrigger}>
              {tabTrigger}
            </TabsTrigger>
          ))}
        </TabsList>
        <React.Suspense
          fallback={
            <div className="grid grid-cols-1 gap-1">
              {Array.from({ length: 20 }, (_, idx) => (
                <Skeleton key={idx} className="w-full h-9" />
              ))}
            </div>
          }
        >
          {tabsTrigger.map((tab, idx) => (
            <TabsContent
              key={idx}
              value={tab}
              className="grid grid-cols-1 items-start gap-3 w-full"
            >
              <AdminReviewList category={tab} />
            </TabsContent>
          ))}
        </React.Suspense>
      </Tabs>
    </section>
  );
}
