import React from "react";
import {
  AddNewsContext,
  AdminNewsList,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components";
import { triggers } from "@/constants";

export default function AdminNewsPage() {
  return (
    <section className="p-4">
      <Tabs defaultValue={triggers[0]} className="gap-4">
        <div className="ui-flex-center-between">
          <TabsList>
            {triggers.map((trigger) => (
              <TabsTrigger key={trigger} value={trigger}>
                {trigger}
              </TabsTrigger>
            ))}
          </TabsList>
          <AddNewsContext />
        </div>
        <React.Suspense
          fallback={
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {Array.from({ length: 16 }, (_, idx) => (
                <Skeleton key={idx} className="h-23 w-full" />
              ))}
            </div>
          }
        >
          {triggers.map((trigger) => (
            <TabsContent key={trigger} value={trigger}>
              <AdminNewsList year={trigger} />
            </TabsContent>
          ))}
        </React.Suspense>
      </Tabs>
    </section>
  );
}
