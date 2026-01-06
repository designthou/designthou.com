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
    <section className="flex-1 p-4 h-screen overflow-y-auto">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">Reviews</h2>
      </div>
      <Tabs defaultValue="online-course" className="mt-3">
        <TabsList>
          {tabsTrigger.map((tabTrigger) => (
            <TabsTrigger key={tabTrigger} value={tabTrigger}>
              {tabTrigger}
            </TabsTrigger>
          ))}
        </TabsList>
        <React.Suspense
          fallback={
            <div className="grid grid-cols-1 gap-3">
              {Array.from({ length: 10 }, (_, idx) => (
                <Skeleton key={idx} className="h-39 w-full sm:h-16" />
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
