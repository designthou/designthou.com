import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
	try {
		const supabaseServer = await createClient();

		const {
			data: { session },
		} = await supabaseServer.auth.getSession();

		if (!session) {
			return NextResponse.json({ error: '인증 정보 없음' }, { status: 401 });
		}

		const supabaseAdmin = createAdminClient();
		const { data, error: createUserError } = await supabaseAdmin.from('users').insert({
			id: session?.user?.id,
			nickname: session?.user?.user_metadata.nickname,
			display_name: session?.user?.user_metadata.nickname,
			user_login: 'email',
			user_registered: new Date().toISOString(),
		});

		if (createUserError) {
			console.error(createUserError?.message);
			return NextResponse.json({ error: createUserError.message }, { status: 500 });
		}

		console.log(data);
		return NextResponse.json({ ok: true });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: '사용자 추가 실패' }, { status: 500 });
	}
}
