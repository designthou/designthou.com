import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
	try {
		const { id, email, nickname } = await request.json();

		const supabaseServer = await createClient();
		const { error: createUserError } = await supabaseServer.from('users').insert({
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
