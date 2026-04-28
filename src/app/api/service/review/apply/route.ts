import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { TABLE } from '@/lib/supabase';

export async function POST(request: NextRequest) {
	try {
		const supabase = await createClient();

		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) return NextResponse.json({ success: false }, { status: 401 });

		const data = await request.json();

		const { error } = await supabase.from(TABLE.COURSE_REVIEWS).insert({
			...data,
		});

		if (error) throw error;

		return NextResponse.json({ success: true });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
