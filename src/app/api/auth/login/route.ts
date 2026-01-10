import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    if (data) {
      return NextResponse.json({ ok: true });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "로그인 실패" }, { status: 500 });
  }
}
