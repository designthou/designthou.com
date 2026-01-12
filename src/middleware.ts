import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { route } from './constants';

export async function middleware(request: NextRequest) {
	const { supabaseResponse, user } = await updateSession(request);

	const protectedRoutes = [route.ADMIN.ROOT];
	const isProtected = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route));

	const isAuthPage = request.nextUrl.pathname.startsWith(route.AUTH.ROOT);

	if (user && isAuthPage) {
		return NextResponse.redirect(new URL(route.ADMIN.ROOT, request.url), {
			headers: supabaseResponse.headers,
		});
	}

	if (!user && isProtected) {
		const redirectUrl = new URL(route.AUTH.LOGIN, request.url);

		// add Set-Cookie option when update sessions
		// 1. Pass response header made by supabase
		// 2. Pass updated cookie
		return NextResponse.redirect(redirectUrl, {
			headers: supabaseResponse.headers,
		});
	}

	return supabaseResponse;
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
