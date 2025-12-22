import React from "react";
import {
  NewsList,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components";
import Loading from "../loading";

export default async function NewsPage() {
  const tabsTrigger = ["2025", "2024"];

  return (
    <section className="flex-1 p-4 min-h-0 h-screen overflow-y-auto">
      <Tabs defaultValue="2025">
        <TabsList>
          {tabsTrigger.map((tabTrigger) => (
            <TabsTrigger key={tabTrigger} value={tabTrigger}>
              {tabTrigger}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabsTrigger.map((tabTrigger) => (
          <TabsContent key={tabTrigger} value={tabTrigger}>
            <React.Suspense fallback={<Loading />}>
              <NewsList year={tabTrigger} />
            </React.Suspense>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
