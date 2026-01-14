import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST() {
	try {
		const supabaseServer = await createClient();

		// 현재 세션의 사용자 정보 가져오기
		const {
			data: { user },
			error: getUserError,
		} = await supabaseServer.auth.getUser();

		if (getUserError || !user) {
			console.error('User error:', getUserError);
			return NextResponse.json({ error: '사용자 정보를 찾을 수 없습니다. 이메일 인증을 완료해주세요.' }, { status: 401 });
		}

		if (!user.email_confirmed_at) {
			return NextResponse.json({ error: '이메일 인증이 완료되지 않았습니다.' }, { status: 400 });
		}

		// 2. 이미 users 테이블에 존재하는지 확인
		const { data: existingUser } = await supabaseServer.from('users').select('id').eq('id', user.id).maybeSingle();

		if (existingUser) {
			return NextResponse.json({ ok: true, message: '이미 등록된 사용자입니다.' });
		}

		// 3. users 테이블 insert
		const { error: createUserError } = await supabaseServer.from('users').insert({
			id: user.id,
			nickname: user.user_metadata?.nickname,
			display_name: user.user_metadata?.nickname,
			user_login: 'email',
			user_registered: new Date().toISOString(),
		});

		if (createUserError) {
			console.error('Create user error:', createUserError);
			return NextResponse.json({ error: `사용자 등록 실패: ${createUserError.message}` }, { status: 500 });
		}

		return NextResponse.json({ ok: true, message: '사용자 등록 성공' });
	} catch (error) {
		console.error('Verify error:', error);
		return NextResponse.json({ error: '사용자 등록 중 오류가 발생했습니다.' }, { status: 500 });
	}
}
