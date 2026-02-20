import { LessonRow, TABLE } from '@/lib/supabase';
import { createClient } from '../client';

const getLessonsByCourseId = async ({ courseId }: { courseId: string }): Promise<LessonRow[]> => {
	const supabase = createClient();
	const { data, error } = await supabase
		.from(TABLE.LESSONS)
		.select('*')
		.eq('course_id', courseId)
		.order('order_index', { ascending: true });

	if (error) {
		throw error;
	}

	return data;
};

export { getLessonsByCourseId };
