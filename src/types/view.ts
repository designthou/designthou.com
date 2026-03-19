import z from 'zod';

interface RegisteredUserView {
	id: string;
	nickname: string;
	displayName: string;
	legacyUserId: number;
	registeredAt: string;
	loginType: string;
	role: string;
}

interface LegacyUserView {
	id: string;
	email: string;
	nickname: string;
	displayName: string;
	legacyUserId: number;
	registeredAt: string;
	loginType: string;
}

type WCompArtStudentView = z.infer<typeof wcompArtStudentViewSchema>;
type OnlineCourseView = z.infer<typeof onlineCourseViewSchema>;
type EnrollmentView = z.infer<typeof enrollmentViewSchema>;
type OfflineCourseStudentView = z.infer<typeof offlineCourseStudentViewSchema>;
type OfflineCourseStudentSummaryView = z.infer<typeof offlineCourseStudentSummaryViewSchema>;

const wcompArtStudentViewSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string().nullable(),
	class: z.string().nullable(),
	category: z.string().nullable(),
	phoneEncrypted: z.string().nullable(),
	phoneMask: z.string().nullable(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

const onlineCourseViewSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	price: z.number(),
	discountPrice: z.number(),
	discountRate: z.number(),
	status: z.string(),
	thumbnailUrl: z.string(),
	totalVideoDuration: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

const enrollmentViewSchema = z.object({
	id: z.string(),
	userId: z.string().nullable(),
	courseId: z.string(),
	legacyUserId: z.number().nullable(),
	orderId: z.string().nullable(),
	progress: z.number(),
	status: z.string(),
	accessExpiresAt: z.string().nullable(),
	enrolledAt: z.string(),
});

const offlineCourseStudentViewSchema = z.object({
	id: z.string(),
	userId: z.string().nullable().optional(),
	option: z.string(),
	program: z.string().optional(),
	name: z.string(),
	email: z.string(),
	phoneNumber: z.string().optional(),
	description: z.string().optional(),
	bank: z.string(),
	accountNumber: z.string().optional(),
	createdAt: z.string(),
	updatedAt: z.string().optional(),
});

const offlineCourseStudentSummaryViewSchema = z.object({
	id: z.string(),
	option: z.string(),
	program: z.string().optional(),
	name: z.string(),
	description: z.string().optional(),
	bank: z.string(),
	createdAt: z.string(),
});

export type {
	RegisteredUserView,
	LegacyUserView,
	WCompArtStudentView,
	OnlineCourseView,
	EnrollmentView,
	OfflineCourseStudentView,
	OfflineCourseStudentSummaryView,
};

export {
	wcompArtStudentViewSchema,
	onlineCourseViewSchema,
	enrollmentViewSchema,
	offlineCourseStudentViewSchema,
	offlineCourseStudentSummaryViewSchema,
};
