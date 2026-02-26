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

type OfflineStudentView = z.infer<typeof offlineStudentViewSchema>;
type OnlineCourseView = z.infer<typeof onlineCourseViewSchema>;
type EnrollmentView = z.infer<typeof enrollmentViewSchema>;

const offlineStudentViewSchema = z.object({
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

export type { RegisteredUserView, LegacyUserView, OfflineStudentView, OnlineCourseView, EnrollmentView };
export { offlineStudentViewSchema, onlineCourseViewSchema, enrollmentViewSchema };
