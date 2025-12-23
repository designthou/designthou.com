import { createClient } from "../client";

const TABLE = "news";

const NEWS_LIST_PAGE_SIZE = 12;

const getNewsListPageInfo = async () => {
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

const getNewsListByPage = async (pageParam: number, pageSize: number) => {
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

export { NEWS_LIST_PAGE_SIZE, getNewsListPageInfo, getNewsListByPage };
