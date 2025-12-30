import { createClient } from "../client";
import { type News } from "../schema";

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

const getNewsListByPage = async ({
  pageParam,
  pageSize,
  year,
}: {
  pageParam: number;
  pageSize: number;
  year: string;
}): Promise<News[]> => {
  const supabase = createClient();

  const start = `${year}-01-01T00:00:00.000Z`;
  const end = `${+year + 1}-01-01T00:00:00.000Z`;
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .gte("created_at", start)
    .lt("created_at", end)
    .order("created_at", { ascending: false })
    .range((pageParam - 1) * pageSize, pageParam * pageSize - 1);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const getRecentNewsList = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false })
    .range(0, 5);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const addNews = async (data: Omit<News, "id">) => {
  const supabase = createClient();
  return await supabase.from(TABLE).insert(data).select();
};

const updateNews = async ({ data }: { data: News }) => {
  const supabase = createClient();
  return await supabase.from(TABLE).update(data).eq("id", data.id).select();
};

const deleteNews = async ({ id }: { id: string }) => {
  const supabase = createClient();
  return await supabase.from(TABLE).delete().eq("id", id);
};

export {
  NEWS_LIST_PAGE_SIZE,
  getNewsListPageInfo,
  getNewsListByPage,
  getRecentNewsList,
  addNews,
  updateNews,
  deleteNews,
};
