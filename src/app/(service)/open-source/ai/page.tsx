import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BLUR_DATA_URL, route } from '@/constants';
import { STORAGE_BUCKETS } from '@/lib/supabase';
import { createStaticClient } from '@/lib/supabase/static';
import { Badge, Button } from '@/components';

export default async function AdobeIllustratorOpenSourceListPage() {
	const supabase = createStaticClient();

	const [{ data: files, error }, { data: previewFiles }] = await Promise.all([
		supabase.storage.from(STORAGE_BUCKETS.OPEN_SOURCE_AI).list(''),
		supabase.storage.from(STORAGE_BUCKETS.OPEN_SOURCE_AI_PREVIEW).list(''),
	]);

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
		<section className="flex flex-col gap-4 my-4 p-4 mx-auto max-w-300 md:my-8">
			<Button asChild variant="secondary" className="w-fit">
				<Link href={route.SERVICE.OPEN_SOURCE}>
					<ArrowLeft /> Go back
				</Link>
			</Button>

			<h2 className="page-title">Open Source (.ai)</h2>

			<div className="grid grid-cols-2 gap-4 mt-8 md:grid-cols-4">
				{fileList?.map(({ name, baseName, previewFileName }, idx) => (
					<Link
						key={name}
						href={`/open-source/ai/${previewFileName}`}
						className="relative ui-flex-center border border-gray-100 bg-white rounded-lg text-gray-600 hover:ring-2 ring-gray-200 transition-all">
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
						<Badge className="absolute top-2 right-2 p-1 max-w-6 max-h-6 aspect-square rounded-full">{idx + 1}</Badge>
					</Link>
				))}
			</div>
		</section>
	);
}
