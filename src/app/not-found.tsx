import Link from 'next/link';
import './globals.css';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components';
import { route } from '@/constants';

export default function NotFound() {
	return (
		<div className="flex-1 ui-flex-center gap-4 flex-col h-screen">
			<h1 className="ui-flex-center p-4 text-black text-2xl font-black rounded-lg">Designthou</h1>
			<Button type="button" variant={'default'} size="lg" asChild className="font-semibold">
				<Link href={route.SERVICE.ROOT}>
					홈으로 가기
					<ArrowUpRight />
				</Link>
			</Button>
		</div>
	);
}
