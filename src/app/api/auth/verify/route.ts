import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { TABLE } from '@/lib/supabase/tableMap';

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

		if (!user.email) {
			return NextResponse.json({ ok: false, error: '이메일 정보가 없습니다.' }, { status: 400 });
		}

		const provider = user?.app_metadata?.provider;

		if (provider === 'email') {
			if (!user.email_confirmed_at) {
				return NextResponse.json({ ok: false, error: '이메일 인증이 완료되지 않았습니다.' }, { status: 400 });
			}
		}

		const { data: legacyUsers, error: getLegacyUserError } = await supabaseServer
			.from(TABLE.LEGACY_USERS)
			.select('legacy_user_id')
			.eq('email', user?.email)
			.limit(1);

		if (getLegacyUserError) {
			console.error('Get Legacy User Error', getLegacyUserError);
		}

		const legacyUser = legacyUsers?.[0] ?? null;

		const displayName = provider === 'google' ? user.user_metadata?.name : user.user_metadata?.nickname;
		const finalDisplayName = displayName ?? user.email.split('@')[0];

		const { error: createUserError } = await supabaseServer.from(TABLE.PROFILES).upsert(
			{
				id: user.id,
				nickname: finalDisplayName,
				display_name: finalDisplayName,
				user_login: provider,
				user_registered_at: new Date().toISOString(),
				role: user?.user_metadata?.role ?? 'user',
				legacy_user_id: legacyUser ? legacyUser?.legacy_user_id : null,
			},
			{ onConflict: 'id' },
		);

		if (createUserError) {
			console.error('Create user error:', createUserError);

			return NextResponse.json<ApiResponse>({ ok: false, error: `사용자 등록 실패: ${createUserError.message}` }, { status: 500 });
		}

		return NextResponse.json({ ok: true, message: '사용자 등록 성공' });
	} catch (error) {
		console.error('Verify error:', error);
		return NextResponse.json<ApiResponse>({ ok: false, error: '사용자 등록 중 오류가 발생했습니다.' }, { status: 500 });
	}
}
