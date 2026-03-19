import { createClient } from '@/lib/supabase/server';
import { WCompArtStudentsTableWithTriggers } from '@/components';
import { WCompArtStudentRow, TABLE } from '@/lib/supabase';
import { mapOfflineStudentsRowToView } from '@/types';

export default async function WCompArtStudentsPage() {
	const supabase = await createClient();

	const { data, error: getWcomputerArtStudentsError } = await supabase
		.from(TABLE.WCOMP_ART_STUDENTS)
		.select('*')
		.order('class', { ascending: false })
		.range(0, 999);

	if (getWcomputerArtStudentsError) {
		throw new Error(getWcomputerArtStudentsError?.message);
	}

	const wcompArtStudents = (data ?? ([] as WCompArtStudentRow[])).map(mapOfflineStudentsRowToView);

	return (
		<section className="p-4">
			<h2 className="font-black font-mono text-xl" aria-label="User List Page Title">
				WComputer-Art 수강생 목록
			</h2>
			<WCompArtStudentsTableWithTriggers wcompArtStudents={wcompArtStudents} />
		</section>
	);
}
