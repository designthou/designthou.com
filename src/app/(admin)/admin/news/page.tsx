import React from "react";
import {
  AdminNewsList,
  Button,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components";
import { triggers } from "@/constants";
import { Plus } from "lucide-react";

export default async function NewsPage() {
  return (
    <section className="flex-1 p-4 min-h-0 h-screen overflow-y-auto">
      <Tabs defaultValue={triggers[0]}>
        <div className="ui-flex-center-between">
          <TabsList>
            {triggers.map((trigger) => (
              <TabsTrigger key={trigger} value={trigger}>
                {trigger}
              </TabsTrigger>
            ))}
          </TabsList>
          <Button type="button" size="lg">
            <Plus size={18} />
            Add News
          </Button>
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
