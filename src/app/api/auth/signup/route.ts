import { NextResponse } from 'next/server';
import { SiteConfig } from '@/app/config';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
	try {
		const { email, password, nickname } = await request.json();
		const supabase = await createClient();

		const { data, error: signupError } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${SiteConfig.url}/auth/callback`,
				data: {
					nickname,
					display_name: nickname,
				},
			},
		});

		if (signupError?.message.includes('already registered')) {
			console.error(signupError.message);
			throw signupError;
		}

		const { error: createUserError } = await supabase.from('users').insert({
			id: data?.user?.id,
			email,
			nickname,
			display_name: nickname,
			user_login: 'email',
			user_registered: new Date().toISOString(),
		});

		if (createUserError) {
			console.log(createUserError.message);
			throw createUserError;
		}

		if (data) {
			return NextResponse.json({ ok: true });
		}
	} catch (error) {
		console.error('error', error);
		return NextResponse.json({ error: '회원가입 실패' }, { status: 500 });
	}
}
