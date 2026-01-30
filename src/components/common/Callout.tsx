import React from 'react';
import { cn } from '@/lib/utils';

export default function Callout({ message, icon, className }: { message: string; icon: React.ReactNode; className?: string }) {
	return (
		<p className={cn('flex items-center gap-2 p-1.5 w-fit bg-light font-semibold text-gray-500 text-sm rounded-lg ', className)}>
			{icon} {message}
		</p>
	);
}
