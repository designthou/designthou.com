import Link from 'next/link';
import { route } from '@/constants';

export default function NotFound() {
	return (
		<div className="flex-1 ui-flex-center h-screen">
			<Link href={route.SERVICE.ROOT} className="p-3 bg-black text-white rounded-lg">
				홈으로 가기
			</Link>
		</div>
	);
}
