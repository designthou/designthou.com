import { Play } from 'lucide-react';
import { Callout } from '@/components';

export default async function CoursePage() {
	return (
		<section className="grid place-items-center h-[calc(100dvh-96px)]">
			<Callout
				message="우측 사이드바의 원하는 영상을 클릭해 학습을 시작해보세요!"
				icon=<Play size={18} />
				className="mx-auto p-4 bg-gradient-gray-100 w-full h-full justify-center"
			/>
		</section>
	);
}
