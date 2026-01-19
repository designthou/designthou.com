import { createClient } from '../client';
import { TABLE } from '../tableMap';
import { LegacyUser } from '../tableSchema';

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
