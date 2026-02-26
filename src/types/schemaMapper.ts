import { z } from 'zod';
import type { LegacyUser, User, ReviewCountByProduct, OfflineStudentRow, OnlineCourseRow, EnrollmentRow } from '@/lib/supabase';
import {
	type EnrollmentView,
	type OfflineStudentView,
	type OnlineCourseView,
	enrollmentViewSchema,
	offlineStudentViewSchema,
	onlineCourseViewSchema,
} from './view';

type RegisteredUserViewSchema = z.infer<typeof registeredUserViewSchema>;
type LegacyUserViewSchema = z.infer<typeof legacyUserViewSchema>;

type ReviewCountByProductViewSchema = z.infer<typeof reviewCountByProductViewSchema>;

const registeredUserViewSchema = z.object({
	id: z.string(),
	email: z.string(),
	role: z.string(),
	nickname: z.string(),
	legacy_user_id: z.number(),
	user_login_type: z.string(),
	user_registered_at: z.string(),
	updated_at: z.string(),
});

const legacyUserViewSchema: z.ZodType<LegacyUser> = z.object({
	id: z.string(),
	email: z.string(),
	nickname: z.string(),
	display_name: z.string(),
	legacy_user_id: z.number(),
	user_login: z.string(),
	user_registered_at: z.string(),
});

const reviewCountByProductViewSchema: z.ZodType<ReviewCountByProduct> = z.object({
	product_id: z.string(),
	review_count: z.number(),
});

const offlineStudentsRowSchema: z.ZodType<OfflineStudentRow> = z.object({
	id: z.string(),
	name: z.string().nullable(),
	email: z.string().nullable(),
	class: z.string(),
	category: z.string(),
	phone_encrypted: z.string().nullable(),
	phone_mask: z.string().nullable(),
	created_at: z.string(),
	updated_at: z.string(),
});

const onlineCourseRowSchema: z.ZodType<OnlineCourseRow> = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	price: z.number(),
	discount_price: z.number(),
	discount_rate: z.number(),
	status: z.string(),
	thumbnail_url: z.string(),
	total_video_duration: z.string(),
	created_at: z.string(),
	updated_at: z.string(),
});

const enrollmentRowSchema: z.ZodType<EnrollmentRow> = z.object({
	id: z.string(),
	user_id: z.string().nullable(),
	course_id: z.string(),
	legacy_user_id: z.number().nullable(),
	order_id: z.string().nullable(),
	progress: z.number(),
	status: z.string(),
	access_expires_at: z.string().nullable(),
	enrolled_at: z.string(),
});

const mapRegisteredUserToView = (row: User) =>
	registeredUserViewSchema.parse({
		id: row.id,
		nickname: row.nickname,
		displayName: row.display_name,
		legacyUserId: row.legacy_user_id,
		loginType: row.user_login,
		registeredAt: row.user_registered_at,
		role: row.role,
	});

const mapLegacyUserToView = (row: LegacyUser) =>
	legacyUserViewSchema.parse({
		id: row.id,
		email: row.email,
		nickname: row.nickname,
		displayName: row.display_name,
		legacyUserId: row.legacy_user_id,
		loginType: row.user_login,
		registeredAt: row.user_registered_at,
	});

const mapReviewCountByProductView = (row: ReviewCountByProduct) => {
	const parsed = reviewCountByProductViewSchema.safeParse(row);
	return parsed.success ? { productId: parsed.data.product_id, reviewCount: parsed.data.review_count } : null;
};

const mapOfflineStudentsRowToView = (row: OfflineStudentRow): OfflineStudentView => {
	const r = offlineStudentsRowSchema.parse(row);

	return offlineStudentViewSchema.parse({
		id: r.id,
		name: r.name ?? 'unknown',
		email: r.email ?? 'unknown',
		class: r.class,
		category: r.category,
		phoneEncrypted: r.phone_encrypted ?? 'unknown',
		phoneMask: r.phone_mask ?? 'unknown',
		createdAt: r.created_at,
		updatedAt: r.updated_at,
	});
};

const mapOnlineCourseRowToView = (row: OnlineCourseRow): OnlineCourseView => {
	const r = onlineCourseRowSchema.parse(row);

	return onlineCourseViewSchema.parse({
		id: r.id,
		title: r.title,
		description: r.description,
		price: r.price,
		discountPrice: r.discount_price,
		discountRate: r.discount_rate,
		status: r.status,
		thumbnailUrl: r.thumbnail_url,
		totalVideoDuration: r.total_video_duration,
		createdAt: r.created_at,
		updatedAt: r.updated_at,
	});
};

const mapEnrollmentRowToView = (row: EnrollmentRow): EnrollmentView => {
	const r = enrollmentRowSchema.parse(row);

	return enrollmentViewSchema.parse({
		id: r.id,
		userId: r.user_id,
		courseId: r.course_id,
		legacyUserId: r.legacy_user_id,
		orderId: r.order_id,
		progress: r.progress,
		status: r.status,
		accessExpiresAt: r.access_expires_at,
		enrolledAt: r.enrolled_at,
	});
};

export type { RegisteredUserViewSchema, LegacyUserViewSchema, ReviewCountByProductViewSchema };
export {
	mapRegisteredUserToView,
	mapLegacyUserToView,
	mapReviewCountByProductView,
	mapOfflineStudentsRowToView,
	mapOnlineCourseRowToView,
	mapEnrollmentRowToView,
};
