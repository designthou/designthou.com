import { LoaderCircle } from 'lucide-react';
import { LayoutLoader } from '@/components';

export default function ReviewsLoading() {
	return <LayoutLoader icon={<LoaderCircle size={21} className="animate-spin" />} />;
}
