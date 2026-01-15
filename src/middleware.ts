import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { route } from './constants';

export async function middleware(request: NextRequest) {
	const { supabaseResponse, user } = await updateSession(request);

	const pathname = request.nextUrl.pathname;

	const isPublicRoutes = [route.AUTH.RESET_PASSWORD, route.AUTH.SIGNUP_CONFIRM].some(path => pathname.startsWith(path));

	if (isPublicRoutes) {
		return NextResponse.next();
	}

	const isProtectedRoutes = pathname.startsWith(route.ADMIN.ROOT);

	const isAuthRedirectRoutes = [route.AUTH.LOGIN, route.AUTH.SIGNUP].some(path => pathname.startsWith(path));

	if (user && isAuthRedirectRoutes) {
		return NextResponse.redirect(new URL(route.ADMIN.ROOT, request.url), {
			headers: supabaseResponse.headers,
		});
	}

	if (!user && isProtectedRoutes) {
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
