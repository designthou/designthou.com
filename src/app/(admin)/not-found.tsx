import Link from 'next/link';
import { route } from '@/constants';

export default async function AdminNotFound() {
	return (
		<div className="flex-1 ui-flex-center h-screen">
			<Link href={route.ADMIN.DASHBOARD} className="p-3 bg-black text-white rounded-lg">
				Go To Home
			</Link>
		</div>
	);
}
