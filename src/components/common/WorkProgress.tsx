import { Activity } from 'lucide-react';
import { Progress } from '@/components';

export default function WorkProgress() {
	return (
		<>
			<p className="flex items-center gap-3 py-6 px-3 bg-light text-sm text-gray-700 font-semibold rounded-lg border border-gray-100">
				<Activity size={21} />
				현재 디자인도우 플랫폼은 리뉴얼 중입니다. <br />
				플랫폼 내부 시스템 정비 후, 2026년 1월 중으로 재오픈 예정입니다.
			</p>
			<div>
				<h2 className="mb-3 font-bold">재정비 진도율 - {75}%</h2>
				<Progress value={75} className="w-full" />
			</div>
		</>
	);
}
