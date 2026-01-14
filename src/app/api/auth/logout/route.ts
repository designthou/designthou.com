import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST() {
	try {
		const supabase = await createClient();

		// sign out from the current session only
		const { error } = await supabase.auth.signOut({ scope: 'local' });

		if (error) {
			throw error;
		}

		return NextResponse.json({ ok: true });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: '로그아웃 실패' }, { status: 500 });
	}
}
