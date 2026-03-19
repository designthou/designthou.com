import React from 'react';
import { OfflineClassTableWithTriggers } from '@/components';
import { TABLE } from '@/lib/supabase';
import { createClient } from '@/lib/supabase/server';
import { decrypt } from '@/lib/crypto';
import { mapOfflineCourseStudentRowToView } from '@/types';

export default async function OfflineClassPage() {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from(TABLE.OFFLINE_COURSE_STUDENTS)
		.select('*')
		.order('created_at', { ascending: false })
		.range(0, 999);

	if (error) throw new Error(error.message);

	const initialData = await Promise.all(
		(data ?? []).map(mapOfflineCourseStudentRowToView).map(async student => ({
			...student,
			phoneNumber: await decrypt(student.phoneNumber ?? ''),
			accountNumber: await decrypt(student.accountNumber ?? ''),
		})),
	);

	return (
		<section className="p-4 w-full">
			<h2 className="font-black font-mono text-xl" aria-label="User List Page Title">
				Offline Class Students
			</h2>
			<React.Suspense fallback={<div>Loading...</div>}>
				<OfflineClassTableWithTriggers initialData={initialData} />
			</React.Suspense>
		</section>
	);
}
