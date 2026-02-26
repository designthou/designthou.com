import { convertSupabaseDateToShortHumanReadable, TABLE } from '@/lib/supabase';
import { createStaticClient } from '@/lib/supabase/static';
import sanitizeHtmlServer from '@/utils/sanitizeHtml';
import { generateGradient } from '@/utils/seedGradient';

async function getRecentReviewList() {
	const supabase = createStaticClient({
		global: {
			fetch: (url, options) =>
				fetch(url, {
					...options,
					next: { revalidate: 3600 },
				}),
		},
	});

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
}

export default async function ReviewSection() {
	const recentReviewList = await getRecentReviewList();

	return (
		<div className="flex gap-4 w-full overflow-x-auto scrollbar-thin">
			{recentReviewList.map(({ title, content, username, created_at }, idx) => (
				<div
					key={idx}
					className="flex flex-col justify-between gap-4 p-4 min-h-90 min-w-[300px] border border-muted rounded-lg sm:min-w-[350px]">
					<div className="text-base font-bold">{title}</div>
					<p className="max-w-[300px] line-clamp-8 text-sm" dangerouslySetInnerHTML={{ __html: content }} />
					<div className="flex gap-4">
						<div className="w-12 h-12 rounded-full" style={{ background: generateGradient(content) }} />
						<div className="flex flex-col gap-1">
							<span className="py-1.5 px-3 bg-gray-100 text-sm text-center text-gray-600 font-semibold rounded-lg">{username}</span>
							<span className="inline-block p-1.5 text-xs text-gray-500 rounded-lg">
								{convertSupabaseDateToShortHumanReadable(created_at)}
							</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
