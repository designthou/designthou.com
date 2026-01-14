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
					method: 'GET',
				});

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
