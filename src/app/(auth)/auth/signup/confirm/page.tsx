'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { createClient } from '@/lib/supabase/client';
import { route } from '@/constants';

export default function ConfirmPage() {
	const router = useRouter();

	React.useEffect(() => {
		const supabase = createClient();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			if (session?.user) {
				router.replace(route.ADMIN.ROOT);
			}
		});

		return () => subscription.unsubscribe();
	}, [router]);
	return (
		<div className="flex flex-col items-center justify-center h-screen gap-4">
			<h2 className="text-lg font-semibold">이메일 인증을 처리 중입니다</h2>
			<p className="text-sm text-muted-foreground">잠시만 기다려 주세요...</p>
		</div>
	);
}
