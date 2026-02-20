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
	createdAt: z.string(),
	updatedAt: z.string(),
});

export type { RegisteredUserView, LegacyUserView, OfflineStudentView, OnlineCourseView };
export { offlineStudentViewSchema, onlineCourseViewSchema };
