import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { route } from "./constants";

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);

  if (!user && request.nextUrl.pathname.startsWith(route.ADMIN.ROOT)) {
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
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
