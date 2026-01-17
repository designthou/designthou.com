import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import React from 'react';

export default function LayoutLoader({
	className,
	icon = <Loader className="animate-spin" size={18} />,
}: {
	className?: string;
	icon?: React.ReactNode;
}) {
	return <div className={cn('fixed top-0 left-0 right-0 bottom-0 ui-flex-center inset-0 z-9999', className)}>{icon}</div>;
}
