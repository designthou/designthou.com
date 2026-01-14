import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: Request) {
	try {
		const { id, email, nickname } = await request.json();

		const supabaseAdmin = createAdminClient();
		const { error: createUserError } = await supabaseAdmin.from('users').insert({
			id,
			email,
			nickname,
			display_name: nickname,
			user_login: 'email',
			user_registered: new Date().toISOString(),
		});

		if (createUserError) {
			throw new Error(createUserError?.message);
		}

		return NextResponse.json({ ok: true });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Insert failed' }, { status: 500 });
	}
}
