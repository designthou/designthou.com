import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get('code');

	if (code) {
		const supabase = await createClient();

		// 인증 코드를 세션으로 교환
		await supabase.auth.exchangeCodeForSession(code);
	}

	// verify 페이지로 리다이렉트
	return NextResponse.redirect(new URL('/auth/verify', request.url));
}
