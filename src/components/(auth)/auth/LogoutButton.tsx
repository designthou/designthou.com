'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button, AnimateLoader } from '@/components';
import { route } from '@/constants';
import { useLogout } from '@/hooks';
import { useAuthStore } from '@/stores';

export default function LogoutButton() {
	const router = useRouter();
	const resetUser = useAuthStore(({ resetUser }) => resetUser);

	const { mutateAsync: logout, isPending } = useLogout();

	return (
		<Button
			type="button"
			variant="outline"
			size="lg"
			className="w-full"
			onClick={async () => {
				try {
					await logout();

					toast.success('로그아웃 성공');
					resetUser();

					router.refresh();
					router.push(route.AUTH.LOGIN);
				} catch {
					toast.error('로그아웃에 문제가 발생하였습니다.');
				}
			}}>
			{isPending ? <AnimateLoader /> : 'Log Out'}
		</Button>
	);
}
