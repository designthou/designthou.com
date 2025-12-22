import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ReviewList,
  Skeleton,
} from "@/components";

export default async function ReviewListPage() {
  const tabsTrigger = ["online-course", "portfolio"] as const;

  return (
    <section className="relative p-4 bg-light rounded-lg">
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
