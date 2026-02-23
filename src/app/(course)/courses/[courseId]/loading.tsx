import { LayoutFixedLoader } from '@/components';
import { LoaderCircle } from 'lucide-react';

export default function CourseLoading() {
	return <LayoutFixedLoader icon={<LoaderCircle className="animate-spin" size={18} />} />;
}
