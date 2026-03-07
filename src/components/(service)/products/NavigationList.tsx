'use client';

import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';

const navItems = [
	{ href: '#notice', label: '안내사항' },
	{ href: '#introduction', label: '소 개' },
	{ href: '#curriculum', label: '커리큘럼' },
	{ href: '#faq', label: 'FAQ' },
	{ href: '#review', label: '리 뷰' },
];

export default function NavigationList() {
	const [activeId, setActiveId] = React.useState('notice');

	return (
		<ul className="sticky top-[var(--global-layout-nav-height-with-notify)] flex items-center gap-4 my-2 py-3 px-1.5 border-b border-muted bg-white/30 backdrop-blur-sm z-40">
			{navItems.map(({ href, label }) => {
				const id = href.replace('#', '');

				return (
					<li
						key={href}
						className="list-none ui-flex-center"
						onClick={e => {
							e.stopPropagation();
							setActiveId(id);
						}}>
						<Link
							href={href}
							className={cn(
								'px-3 py-2 min-w-20 text-center font-semibold rounded-lg transition-colors',
								activeId === id ? 'bg-primary text-white' : 'hover:bg-muted',
							)}>
							{label}
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
