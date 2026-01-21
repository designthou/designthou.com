import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { route } from './constants';

export async function middleware(request: NextRequest) {
	const { supabaseResponse, user } = await updateSession(request);

	const pathname = request.nextUrl.pathname;

	const isPublicRoutes = [route.AUTH.RESET_PASSWORD, route.AUTH.SIGNUP_CONFIRM].some(path => pathname.startsWith(path));

	if (isPublicRoutes) {
		return supabaseResponse;
	}

	const isProtectedRoutes = pathname.startsWith(route.ADMIN.ROOT);

	const isAuthRedirectRoutes = [route.AUTH.LOGIN, route.AUTH.SIGNUP].some(path => pathname.startsWith(path));

	const role = user?.user_metadata?.role;
	const isAdmin = role === 'admin';

	if (user && isAuthRedirectRoutes) {
		const destination = isAdmin ? route.ADMIN.ROOT : route.SERVICE.ROOT;

		return NextResponse.redirect(new URL(destination, request.url), {
			headers: supabaseResponse.headers,
		});
	}

	if (isProtectedRoutes) {
		// 1) 비로그인 -> 로그인으로
		if (!user) {
			return NextResponse.redirect(new URL(route.AUTH.LOGIN, request.url), {
				headers: supabaseResponse.headers,
			});
		}

		// 2) 로그인했지만 admin 아님 -> 접근 거부 페이지/홈으로
		if (!isAdmin) {
			return NextResponse.redirect(new URL(route.SERVICE.ROOT, request.url), {
				headers: supabaseResponse.headers,
			});
		}

		// 3) admin이면 통과
		return supabaseResponse;
	}

	return supabaseResponse;
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
