'use client';

import { toast } from 'sonner';
import { Download } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { AnimateLoader, Button } from '@/components';
import { useAuthStore } from '@/stores';

export default function DownloadButton({ fileName, fileType }: { fileName: string; fileType: 'ai' | 'autocad' }) {
	const user = useAuthStore(({ user }) => user);

	const { mutate: download, isPending } = useMutation({
		async mutationFn({ fileName }: { fileName: string }) {
			const response = await fetch(`/api/service/open-source/download/${fileType}?filename=${encodeURIComponent(fileName)}`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));

				throw new Error(errorData?.error ?? '다운로드에 실패했습니다.');
			}

			const blob = await response.blob();
			const url = URL.createObjectURL(blob);

			const link = document.createElement('a');
			link.href = url;
			link.download = fileName;

			document.body.appendChild(link);
			link.click();

			document.body.removeChild(link);
			setTimeout(() => URL.revokeObjectURL(url), 100);
		},
		onSuccess() {
			toast.success('성공적으로 다운로드 했습니다. 저장해주세요');
		},
		onError(error) {
			toast.error(error?.message);
		},
	});

	return (
		<Button
			type="button"
			disabled={isPending || !user}
			onClick={() => {
				download({ fileName });
			}}>
			{isPending ? <AnimateLoader /> : <Download />}
			Download
		</Button>
	);
}
