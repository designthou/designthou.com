import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components";
import { convertSupabaseDateToShortHumanReadable } from "@/lib/supabase/convertSupabaseDateToHumanReadable";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import sanitizeHtml from "@/utils/sanitizeHtml";
import React from "react";

export default async function ReviewsPage() {
  const supabase = await createClient();

  const { data: reviews } = await supabase
    .from("online_course_reviews")
    .select("*")
    .order("created_at", { ascending: false });
  console.log(reviews);

  const noticeReview = reviews?.find((review) => review.notice);

  return (
    <section className="p-4 bg-light rounded-lg">
      <h2 className="text-lg font-bold">Reviews</h2>
      <Tabs defaultValue="online-course">
        <TabsList>
          <TabsTrigger value="online-course">Online Course</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
        </TabsList>
        {["online-course", "portfolio"].map((tab, idx) => (
          <TabsContent
            key={idx}
            value={tab}
            className="grid grid-cols-1 gap-3  items-start sm:grid-cols-3"
          >
            {
              <div
                className={cn(
                  "flex flex-col shrink-0 w-full gap-4 p-4 border border-gray-100 bg-gradient-gray-100 rounded-xl",
                )}
              >
                <div className="font-semibold text-lg">
                  {noticeReview.title}
                </div>

                <div
                  className="max-w-[300px]"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(noticeReview.content),
                  }}
                />

                <div className="flex items-center gap-2">
                  <span className="font-medium">Views</span>{" "}
                  <span className="inline-block py-1.5 px-3 font-bold rounded-md">
                    {noticeReview.view_count}
                  </span>
                </div>

                <div className="flex gap-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-indigo-gray-100" />
                  <div className="flex flex-col gap-3">
                    <div>
                      <span className="py-1.5 px-3 text-sm font-semibold rounded-lg">
                        {noticeReview.username}
                      </span>{" "}
                      님
                    </div>
                    <span className="inline-block py-1.5 px-3 w-fit text-sm rounded-lg">
                      {convertSupabaseDateToShortHumanReadable(
                        noticeReview.created_at,
                      )}
                    </span>
                  </div>
                </div>
              </div>
            }
            {reviews
              ?.filter((review) => !review.title.includes("Re"))
              ?.filter((review) => review.category === tab)
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
                          "flex flex-col shrink-0 w-full gap-4 p-4 border border-gray-100 bg-white rounded-xl",
                          notice ? "bg-gradient-orange-100" : "",
                        )}
                      >
                        <div className="font-semibold text-lg">{title}</div>

                        {!is_secret && (
                          <div
                            className="max-w-[300px]"
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
                          <div className="flex justify-between gap-6">
                            <div className="w-10 h-10 rounded-full bg-gradient-orange-100" />
                            <div className="flex flex-col gap-3">
                              <div>
                                <span className="py-1.5 px-3 bg-gray-100 text-sm text-gray-600 font-semibold rounded-lg">
                                  {username}
                                </span>{" "}
                                님
                              </div>
                              <span className="inline-block py-1.5 px-3 w-fit text-sm bg-light text-gray-500 rounded-lg">
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
