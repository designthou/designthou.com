import { Database } from './database.types';

type TableRowData = NewsRow | ReviewRow | UserRow;

// {} => Record<string, never>, based on eslint ban-types
type ServiceDataType<T = TableRowData, D = Record<string, never>> = (T & D) | Partial<T & D> | null;

type Tables = Database['public']['Tables'];

type UserRow = Tables['profiles']['Row'];
type NewsRow = Tables['news']['Row'];
type ReviewRow = Tables['online_course_reviews']['Row'];
type TipRow = Tables['youtube_tips']['Row'];
type LegacyUserRow = Tables['legacy_users']['Row'];
type ReviewCountByProductRow = Tables['review_count_by_product']['Row'];
type OfflineStudentRow = Tables['offline_students']['Row'];
type OnlineCourseRow = Tables['online_courses']['Row'];
type ChapterRow = Tables['chapters']['Row'];
type LessonRow = Tables['lessons']['Row'];
type EnrollmentRow = Tables['enrollments']['Row'];

export type {
	TableRowData,
	ServiceDataType,
	UserRow,
	NewsRow,
	ReviewRow,
	TipRow,
	LegacyUserRow,
	ReviewCountByProductRow,
	OfflineStudentRow,
	OnlineCourseRow,
	ChapterRow,
	LessonRow,
	EnrollmentRow,
};
