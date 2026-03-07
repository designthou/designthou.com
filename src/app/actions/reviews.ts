'use server';

import { revalidateTag } from 'next/cache';

export async function revalidateReviewsAction() {
	revalidateTag('reviews');
}
