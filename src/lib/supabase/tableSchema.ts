import { Database } from './database.types';

type TableRowData = News | Review | User;

// {} => Record<string, never>, based on eslint ban-types
type ServiceDataType<T = TableRowData, D = Record<string, never>> = (T & D) | Partial<T & D> | null;

type Tables = Database['public']['Tables'];

type User = Tables['profiles']['Row'];
type News = Tables['news']['Row'];
type Review = Tables['online_course_reviews']['Row'];
type Tip = Tables['youtube_tips']['Row'];
type LegacyUser = Tables['legacy_users']['Row'];
type ReviewCountByProduct = Tables['review_count_by_product']['Row'];
type OfflineStudentRow = Tables['offline_students']['Row'];
type OnlineCourseRow = Tables['online_courses']['Row'];
type ChapterRow = Tables['chapters']['Row'];
type LessonRow = Tables['lessons']['Row'];
type EnrollmentRow = Tables['enrollments']['Row'];

export type {
	TableRowData,
	ServiceDataType,
	User,
	News,
	Review,
	Tip,
	LegacyUser,
	ReviewCountByProduct,
	OfflineStudentRow,
	OnlineCourseRow,
	ChapterRow,
	LessonRow,
	EnrollmentRow,
};
