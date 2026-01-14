'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AnimateLoader } from '@/components';
import { route } from '@/constants';
import { createClient } from '@/lib/supabase/client';

export default function VerifyPage() {
	const router = useRouter();
	const supabase = createClient();

	React.useEffect(() => {
		const verifyUser = async () => {
			try {
				const {
					data: { session },
				} = await supabase.auth.getSession();

				if (!session) {
					toast.error('이메일 인증 완료 후 다시 시도해주세요.');
					return;
				}

				// 서버 API 호출
				const response = await fetch('/api/auth/verify', { method: 'POST' });

				const data = await response.json();

				if (!response.ok) {
					const message = data?.error;
					throw { status: response.status, message };
				}

				console.log(data);

				toast.success('검증 성공');
				router.refresh();
				router.push(route.AUTH.LOGIN);
			} catch (error) {
				console.error(error);
				toast.error('검증 실패');
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
