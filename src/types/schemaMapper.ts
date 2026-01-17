import { z } from 'zod';
import type { LegacyUser, User } from '@/lib/supabase';

type RegisteredUserViewSchema = z.infer<typeof registeredUserViewSchema>;
type LegacyUserViewSchema = z.infer<typeof legacyUserViewSchema>;

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

export type { RegisteredUserViewSchema, LegacyUserViewSchema };
export { mapRegisteredUserToView, mapLegacyUserToView };
