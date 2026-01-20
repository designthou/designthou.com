import { LayoutFixedLoader } from '@/components';
import { LoaderCircle } from 'lucide-react';

export default function Loading() {
	return <LayoutFixedLoader className="lg:pl-56" icon={<LoaderCircle size={21} className="animate-spin" />} />;
}
