import Link from 'next/link';
import { route } from '@/constants';

export default async function AuthNotFound() {
	return (
		<div className="flex-1 ui-flex-center h-screen">
			<Link href={route.AUTH.LOGIN} className="p-3 bg-black text-white rounded-lg">
				Go Back
			</Link>
		</div>
	);
}
