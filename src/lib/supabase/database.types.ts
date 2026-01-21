export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			profiles: {
				Row: {
					// the data expected from .select()
					id: string;
					legacy_user_id: number;
					nickname: string;
					display_name: string;
					user_login: string;
					user_registered_at: string;
					role: string;
				};
				Insert: {
					id: string;
					nickname: string;
					user_login?: string;
					user_registered_at: string;
					role: string;
				};
				Update: {
					id: string;
					nickname?: string;
					user_login: string;
					user_registered_at?: string;
				};
				Delete: {
					id: string;
				};
			};
			legacy_users: {
				Row: {
					// the data expected from .select()
					id: string;
					email: string;
					nickname: string;
					display_name: string;
					legacy_user_id: number;
					user_login: string;
					user_registered_at: string;
				};
				Insert: {
					id: string;
					email: string;
					nickname: string;
					display_name: string;
					legacy_user_id: number;
					user_login?: string;
					user_registered_at: string;
				};
				Update: {
					id: string;
					email: string;
					nickname?: string;
					display_name?: string;
					legacy_user_id?: number;
					user_registered_at?: string;
				};
				Delete: {
					id: string;
				};
			};
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
					id?: never; // generated columns must not be supplied
					title: string;
					url: string;
					category?: string;
					created_at: string;
					updated_at: string;
				};
				Update: {
					id: never;
					title?: string;
					url?: string;
					category?: string;
					updated_at: string;
				};
				Delete: {
					id: never;
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
					id?: never; // generated columns must not be supplied
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
					id: never;
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
					id: never;
				};
			};
			youtube_tips: {
				Row: {
					// the data expected from .select()
					id: string;
					title: string;
					category: string;
					download_url: string;
					url: string;
					imgSrc: string;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					// the data expected from .select()
					id?: never; // generated columns must not be supplied
					title: string;
					category: string;
					download_url: string;
					url: string;
					imgSrc: string;
					created_at: string;
					updated_at: string;
				};
				Update: {
					// the data expected from .select()
					id: never; // generated columns must not be supplied
					title: string;
					category?: string;
					download_url?: string;
					url: string;
					imgSrc?: string;
					updated_at: string;
				};
				Delete: {
					id: never;
				};
			};
		};
	};
}
