import { LayoutFixedLoader } from '@/components';
import { LoaderCircle } from 'lucide-react';

export default function LessonLoading() {
	return <LayoutFixedLoader icon={<LoaderCircle className="animate-spin" size={18} />} />;
}
