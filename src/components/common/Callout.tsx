import React from 'react';
import { cn } from '@/lib/utils';

export default function Callout({ message, icon, className }: { message: React.ReactNode; icon?: React.ReactNode; className?: string }) {
	return (
		<div className={cn('flex items-center gap-2 p-1.5 w-fit bg-light font-semibold text-gray-600 text-sm rounded-lg ', className)}>
			{icon} {message}
		</div>
	);
}
