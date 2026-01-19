import sanitizeHtmlServer from '@/utils/sanitizeHtml';
import { createClient } from '../client';
import { type Review } from '../tableSchema';
import { v4 as uuid } from 'uuid';
import { TABLE } from '../tableMap';
import { STORAGE_BUCKETS } from '../storageBuckets';

const REVIEW_LIST_PAGE_SIZE = 20;

const getReviewListPageInfo = async () => {
	const supabase = createClient();
	const { data, error } = await supabase.from(TABLE.ONLINE_COURSE_REVIEWS).select('*').explain({ format: 'json', analyze: true });

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

const getReviewsTotalCount = async () => {
	const supabase = createClient();
	const { data, error } = await supabase.from(TABLE.ONLINE_COURSE_REVIEWS).select('*');

	if (error) {
		throw new Error(error.message);
	}

	return data.length;
};

const getPortfolioReviewList = async () => {
	const supabase = createClient();
	const { data, error } = await supabase
		.from(TABLE.ONLINE_COURSE_REVIEWS)
		.select('*')
		.order('created_at', { ascending: false })
		.eq('category', 'portfolio')
		.limit(6);

	if (error) {
		throw new Error(error.message);
	}

	return data?.map(review => ({
		...review,
		content: sanitizeHtmlServer(review.content),
	}));
};

const getReviewListByPage = async (pageParam: number, pageSize: number, category: string): Promise<Review[]> => {
	const supabase = createClient();

	const { data, error } = await supabase
		.from(TABLE.ONLINE_COURSE_REVIEWS)
		.select('*')
		.eq('category', category)
		.order('view_count', { ascending: false })
		.order('created_at', { ascending: false })
		.range((pageParam - 1) * pageSize, pageParam * pageSize - 1);

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

const getNoticeReview = async () => {
	const supabase = createClient();
	const { data, error } = await supabase.from(TABLE.ONLINE_COURSE_REVIEWS).select().eq('notice', true).single();

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

//TODO: add userid
const uploadImageInTextEditor = async ({ imageFile }: { imageFile: File }) => {
	const supabase = createClient();

	const filePath = `user/${Date.now()}-${uuid()}`;
	const { data: uploadImage, error: uploadImageError } = await supabase.storage.from(STORAGE_BUCKETS.REVIEWS).upload(filePath, imageFile, {
		cacheControl: '3600',
		upsert: false,
		// metadata: { owner: data?.user_id }, // notify owner
	});

	if (uploadImageError) {
		throw {
			error: uploadImageError,
			message: 'Error to upload on image storage happens',
		};
	}

	return uploadImage.fullPath;
};

const addReview = async ({ data }: { data: Review }) => {
	const supabase = createClient();

	const { error: addReviewError } = await supabase.from(TABLE.ONLINE_COURSE_REVIEWS).insert(data).select();

	if (addReviewError) {
		throw { error: addReviewError, message: 'Error to add review happens' };
	}
};

export {
	REVIEW_LIST_PAGE_SIZE,
	getReviewListPageInfo,
	getReviewsTotalCount,
	getPortfolioReviewList,
	getReviewListByPage,
	getNoticeReview,
	uploadImageInTextEditor,
	addReview,
};
