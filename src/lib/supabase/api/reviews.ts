import sanitizeHtmlServer from "@/utils/sanitizeHtml";
import { createClient } from "../client";
import { type Review } from "../schema";

const TABLE = "online_course_reviews";

const REVIEW_LIST_PAGE_SIZE = 10;

const getReviewListPageInfo = async () => {
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

const getReviewsTotalCount = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from(TABLE).select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data.length;
};

const getPortfolioReviewList = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false })
    .eq("category", "portfolio")
    .limit(6);

  if (error) {
    throw new Error(error.message);
  }

  return data?.map((review) => ({
    ...review,
    content: sanitizeHtmlServer(review.content),
  }));
};

const getReviewListByPage = async (
  pageParam: number,
  pageSize: number,
  category: string
): Promise<Review[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("category", category)
    .order("view_count", { ascending: false })
    .order("created_at", { ascending: false })
    .range((pageParam - 1) * pageSize, pageParam * pageSize - 1);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const getNoticeReview = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(TABLE)
    .select()
    .eq("notice", true)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export {
  REVIEW_LIST_PAGE_SIZE,
  getReviewListPageInfo,
  getReviewsTotalCount,
  getPortfolioReviewList,
  getReviewListByPage,
  getNoticeReview,
};
