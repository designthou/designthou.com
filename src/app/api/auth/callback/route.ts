import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get('code');

	if (code) {
		const supabase = await createClient();

		// exchange code for session
		await supabase.auth.exchangeCodeForSession(code);
	}

	return NextResponse.redirect(new URL('/auth/verify', request.url));
}
