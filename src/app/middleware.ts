import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);

  if (!user && request.nextUrl.pathname.startsWith("/admin")) {
    const redirectUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(redirectUrl, {
      headers: supabaseResponse.headers,
    });
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
