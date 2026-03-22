import Image from 'next/image';
import { Sparkle } from 'lucide-react';
import { Wip } from '@/components';
import { STORAGE_BUCKETS } from '@/lib/supabase';
import { createStaticClient } from '@/lib/supabase/static';
import { BLUR_DATA_URL } from '@/constants';

export default async function AdminOpenSourcePage() {
	const supabase = createStaticClient();

	const { data: files, error } = await supabase.storage.from(STORAGE_BUCKETS.OPEN_SOURCE_AI).list('');
	const { data: previewFiles } = await supabase.storage.from(STORAGE_BUCKETS.OPEN_SOURCE_AI_PREVIEW).list('');

	if (error || !files) throw error;

	const previewMap = new Map(
		previewFiles?.map(file => {
			const baseName = file.name.replace(/\.[^.]+$/, '');
			return [baseName, file.name]; // { 'image': 'image.jpg' }
		}),
	);

	const fileList = files?.map(file => {
		const baseName = file.name.replace(/\.[^.]+$/, '');
		const previewFileName = previewMap.get(baseName);

		return { name: file.name, baseName, previewFileName };
	});

	return (
		<section className="p-4">
			<Wip icon={<Sparkle size={18} />} message={'Open Source Page, Still Work in progress'} />
			<div className="grid grid-cols-5 gap-4 mt-8">
				{fileList?.map(({ name, baseName, previewFileName }) => (
					<div key={name} className="ui-flex-center border border-gray-100 bg-white rounded-lg hover:bg-light">
						{previewFileName ? (
							<Image
								src={supabase.storage.from(STORAGE_BUCKETS.OPEN_SOURCE_AI_PREVIEW).getPublicUrl(previewFileName).data.publicUrl}
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
