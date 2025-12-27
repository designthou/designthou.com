import { Database } from "./database.types";

type TableRowData = News | Review | Users;

// {} => Record<string, never>, based on eslint ban-types
type ServiceDataType<T = TableRowData, D = Record<string, never>> =
  | (T & D)
  | Partial<T & D>
  | null;

type Users = Database["public"]["Tables"]["users"]["Row"];
type News = Database["public"]["Tables"]["news"]["Row"];
type Review = Database["public"]["Tables"]["online_course_reviews"]["Row"];
type Tip = Database["public"]["Tables"]["youtube_tips"]["Row"];

export type { TableRowData, ServiceDataType, Users, News, Review, Tip };
