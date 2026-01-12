import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
/**
 * 1. Read request Cookie
 * 2. Check access token expired
 * 3. Create new access Token
 * 4. add Set-Cookie header
 */

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request,
	});

	const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
		cookies: {
			getAll() {
				return request.cookies.getAll();
			},
			setAll(cookiesToSet) {
				// update request cookie
				cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
				// create new response
				supabaseResponse = NextResponse.next({
					request,
				});
				// add Set-Cookie header
				cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
			},
		},
	});

	// refreshing the auth token
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return { supabaseResponse, user };
}
