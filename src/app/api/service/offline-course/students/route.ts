// app/api/offline-course/students/route.ts
import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/crypto';
import { TABLE } from '@/lib/supabase';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
	const supabase = await createClient();
	const { data, error } = await supabase.from(TABLE.OFFLINE_COURSE_STUDENTS).select('*');

	if (error) return NextResponse.json({ error }, { status: 500 });

	const decrypted = data.map(row => ({
		...row,
		phone_number: decrypt(row.phone_number),
		account_number: decrypt(row.account_number),
	}));

	return NextResponse.json(decrypted);
}
