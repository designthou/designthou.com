import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { route } from '@/constants';
import { SiteConfig } from '@/app/config';

export async function POST(request: Request) {
	try {
		const { email } = await request.json();
		const supabase = await createClient();

		const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: new URL(route.AUTH.RESET_PASSWORD, SiteConfig.url).toString(),
		});

		if (error) {
			throw error;
		}

		if (data) {
			return NextResponse.json({ ok: true });
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: '비밀번호 재설정 실패' }, { status: 500 });
	}
}
