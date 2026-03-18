import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ApplyCompleteEmail } from '@/components';
import { encrypt } from '@/lib/crypto';
import { createClient } from '@/lib/supabase/server';
import { TABLE } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
	try {
		const data = await request.json();

		const supabase = await createClient();
		const { data: user } = await supabase.auth.getUser();

		const { error } = await supabase.from(TABLE.OFFLINE_COURSE_STUDENTS).insert({
			...data,
			user_id: user?.user?.id ?? null,
			bank: data?.bank,
			phone_number: await encrypt(data?.phone_number),
			account_number: await encrypt(data?.account_number),
		});

		if (error) throw error;

		await resend.emails.send({
			from: '디자인도우 <info@designthou.com>',
			to: data?.email,
			subject: `[신청완료] ${data?.option} - ${data?.program ?? ''} 수업 신청 등록 안내`,
			react: ApplyCompleteEmail({
				name: data?.name,
				title: `${data?.option} - ${data?.program ?? ''}`,
				option: data?.option,
				program: data?.program || '선택사항 없음',
			}),
		});

		return NextResponse.json({ success: true });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
