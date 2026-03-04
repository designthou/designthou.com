import Image from 'next/image';
import { Metadata } from 'next';
import { Sparkle } from 'lucide-react';
import { Wip } from '@/components';
import { SiteConfig } from '@/app/config';
import { BLUR_DATA_URL } from '@/constants';
import { STORAGE_BUCKETS } from '@/lib/supabase';
import { createStaticClient } from '@/lib/supabase/static';

export const metadata: Metadata = {
	title: SiteConfig.title.OPEN_SOURCE,
	description: SiteConfig.description.OPEN_SOURCE,
	openGraph: {
		title: SiteConfig.title.OPEN_SOURCE,
		description: SiteConfig.title.OPEN_SOURCE,
		images: [
			{
				url: `${SiteConfig.url}/og/static`,
				width: 1200,
				height: 630,
			},
		],
	},
};

export default async function ServiceOpenSourcePage() {
	const supabase = createStaticClient();

	const { data: files, error } = await supabase.storage.from(STORAGE_BUCKETS.OPEN_SOURCE_AI).list('');
	const { data: previewFiles } = await supabase.storage.from(STORAGE_BUCKETS.OPEN_SOURCE_AI_PREVIEW).list('');

	if (error || !files) throw error;

	const previewSet = new Set(previewFiles?.map(file => file.name.replace(/\.[^.]+$/, '')));

	const fileList = files?.map(file => {
		const baseName = file.name.replace(/\.[^.]+$/, '');
		const hasPreview = previewSet.has(baseName);

		return { name: file.name, baseName, hasPreview };
	});

	return (
		<section className="p-4 max-w-300">
			<h2 className="page-title">Open Source</h2>
			<Wip
				icon={<Sparkle size={20} />}
				message="Open Source Download feature will activate soon!"
				className="mt-8 bg-none border border-muted text-primary"
			/>
			<div className="grid grid-cols-5 gap-4 mt-8">
				{fileList?.map(({ name, baseName, hasPreview }) => (
					<div key={name} className="ui-flex-center border border-gray-100 bg-white rounded-lg hover:bg-light">
						{hasPreview ? (
							<Image
								src={supabase.storage.from(STORAGE_BUCKETS.OPEN_SOURCE_AI_PREVIEW).getPublicUrl(`${baseName}.png`).data.publicUrl}
								alt={baseName}
								width={300}
								height={300}
								placeholder="blur"
								blurDataURL={BLUR_DATA_URL}
								className="rounded-lg"
							/>
						) : (
							<div className="p-4">🎨 {name}</div>
						)}
					</div>
				))}
			</div>
		</section>
	);
}
