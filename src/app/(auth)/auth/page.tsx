import { route } from '@/constants';
import { redirect } from 'next/navigation';

export default function AuthRootPage() {
	redirect(route.AUTH.LOGIN);
}
