import { createClient } from '@/lib/supabase/server';
import { OfflineStudentsTableWithTriggers } from '@/components';
import { OfflineStudentRow, TABLE } from '@/lib/supabase';
import { mapOfflineStudentsRowToView } from '@/types';

export default async function OfflineStudentsPage() {
	const supabase = await createClient();

	const { data, error: offlineStudentsError } = await supabase
		.from(TABLE.OFFLINE_STUDENTS)
		.select('*')
		.order('class', { ascending: false })
		.range(0, 999);

	if (offlineStudentsError) {
		throw new Error(offlineStudentsError?.message);
	}

	const offlineStudents = (data ?? ([] as OfflineStudentRow[])).map(mapOfflineStudentsRowToView);
	return (
		<section className="p-4">
			<h2 className="font-black font-mono text-xl" aria-label="User List Page Title">
				오프라인 수강생 목록
			</h2>
			<OfflineStudentsTableWithTriggers offlineStudents={offlineStudents} />
		</section>
	);
}
