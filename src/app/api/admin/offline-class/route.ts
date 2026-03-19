import { NextRequest } from 'next/server';
import { decrypt } from '@/lib/crypto';
import { OfflineCourseStudentRow, TABLE } from '@/lib/supabase';
import { createClient } from '@/lib/supabase/server';
import { mapOfflineCourseStudentRowToView } from '@/types';
import { OFFLINE_COURSE_STUDENT_LIST_PAGE_SIZE } from '@/lib/supabase';

export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;

	const page = Number(searchParams.get('page') ?? 1);
	const pageSize = OFFLINE_COURSE_STUDENT_LIST_PAGE_SIZE;

	const supabase = await createClient();

	const { data, error } = await supabase
		.from(TABLE.OFFLINE_COURSE_STUDENTS)
		.select('*')
		.order('created_at', { ascending: false })
		.range((page - 1) * pageSize, page * pageSize - 1);

	if (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}

	const decrypted = await Promise.all(
		(data ?? ([] as OfflineCourseStudentRow[])).map(mapOfflineCourseStudentRowToView).map(async student => ({
			...student,
			phoneNumber: await decrypt(student.phoneNumber ?? ''),
			accountNumber: await decrypt(student.accountNumber ?? ''),
		})),
	);

	return Response.json(decrypted);
}
