import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
	try {
		const supabaseServer = await createClient();

		const cookie = request.headers.get('cookie') ?? '';

		const {
			data: { user },
			error: getUserError,
		} = await supabaseServer.auth.getUser(cookie);

		if (getUserError || !user) {
			return NextResponse.json({ error: '사용자 정보 없음. 이메일 인증 후 다시 시도하세요.' }, { status: 401 });
		}

		// 2. 이미 users 테이블에 존재하는지 확인
		const { data: existingUser } = await supabaseServer.from('users').select('id').eq('id', user.id).single();

		if (existingUser) {
			return NextResponse.json({ ok: true, message: '이미 등록된 사용자입니다.' });
		}

		// 3. users 테이블 insert
		const { error: createUserError } = await supabaseServer.from('users').insert({
			id: user.id,
			email: user.email,
			nickname: user.user_metadata?.nickname,
			display_name: user.user_metadata?.nickname,
			user_login: 'email',
			user_registered: new Date().toISOString(),
		});

		if (createUserError) {
			return NextResponse.json({ error: createUserError.message }, { status: 500 });
		}

		return NextResponse.json({ ok: true, message: '사용자 등록 성공' });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: '사용자 추가 실패' }, { status: 500 });
	}
}
