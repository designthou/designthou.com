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
				// 서버 API 호출 (세션은 이미 callback에서 설정됨)
				const response = await fetch('/api/auth/verify', {
					method: 'POST',
					credentials: 'include', // include cookie
				});

				if (!response.ok) {
					const data = await response.json();
					throw new Error(data?.error || '검증 실패');
				}

				const data = await response.json();
				console.log(data);

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
		<div className="ui-flex-center flex-col gap-4 w-full h-full">
			<p className="text-center w-full">Verifying ...</p>
			<AnimateLoader />
		</div>
	);
}
