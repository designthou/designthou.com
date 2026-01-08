import { createClient } from "../client";
import { Tip } from "../schema";
import { TABLES } from "../tables";

const TIP_LIST_PAGE_SIZE = 9;

const getTipListPageInfo = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(TABLES.TIPS)
    .select("*")
    .explain({ format: "json", analyze: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const getTipListByPage = async (
  pageParam: number,
  pageSize: number
): Promise<Tip[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(TABLES.TIPS)
    .select("*")
    .order("created_at", { ascending: false })
    .range((pageParam - 1) * pageSize, pageParam * pageSize - 1);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export { TIP_LIST_PAGE_SIZE, getTipListPageInfo, getTipListByPage };
