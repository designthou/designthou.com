import Link from 'next/link';
import { route } from '@/constants';

export default function NotFound() {
	return (
		<div className="flex-1 ui-flex-center gap-8 flex-col h-screen">
			<h1 className="ui-flex-center p-4 text-black text-4xl font-black rounded-lg">Designthou</h1>
			<p className="font-bold text-2xl font-mono">404</p>
			<Link href={route.SERVICE.ROOT} className="p-3 bg-black text-white rounded-lg">
				홈으로 가기
			</Link>
		</div>
	);
}
