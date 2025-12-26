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
          category: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          title: string;
          url: string;
          category?: string;
          created_at: string;
          updated_at: string;
        };
        Update: {
          id: string;
          title?: string;
          url?: string;
          category?: string;
          updated_at: string;
        };
        Delete: {
          id: string;
        };
      };
      online_course_reviews: {
        Row: {
          // the data expected from .select()
          id: string;
          user_id: string;
          user_uid: number;
          legacy_id: number;
          username: string;
          title: string;
          content: string;
          category: string;
          view_count: number;
          comment_id: string[];
          is_secret: boolean;
          notice: boolean;
          password: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          user_id: string;
          username: string;
          title: string;
          content: string;
          category: string;
          view_count: number;
          comment_id: string[];
          is_secret: boolean;
          notice: boolean;
          password: string;
          created_at: string;
          updated_at: string;
        };
        Update: {
          id: string;
          user_id: string;
          username: string;
          title: string;
          content: string;
          category: string;
          is_secret: boolean;
          notice: boolean;
          password?: string;
          updated_at: string;
        };
        Delete: {
          id: string;
        };
      };
      users: {
        Row: {
          // the data expected from .select()
          id: string;
          legacy_user_id: number;
          email: string;
          nickname: string;
          display_name: string;
          user_login: string;
          user_registered: string;
        };
        Insert: {
          id: string;
          email: string;
          nickname: string;
          user_login?: string;
          user_registered: string;
        };
        Update: {
          id: string;
          email: string;
          nickname?: string;
          user_login: string;
          user_registered?: string;
        };
        Delete: {
          id: string;
          email: string;
        };
      };
    };
  };
}
