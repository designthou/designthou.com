import { createClient } from "../client";

const TABLE = "online_course_reviews";

const getReviewsPageInfo = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .explain({ format: "json", analyze: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const getReviewsByPage = async (pageParam: number, pageSize: number) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false })
    .range((pageParam - 1) * pageSize, pageParam * pageSize - 1);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export { getReviewsPageInfo, getReviewsByPage };
