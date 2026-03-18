import { OfflineCourseStudentRow } from '../tableSchema';
import { createClient } from '../client';
import { TABLE } from '../tableMap';

const OFFLINE_COURSE_STUDENT_LIST_PAGE_SIZE = 20;

const getOfflineCourseStudentByPage = async ({
	pageParam,
	pageSize,
}: {
	pageParam: number;
	pageSize: number;
}): Promise<OfflineCourseStudentRow[]> => {
	const supabase = createClient();

	const { data, error } = await supabase
		.from(TABLE.NEWS)
		.select('*')
		.order('created_at', { ascending: false })
		.range((pageParam - 1) * pageSize, pageParam * pageSize - 1);

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

const addOfflineCourseStudent = async (data: Omit<OfflineCourseStudentRow, 'id' | 'user_id'>) => {
	const supabase = createClient();

	console.log(data);
	return await supabase
		.from(TABLE.OFFLINE_COURSE_STUDENTS)
		.insert({ ...data, user_id: null })
		.select();
};

const updateOfflineCourseStudent = async ({ data }: { data: OfflineCourseStudentRow }) => {
	const supabase = createClient();
	return await supabase.from(TABLE.OFFLINE_COURSE_STUDENTS).update(data).eq('id', data.id).select();
};

const deleteOfflineCourseStudent = async ({ id }: { id: string }) => {
	const supabase = createClient();
	return await supabase.from(TABLE.OFFLINE_COURSE_STUDENTS).delete().eq('id', id);
};

export {
	OFFLINE_COURSE_STUDENT_LIST_PAGE_SIZE,
	getOfflineCourseStudentByPage,
	addOfflineCourseStudent,
	updateOfflineCourseStudent,
	deleteOfflineCourseStudent,
};
