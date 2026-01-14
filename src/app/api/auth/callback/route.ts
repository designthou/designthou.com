// app/auth/callback/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url);
	const token_hash = searchParams.get('token_hash');
	const type = searchParams.get('type');

	if (token_hash && type) {
		const supabase = await createClient();

		await supabase.auth.verifyOtp({
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			type: type as any, // signup
			token_hash,
		});
	}

	return NextResponse.redirect(`${origin}/auth/signup/confirm`);
}
