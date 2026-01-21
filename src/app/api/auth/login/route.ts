import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
	try {
		const { email, password } = await request.json();
		const supabase = await createClient();

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			return NextResponse.json({ error: error.message || '유효하지 않은 로그인 정보입니다.' }, { status: 401 });
		}

		if (!data?.user || !data?.session) {
			return NextResponse.json({ error: '유효하지 않은 응답이 발생했습니다.' }, { status: 500 });
		}

		return NextResponse.json({ ok: true });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: '서버 오류가 발생했습니다' }, { status: 500 });
	}
}
