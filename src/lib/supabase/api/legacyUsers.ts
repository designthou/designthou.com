import { type LegacyUserRow, TABLE } from '@/lib/supabase';
import { createClient } from '../client';

const getLegacyUserListByPage = async ({
	pageParam,
	pageSize,
}: {
	pageParam: number;
	pageSize: number;
	year: string;
}): Promise<LegacyUserRow[]> => {
	const supabase = createClient();

	const { data, error } = await supabase
		.from(TABLE.LEGACY_USERS)
		.select('*')
		.order('created_at', { ascending: false })
		.range((pageParam - 1) * pageSize, pageParam * pageSize - 1);

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export { getLegacyUserListByPage };
