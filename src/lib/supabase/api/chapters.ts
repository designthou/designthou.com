import { TABLE, ChapterRow } from '@/lib/supabase';
import { createClient } from '../client';

const getChaptersByCourseId = async ({ courseId }: { courseId: ChapterRow['course_id'] }): Promise<ChapterRow[]> => {
	const supabase = createClient();

	const { data, error } = await supabase.from(TABLE.CHAPTERS).select('*').eq('course_id', courseId);

	if (error) {
		throw error;
	}

	return data;
};

export { getChaptersByCourseId };
