import { z } from 'zod';
import type {
	LegacyUserRow,
	UserRow,
	ReviewCountByProductRow,
	WCompArtStudentRow,
	OnlineCourseRow,
	EnrollmentRow,
	OfflineCourseStudentRow,
} from '@/lib/supabase';
import {
	type EnrollmentView,
	type WCompArtStudentView,
	type OnlineCourseView,
	type OfflineCourseStudentView,
	type OfflineCourseStudentSummaryView,
	enrollmentViewSchema,
	wcompArtStudentViewSchema,
	onlineCourseViewSchema,
	offlineCourseStudentViewSchema,
	offlineCourseStudentSummaryViewSchema,
} from './view';

type RegisteredUserViewSchema = z.infer<typeof registeredUserRowSchema>;
type LegacyUserViewSchema = z.infer<typeof legacyUserRowSchema>;
type ReviewCountByProductViewSchema = z.infer<typeof reviewCountByProductRowSchema>;

const registeredUserRowSchema = z.object({
	id: z.string(),
	email: z.string(),
	role: z.string(),
	nickname: z.string(),
	legacy_user_id: z.number(),
	user_login_type: z.string(),
	user_registered_at: z.string(),
	updated_at: z.string(),
});

const legacyUserRowSchema: z.ZodType<LegacyUserRow> = z.object({
	id: z.string(),
	email: z.string(),
	nickname: z.string(),
	display_name: z.string(),
	legacy_user_id: z.number(),
	user_login: z.string(),
	user_registered_at: z.string(),
});

const reviewCountByProductRowSchema: z.ZodType<ReviewCountByProductRow> = z.object({
	product_id: z.string(),
	category: z.string(),
	review_count: z.number(),
});

const wcompArtStudentRowSchema: z.ZodType<WCompArtStudentRow> = z.object({
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

const offlineCourseStudentRowSchema: z.ZodType<OfflineCourseStudentRow> = z.object({
	id: z.string(),
	user_id: z.string().nullable(),
	option: z.string(),
	program: z.string().optional(),
	name: z.string(),
	email: z.string(),
	phone_number: z.string(),
	description: z.string().optional(),
	bank: z.string(),
	account_number: z.string(),
	created_at: z.string(),
	updated_at: z.string(),
});

const offlineCourseStudentRowSummarySchema: z.ZodType<Partial<OfflineCourseStudentRow>> = z.object({
	id: z.string(),
	option: z.string(),
	program: z.string().optional(),
	name: z.string(),
	description: z.string().optional(),
	bank: z.string(),
	created_at: z.string(),
});

const mapReviewCountByProductView = (row: ReviewCountByProductRow) => {
	const parsed = reviewCountByProductRowSchema.safeParse(row);
	return parsed.success
		? { productId: parsed.data.product_id, category: parsed.data.category, reviewCount: parsed.data.review_count }
		: null;
};

const mapOfflineStudentsRowToView = (row: WCompArtStudentRow): WCompArtStudentView => {
	const r = wcompArtStudentRowSchema.parse(row);

	return wcompArtStudentViewSchema.parse({
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

const mapOfflineCourseStudentRowToView = (row: OfflineCourseStudentRow): OfflineCourseStudentView => {
	const r = offlineCourseStudentRowSchema.parse(row);

	return offlineCourseStudentViewSchema.parse({
		id: r.id,
		userId: r.user_id,
		option: r.option,
		program: r.program,
		name: r.name,
		email: r.email,
		phoneNumber: r.phone_number,
		description: r.description,
		bank: r.bank,
		accountNumber: r.account_number,
		createdAt: r.created_at,
		updatedAt: r.updated_at,
	});
};

const mapOfflineCourseStudentRowToSummaryView = (row: Partial<OfflineCourseStudentRow>): OfflineCourseStudentSummaryView => {
	const r = offlineCourseStudentRowSummarySchema.parse(row);

	return offlineCourseStudentSummaryViewSchema.parse({
		id: r.id,
		option: r.option,
		program: r.program,
		name: r.name,
		description: r.description,
		bank: r.bank,
		createdAt: r.created_at,
	});
};

export type { RegisteredUserViewSchema, LegacyUserViewSchema, ReviewCountByProductViewSchema };
export {
	mapReviewCountByProductView,
	mapOfflineStudentsRowToView,
	mapOnlineCourseRowToView,
	mapEnrollmentRowToView,
	mapOfflineCourseStudentRowToView,
	mapOfflineCourseStudentRowToSummaryView,
};
