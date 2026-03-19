'use server';

import { decrypt } from '@/lib/crypto';
import { OfflineCourseStudentRow, TABLE, OFFLINE_COURSE_STUDENT_LIST_PAGE_SIZE } from '@/lib/supabase';
import { createClient } from '@/lib/supabase/server';
import { mapOfflineCourseStudentRowToView } from '@/types';

export async function getOfflineCourseStudentListByPage(page: number) {
	const supabase = await createClient();
	const pageSize = OFFLINE_COURSE_STUDENT_LIST_PAGE_SIZE;

	const { data, error } = await supabase
		.from(TABLE.OFFLINE_COURSE_STUDENTS)
		.select('*')
		.order('created_at', { ascending: false })
		.range((page - 1) * pageSize, page * pageSize - 1);

	if (error) throw new Error(error.message);

	return Promise.all(
		(data ?? ([] as OfflineCourseStudentRow[])).map(mapOfflineCourseStudentRowToView).map(async student => ({
			...student,
			phoneNumber: await decrypt(student.phoneNumber ?? ''),
			accountNumber: await decrypt(student.accountNumber ?? ''),
		})),
	);
}
