import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: Request) {
	try {
		const { id, email, nickname } = await request.json();

		const supabaseAdmin = createAdminClient();
		const { data, error: createUserError } = await supabaseAdmin.from('users').insert({
			id,
			email,
			nickname,
			display_name: nickname,
			user_login: 'email',
			user_registered: new Date().toISOString(),
		});

		if (createUserError) {
			console.error(createUserError?.message);
			throw new Error(createUserError?.message);
		}

		console.log(data);
		return NextResponse.json({ ok: true });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: '사용자 추가 실패' }, { status: 500 });
	}
}
