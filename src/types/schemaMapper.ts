import { z } from 'zod';
import type { LegacyUser, User, ReviewCountByProduct } from '@/lib/supabase';

type RegisteredUserViewSchema = z.infer<typeof registeredUserViewSchema>;
type LegacyUserViewSchema = z.infer<typeof legacyUserViewSchema>;
type ReviewCountByProductViewSchema = z.infer<typeof reviewCountByProductViewSchema>;

const registeredUserViewSchema: z.ZodType<User> = z.object({
	id: z.string(),
	nickname: z.string(),
	display_name: z.string(),
	legacy_user_id: z.number(),
	user_login: z.string(),
	user_registered_at: z.string(),
	role: z.string(),
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

export type { RegisteredUserViewSchema, LegacyUserViewSchema, ReviewCountByProductViewSchema };
export { mapRegisteredUserToView, mapLegacyUserToView, mapReviewCountByProductView };
