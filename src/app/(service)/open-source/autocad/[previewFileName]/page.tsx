import Link from 'next/link';
import Image from 'next/image';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button, Callout, DownloadButton } from '@/components';
import { BLUR_DATA_URL, route, smartFormatBytes } from '@/constants';
import { createClient } from '@/lib/supabase/server';
import { STORAGE_BUCKETS } from '@/lib/supabase';

export default async function OpenSourceItemPage({ params }: { params: Promise<{ previewFileName: string }> }) {
	const { previewFileName } = await params;

	const supabaseServerClient = await createClient();
	const { data: user } = await supabaseServerClient.auth.getUser();

	const { data: currentFiles } = await supabaseServerClient.storage
		.from(STORAGE_BUCKETS.OPEN_SOURCE_CAD_PREVIEW)
		.list('', { search: previewFileName, limit: 1 });

	const title = previewFileName.split('_DesignThou')[0];

	return (
		<section className="flex flex-col gap-4 my-4 p-4 mx-auto max-w-200 md:my-8">
			<Button asChild variant="secondary" className="w-fit">
				<Link href={route.SERVICE.OPEN_SOURCE_CAD}>
					<ArrowLeft /> Go back
				</Link>
			</Button>

			<h2 className="page-title">{title}</h2>

			<div className="grid grid-cols-1 gap-8 md:grid-cols-5">
				<div className="md:col-span-2 ui-flex-center w-fit border border-muted rounded-lg">
					{previewFileName ? (
						<Image
							src={supabaseServerClient.storage.from(STORAGE_BUCKETS.OPEN_SOURCE_CAD_PREVIEW).getPublicUrl(previewFileName).data.publicUrl}
							alt={previewFileName}
							width={300}
							height={300}
							sizes="300px, (max-width: 640px) 600px, (max-width: 1024px) 900px"
							placeholder="blur"
							blurDataURL={BLUR_DATA_URL}
							className="object-cover rounded-lg"
						/>
					) : (
						<div className="p-4">🎨 {title}</div>
					)}
				</div>

				<div className="md:col-span-3 flex flex-col justify-between gap-4 p-4 w-full bg-light rounded-lg">
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-4">
							<span className="min-w-20 text-gray-700">File Type</span>
							<span className="font-bold">{'.dwg'}</span>
						</div>
						<div className="flex items-center gap-4">
							<span className="min-w-20 text-gray-700">File Size</span>
							<span className="font-bold">{smartFormatBytes(currentFiles?.[0].metadata?.size)}</span>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<DownloadButton fileName={previewFileName.replace('.png', '.dwg')} fileType={'autocad'} />
						{!user?.user && (
							<div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
								<Callout
									message="디자인도우 가입자만 다운로드 가능합니다"
									icon={<AlertCircle size={16} />}
									className="px-4 bg-gray-100 border border-gray-200 w-full"
								/>
								<Button asChild variant={'outline'} size="sm">
									<Link href={route.AUTH.SIGNUP}>회원가입하기</Link>
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
