'use client';

import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	LogoutButton,
	ProfileAvatar,
} from '@/components';
import { route } from '@/constants';
import { cn } from '@/lib/utils';

export default function ProfileDropdown({
	user,
	triggerVariant = 'default',
	menuContentMargin = '-ml-1',
}: {
	user: User | null;
	triggerVariant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'link';
	menuContentMargin?: string;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={triggerVariant} size="lg" className="px-2 rounded-lg">
					<ProfileAvatar user={user} />
					<span className="hidden font-semibold lg:inline-block">{user?.user_metadata?.name ?? user?.user_metadata?.nickname}</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className={cn('my-2 p-2 w-54 bg-gray-50', menuContentMargin)} align="start">
				<DropdownMenuLabel className="flex items-center gap-2">
					<ProfileAvatar user={user} />
					<div className="flex flex-col gap-2">
						<span className="text-xs">{user?.email}</span>
						<span className="text-xs text-gray-500">@{user?.user_metadata?.name ?? user?.user_metadata?.nickname}</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup className="mb-1">
					<DropdownMenuItem asChild>
						<Link href={route.SERVICE.DASHBOARD} className="w-full">
							<span>My Dashboard</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<LogoutButton />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
