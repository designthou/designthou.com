'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AnimateLoader } from '@/components';
import { route } from '@/constants';

export default function VerifyPage() {
	const router = useRouter();

	React.useEffect(() => {
		const verifyUser = async () => {
			try {
				const response = await fetch('/api/auth/verify', {
					method: 'POST',
					credentials: 'include', // include cookie
				});

				const data = await response.json();

				if (!response.ok) {
					throw new Error(data?.error || '검증에 실패했습니다.');
				}

				toast.success('이메일 인증이 완료되었습니다!');
				router.push(route.AUTH.LOGIN);
			} catch (error) {
				console.error(error);
				toast.error(error instanceof Error ? error.message : '검증 실패');

				router.push(route.AUTH.LOGIN);
			}
		};

		verifyUser();
	}, [router]);

	return (
		<div className="w-full h-full">
			<div className="ui-flex-center flex-col gap-4 p-8 rounded-lg">
				<p className="text-center text-gray-700 w-full">Verifying ...</p>
				<AnimateLoader />
			</div>
		</div>
	);
}
