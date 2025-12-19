import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components";
import { convertSupabaseDateToShortHumanReadable } from "@/lib/supabase/convertSupabaseDateToHumanReadable";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import sanitizeHtml from "@/utils/sanitizeHtml";

export default async function ReviewsPage() {
  const supabase = await createClient();

  const { data: reviews } = await supabase
    .from("online_course_reviews")
    .select("*")
    .order("created_at", { ascending: false });

  const noticeReview = reviews?.find((review) => review.notice);

  return (
    <section className="p-4 bg-light rounded-lg">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">Reviews</h2>
        <span className="font-black font-mono text-2xl">{reviews?.length}</span>
      </div>
      <Tabs defaultValue="online-course" className="mt-3">
        <TabsList>
          <TabsTrigger value="online-course">Online Course</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
        </TabsList>
        {["online-course", "portfolio"].map((tab, idx) => (
          <TabsContent
            key={idx}
            value={tab}
            className="grid grid-cols-1 gap-3 items-start sm:grid-cols-3"
          >
            {
              <div
                className={
                  "flex flex-col shrink-0 w-full gap-4 p-4 bg-blue-50 text-gray-800 border border-gray-100 rounded-xl shadow-md"
                }
              >
                <div className="text-base font-semibold sm:text-lg">
                  {noticeReview?.title}
                </div>

                <div
                  className="text-sm max-w-[300px] md:text-base"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(noticeReview?.content),
                  }}
                />

                <div className="flex items-center gap-2">
                  <span className="font-medium">Views</span>{" "}
                  <span className="inline-block py-1.5 px-3 font-bold rounded-md">
                    {noticeReview?.view_count}
                  </span>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-indigo-gray-100" />
                  <div className="flex flex-col gap-1">
                    <span className="py-1.5 px-3 text-sm text-center bg-blue-200 font-semibold rounded-lg">
                      {noticeReview?.username}
                    </span>

                    <span className="inline-block p-1.5 text-xs rounded-lg">
                      {convertSupabaseDateToShortHumanReadable(
                        noticeReview?.created_at,
                      )}
                    </span>
                  </div>
                </div>
              </div>
            }
            {reviews
              ?.filter((review) => !review.title.includes("Re"))
              ?.filter((review) => review.category === tab && !review.notice)
              .sort((prev, curr) => curr.view_count - prev.view_count)
              .map(
                ({
                  id,
                  title,
                  content,
                  view_count,
                  created_at,
                  is_secret,
                  notice,
                  username,
                }) => (
                  <React.Fragment key={id}>
                    {!is_secret && (
                      <div
                        className={cn(
                          "flex flex-col shrink-0 w-full gap-4 p-4 bg-white border border-gray-100 rounded-xl",
                          notice ? "bg-gradient-orange-100" : "",
                        )}
                      >
                        <div className="text-base font-semibold sm:text-lg">
                          {title}
                        </div>

                        {!is_secret && (
                          <div
                            className="text-sm max-w-[300px] md:text-base"
                            dangerouslySetInnerHTML={{
                              __html: sanitizeHtml(content),
                            }}
                          />
                        )}
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Views</span>{" "}
                          <span className="inline-block py-1.5 px-3 font-bold rounded-md">
                            {view_count}
                          </span>
                        </div>
                        {!is_secret && (
                          <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-orange-100" />
                            <div className="flex flex-col gap-1">
                              <span className="py-1.5 px-3 bg-gray-100 text-sm text-center text-gray-600 font-semibold rounded-lg">
                                {username}
                              </span>
                              <span className="inline-block p-1.5 text-xs text-gray-500 rounded-lg">
                                {convertSupabaseDateToShortHumanReadable(
                                  created_at,
                                )}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </React.Fragment>
                ),
              )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
