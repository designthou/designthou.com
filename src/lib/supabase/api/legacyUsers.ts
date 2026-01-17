import { createClient } from '../client';
import { type LegacyUser } from '../schema';
import { TABLES } from '../tables';

const getLegacyUserListByPage = async ({
	pageParam,
	pageSize,
}: {
	pageParam: number;
	pageSize: number;
	year: string;
}): Promise<LegacyUser[]> => {
	const supabase = createClient();

	const { data, error } = await supabase
		.from(TABLES.LEGACY_USERS)
		.select('*')
		.order('created_at', { ascending: false })
		.range((pageParam - 1) * pageSize, pageParam * pageSize - 1);

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export { getLegacyUserListByPage };
