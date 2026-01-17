import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { TABLES } from '@/lib/supabase/tables';

export interface ApiResponse<T = unknown> {
	ok: boolean;
	message?: string;
	error?: string;
	data?: T;
}

export async function POST() {
	try {
		const supabaseServer = await createClient();

		const {
			data: { user },
			error: getUserError,
		} = await supabaseServer.auth.getUser();

		if (getUserError || !user) {
			console.error('User error:', getUserError);
			return NextResponse.json<ApiResponse>(
				{ ok: false, error: '사용자 정보를 찾을 수 없습니다. 이메일 인증을 완료해주세요.' },
				{ status: 401 },
			);
		}

		if (!user.email_confirmed_at) {
			return NextResponse.json<ApiResponse>({ ok: false, error: '이메일 인증이 완료되지 않았습니다.' }, { status: 400 });
		}

		const { data: existingUser } = await supabaseServer.from(TABLES.USERS).select('id').eq('id', user.id).maybeSingle();

		if (existingUser) {
			return NextResponse.json<ApiResponse>({
				ok: false,
				message: '이미 등록된 사용자입니다.',
			});
		}

		const { error: createUserError } = await supabaseServer.from(TABLES.USERS).insert({
			id: user.id,
			nickname: user.user_metadata?.nickname,
			display_name: user.user_metadata?.nickname,
			user_login: 'email',
			user_registered_at: new Date().toISOString(),
			role: 'user',
		});

		if (createUserError) {
			console.error('Create user error:', createUserError);

			// 중복 키 에러 처리
			if (createUserError.code === '23505') {
				return NextResponse.json<ApiResponse>({
					ok: false,
					message: '이미 등록된 사용자입니다.',
				});
			}

			return NextResponse.json<ApiResponse>({ ok: false, error: `사용자 등록 실패: ${createUserError.message}` }, { status: 500 });
		}

		return NextResponse.json({ ok: true, message: '사용자 등록 성공' });
	} catch (error) {
		console.error('Verify error:', error);
		return NextResponse.json<ApiResponse>({ ok: false, error: '사용자 등록 중 오류가 발생했습니다.' }, { status: 500 });
	}
}
