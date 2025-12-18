export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      news: {
        Row: {
          // the data expected from .select()
          id: string;
          title: string;
          url: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          title: string;
          url: string;
          created_at: string;
          updated_at: string;
        };
        Update: {
          id: string;
          title?: string;
          url?: string;
          updated_at: string;
        };
        Delete: {
          id: string;
        };
      };
    };
  };
}
