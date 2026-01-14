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
		const { data: listener } = supabaseClient.auth.onAuthStateChange((_event, session) => {
			if (session?.user) {
				fetch('/api/auth/verify', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						id: session.user.id,
						email: session.user.email,
						nickname: session.user.user_metadata?.nickname,
					}),
				})
					.then(() => {
						router.refresh();
						router.push(route.AUTH.LOGIN);
						toast.success('검증 완료');
					})
					.catch(() => toast.error('검증 실패'));
			}
		});

		return () => {
			listener.subscription.unsubscribe();
		};
	}, [supabaseClient, router]);

	return (
		<div className="ui-flex-center flex-col gap-4 w-full h-full">
			<p className="text-center w-full">Verifying ...</p>
			<AnimateLoader />
		</div>
	);
}
