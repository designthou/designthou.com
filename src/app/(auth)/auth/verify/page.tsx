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
		const {
			data: { subscription },
		} = supabaseClient.auth.onAuthStateChange(async (_event, session) => {
			if (session?.user) {
				try {
					console.log('authStateChange', session);
					const response = await fetch('/api/auth/verify', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							id: session.user.id,
							email: session.user.email,
							nickname: session.user.user_metadata?.nickname,
						}),
					});

					if (!response.ok) {
						throw new Error(await response.text());
					}

					toast.success('검증 성공');
					router.refresh();
					router.push(route.AUTH.LOGIN);
				} catch (error) {
					console.error(error);
					toast.error('검증 실패');
				}
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [supabaseClient, router]);

	return (
		<div className="ui-flex-center flex-col gap-4 w-full h-full">
			<p className="text-center w-full">Verifying ...</p>
			<AnimateLoader />
		</div>
	);
}
