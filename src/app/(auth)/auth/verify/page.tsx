'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { AnimateLoader } from '@/components';
import { route } from '@/constants';

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

				if (error || !session?.user) {
					toast.error('검증 오류 발생');
					return;
				}

				const response = await fetch('/api/auth/verify', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						id: session.user.id,
						email: session.user.email,
						nickname: session.user.user_metadata?.nickname,
					}),
				});

				const data = await response.json();

				if (!response.ok) {
					console.log('here', response);
					throw { status: response.status, body: data };
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
	}, [supabaseClient, router]);

	return (
		<div className="ui-flex-center flex-col gap-4 w-full h-full">
			<p className="text-center w-full">Verifying ...</p>
			<AnimateLoader />
		</div>
	);
}
