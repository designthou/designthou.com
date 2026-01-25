'use client';

import Link from 'next/link';
import { useSuspenseQuery } from '@tanstack/react-query';
import { MotionBlock } from '@/components';
import { convertSupabaseDateToShortHumanReadable, getRecentNewsList } from '@/lib/supabase';
import { generateGradient } from '@/utils/seedGradient';
import { queryKey, staleTime } from '@/constants';

export default function HomeNewsList() {
	const { data: newsList } = useSuspenseQuery({
		queryKey: queryKey.SERVICE.RECENT_NEWS,
		queryFn: getRecentNewsList,
		staleTime: staleTime.SERVICE.NEWS_LIST.RECENT,
	});
	return (
		<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
			{newsList?.map(({ id, title, url, category, created_at }) => (
				<MotionBlock key={id}>
					<Link
						href={url}
						target="_blank"
						rel="noopenner noreferrer"
						className="flex justify-between gap-4 p-4 w-full h-full bg-light border border-muted rounded-lg">
						<div className="flex flex-col justify-between gap-4 w-full">
							<p className="font-semibold sm:text-base">{title}</p>
							<div className="ui-flex-center-between gap-4 w-full">
								<span className="text-gray-600 text-xs">{convertSupabaseDateToShortHumanReadable(created_at)}</span>
								<span className="px-2 py-1 text-gray-600 text-xs font-semibold border border-full border-gray-200 rounded-lg">
									{category}
								</span>
							</div>
						</div>
						<div className="flex justify-center h-full">
							<div
								className="p-4 w-[50px] h-[50px] rounded-full sm:w-[100px] sm:h-[100px] sm:rounded-xl"
								style={{ background: generateGradient(url) }}
							/>
						</div>
					</Link>
				</MotionBlock>
			))}
		</div>
	);
}
