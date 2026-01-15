'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button, AnimateLoader } from '@/components';
import { route } from '@/constants';
import { useLogout } from '@/hooks';
import { useAuthStore } from '@/stores';
import { cn } from '@/lib/utils';

export default function LogoutButton({ className }: { className?: string }) {
	const router = useRouter();
	const resetUser = useAuthStore(({ resetUser }) => resetUser);

	const { mutateAsync: logout, isPending } = useLogout();

	return (
		<Button
			type="button"
			variant="outline"
			className={cn('w-full', className)}
			onClick={async () => {
				try {
					await logout();

					toast.success('로그아웃 성공');
					resetUser();

					router.push(route.AUTH.LOGIN);
				} catch {
					toast.error('로그아웃에 문제가 발생하였습니다.');
				}
			}}>
			{isPending ? <AnimateLoader /> : 'Log Out'}
		</Button>
	);
}
