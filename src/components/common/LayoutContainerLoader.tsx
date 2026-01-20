import React from 'react';
import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LayoutContainerLoader({
	className,
	icon = <Loader className="animate-spin" size={18} />,
}: {
	className?: string;
	icon?: React.ReactNode;
}) {
	return <div className={cn('ui-flex-center inset-0 w-full h-screen', className)}>{icon}</div>;
}
