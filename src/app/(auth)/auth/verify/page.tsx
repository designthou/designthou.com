'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { route } from '@/constants';
import { AnimateLoader } from '@/components';

export default function VerifyPage() {
	const router = useRouter();

	const supabaseClient = createClient();

	React.useEffect(() => {
		const verifyUser = async () => {
			try {
				const {
					data: { session },
					error,
				} = await supabaseClient.auth.getSession();
				if (error || !session) {
					toast.error('검증 오류 발생');
					return;
				}

				// 서버에 POST 요청으로 users 테이블 insert
				const res = await fetch('/api/auth/verify', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ id: session?.user?.id, email: session?.user?.email, nickname: session?.user?.user_metadata.nickname }),
				});

				if (res.ok) {
					router.refresh();
					router.push(route.AUTH.LOGIN);
					toast.success('성공적으로 검증 완료');
				}
			} catch (error) {
				console.error(error);
				toast.error('검증 오류 발생');
			}
		};

		verifyUser();
	}, [supabaseClient, router]);

	return (
		<div className="ui-flex-center flex-col gap-4 w-full h-full">
			<p className="text-center w-full">Verifying ...</p>
			<AnimateLoader />
		</div>
	);
}
