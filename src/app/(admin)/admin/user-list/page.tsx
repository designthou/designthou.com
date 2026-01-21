import React from 'react';
import { TableWithTriggers } from '@/components';
import { createClient } from '@/lib/supabase/server';
import { TABLE } from '@/lib/supabase';

export default async function UserListPage() {
	const supabase = await createClient();

	const [{ data: registeredUsers, error: registeredError }, { data: legacyUsers, error: legacyError }] = await Promise.all([
		supabase.from(TABLE.PROFILES).select('*'),
		supabase.from(TABLE.LEGACY_USERS).select('*'),
	]);

	if (registeredError) {
		throw new Error(registeredError?.message);
	}

	if (legacyError) {
		throw new Error(legacyError?.message);
	}

	return (
		<section className="p-4">
			<h2 className="font-black font-mono text-xl" aria-label="User List Page Title">
				사용자 목록
			</h2>

			<TableWithTriggers registeredUsers={registeredUsers} legacyUsers={legacyUsers} />
		</section>
	);
}
