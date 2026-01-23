import { cn } from '@/lib/utils';
import { Atom } from 'lucide-react';
import React from 'react';

export default function Wip({
	message,
	icon = <Atom size={18} className="text-black" />,
	className = '',
}: {
	message: string;
	icon?: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={cn(`flex items-center gap-3 px-6 py-3 w-full min-h-24 text-white bg-gradient-orange-100 rounded-lg`, className)}>
			<span>{icon}</span>
			<p className="font-semibold text-sm sm:text-base">{message}</p>
		</div>
	);
}
