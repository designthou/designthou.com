import { cache } from 'react';
import { createStaticClient } from '@/lib/supabase/static';
import { TABLE } from '@/lib/supabase';
import { mapOnlineCourseRowToView } from '@/types';

export const getCourse = cache(async (courseId: string) => {
	const supabase = createStaticClient();

	const { data, error } = await supabase.from(TABLE.ONLINE_COURSES).select('*').eq('id', courseId).single();

	if (error) throw error;

	return mapOnlineCourseRowToView(data);
});
