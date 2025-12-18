import Link from "next/link";
import React from "react";
import { Sparkle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { convertSupabaseDateToShortHumanReadable } from "@/lib/supabase/convertSupabaseDateToHumanReadable";
import { Tabs, TabsContent, TabsList, TabsTrigger, Wip } from "@/components";

export default async function NewsPage() {
  const supabase = await createClient();

  const { data: news } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <section className="flex-1 p-4 min-h-0 h-screen overflow-y-auto">
      <Tabs defaultValue="2025">
        <TabsList>
          <TabsTrigger value="2025">2025</TabsTrigger>
          <TabsTrigger value="2024">2024</TabsTrigger>
        </TabsList>
        <TabsContent value={"2025"}>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {news?.map((article) => (
              <li
                key={article.id}
                className="flex items-center bg-light border border-muted rounded-lg"
              >
                <Link
                  href={article.url}
                  target="_blank"
                  className="p-3 w-full h-full"
                >
                  <div className="font-bold">{article.title}</div>
                  <div>
                    {convertSupabaseDateToShortHumanReadable(
                      article.created_at
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value={"2024"}>
          <Wip
            icon={<Sparkle size={18} />}
            message={"2024년 데이터가 없습니다"}
            className="justify-center h-[50dvh] rounded-xl"
          />
        </TabsContent>
      </Tabs>
    </section>
  );
}
