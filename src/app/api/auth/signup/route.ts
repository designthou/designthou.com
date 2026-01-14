import { NextResponse } from 'next/server';
import { SiteConfig } from '@/app/config';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
	try {
		const { email, password, nickname } = await request.json();

		const supabaseServer = await createClient();
		const { data, error: signupError } = await supabaseServer.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${SiteConfig.url}/auth/login`,
				data: {
					nickname,
					display_name: nickname,
				},
			},
		});

		if (signupError?.status === 400 && signupError?.message.includes('already registered')) {
			console.error(signupError.message);
			throw signupError;
		}

		if (data) {
			return NextResponse.json({ ok: true });
		}
	} catch (error) {
		console.error('error', error);
		return NextResponse.json({ error: '회원가입 실패' }, { status: 500 });
	}
}
