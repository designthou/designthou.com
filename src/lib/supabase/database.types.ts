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
					updated_at: string;
					role: string;
				};
				Insert: {
					id: string;
					nickname: string;
					user_login?: string;
					user_registered_at: string;
					updated_at: string;
					role: string;
				};
				Update: {
					id: string;
					nickname?: string;
					user_login: string;
					user_registered_at?: string;
					updated_at: string;
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
			review_count_by_product: {
				Row: {
					product_id: string;
					review_count: number;
				};
			};
			offline_students: {
				Row: {
					// the data expected from .select()
					id: string;
					name: string | null;
					email: string | null;
					class: string;
					category: string;
					phone_encrypted: string | null;
					phone_mask: string | null;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					// the data expected from .select()
					id?: never;
					name: string | null;
					email: string | null;
					class: string;
					category: string;
					phone_encrypted: string | null;
					phone_mask: string | null;
					created_at: string;
					updated_at: string;
				};
				Update: {
					// the data expected from .select()
					id: never;
					name: string;
					email: string;
					class: string;
					category: string;
					phone_encrypted?: string;
					phone_mask?: string;
					created_at: string;
					updated_at: string;
				};
				Delete: {
					id: never;
				};
			};

			online_courses: {
				Row: {
					// the data expected from .select()
					id: string;
					title: string;
					description: string;
					price: number;
					discount_price: number;
					discount_rate: number;
					status: string;
					thumbnail_url: string;
					total_video_duration: string;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					// the data expected from .select()
					id?: never; // generated columns must not be supplied
					title: string;
					description: string;
					price: number;
					discount_price: number;
					discount_rate: number;
					status: string;
					thumbnail_url: string;
					total_video_duration: string;
					created_at: string;
					updated_at?: string;
				};
				Update: {
					// the data expected from .select()
					id: never; // generated columns must not be supplied
					title?: string;
					description?: string;
					price?: number;
					discount_price?: number;
					discount_rate?: number;
					status?: string;
					thumbnail_url?: string;
					total_video_duration?: string;
					updated_at: string;
				};
				Delete: {
					id: never;
				};
			};
			chapters: {
				Row: {
					// the data expected from .select()
					id: string;
					course_id: string;
					title: string;
					order_index: number;
					is_welcome: boolean;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					// the data expected from .select()
					id?: never; // generated columns must not be supplied
					course_id: string;
					title: string;
					order_index: number;
					is_welcome: boolean;
					created_at: string;
					updated_at?: string;
				};
				Update: {
					// the data expected from .select()
					id: never; // generated columns must not be supplied
					course_id: string;
					title?: string;
					order_index?: number;
					is_welcome?: boolean;
					updated_at?: string;
				};
				Delete: {
					id: never;
				};
			};
			lessons: {
				Row: {
					// the data expected from .select()
					id: string;
					course_id: string;
					chapter_id: string;
					title: string;
					video_url: string;
					video_duration_seconds: string;
					thumbnail_url: string;
					attachment_url: string;
					order_index: number;
					is_preview: number;
					is_published: boolean;
					description: string;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					// the data expected from .select()
					id?: never; // generated columns must not be supplied
					course_id: string;
					chapter_id: string;
					title: string;
					video_url: string;
					video_duration_seconds: string;
					thumbnail_url: string;
					attachment_url: string;
					order_index: number;
					is_preview: number;
					is_published: boolean;
					description: string;
					created_at: string;
					updated_at?: string;
				};
				Update: {
					// the data expected from .select()
					id: never; // generated columns must not be supplied
					course_id: string;
					chapter_id: string;
					title?: string;
					video_url?: string;
					video_duration_seconds?: string;
					thumbnail_url?: string;
					attachment_url?: string;
					order_index?: number;
					is_preview?: number;
					is_published?: boolean;
					description?: string;
					updated_at: string;
				};
				Delete: {
					id: never;
				};
			};
			enrollments: {
				Row: {
					// the data expected from .select()
					id: string;
					user_id: string | null;
					course_id: string;
					legacy_user_id: number | null;
					order_id: string | null;
					progress: number;
					status: string;
					access_expires_at: string | null;
					enrolled_at: string;
				};
				Insert: {
					// the data expected from .select()
					id?: never;
					user_id: string | null;
					course_id: string;
					legacy_user_id: number | null;
					order_id: string | null;
					progress: number;
					status: string;
					access_expires_at: string | null;
					enrolled_at: string;
				};
				Update: {
					// the data expected from .select()
					id: never;
					user_id: string | null;
					course_id: string;
					legacy_user_id: number | null;
					order_id?: string | null;
					progress?: number;
					status?: string;
					access_expires_at?: string | null;
					enrolled_at?: string;
				};
				Delete: {
					id: never;
				};
			};
		};
	};
}
