import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
	try {
		const supabaseServer = await createClient();

		const {
			data: { session },
		} = await supabaseServer.auth.getSession();

		if (!session) {
			return NextResponse.json({ error: '인증 정보 없음' }, { status: 401 });
		}

		const { data: existingUser } = await supabaseServer.from('users').select('id').eq('id', session?.user?.id).single();

		if (existingUser) {
			return NextResponse.json({ error: '사용자 존재' }, { status: 401 });
		}

		const { data, error: createUserError } = await supabaseServer.from('users').insert({
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
