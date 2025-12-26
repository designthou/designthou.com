import { Database } from "./database.types";

type TableRowData = News | Reviews | Users;

// {} => Record<string, never>, based on eslint ban-types
type ServiceDataType<T = TableRowData, D = Record<string, never>> =
  | (T & D)
  | Partial<T & D>
  | null;

type News = Database["public"]["Tables"]["news"]["Row"];
type Reviews = Database["public"]["Tables"]["online_course_reviews"]["Row"];
type Users = Database["public"]["Tables"]["users"]["Row"];

export type { TableRowData, ServiceDataType, News, Reviews, Users };
