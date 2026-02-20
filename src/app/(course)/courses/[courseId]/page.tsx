import { Callout } from '@/components';
import { Rotate3D } from 'lucide-react';

export default async function CoursePage() {
	return (
		<section className="grid place-items-center h-[calc(100dvh-96px)]">
			<Callout message="원하는 영상을 통해 학습을 시작해보세요!" icon=<Rotate3D size={18} /> className="mx-auto p-4 bg-gradient-gray-100" />
		</section>
	);
}
