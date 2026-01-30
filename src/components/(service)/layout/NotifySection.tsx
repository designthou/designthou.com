import { Activity } from 'lucide-react';

export default function NotifySection() {
	return (
		<div className="fixed top-0 ui-flex-center gap-2 h-8 w-full text-xs text-center font-semibold bg-black/90 backdrop-blur-sm text-white sm:text-sm z-40">
			<Activity size={12} />
			Designthou의 현재 일부 기능은 유지보수 작업 중에 있습니다.
		</div>
	);
}
