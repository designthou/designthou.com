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

export default function ProfileDropdown({ user }: { user: User | null }) {
	return (
		<DropdownMenu>
			{
				<DropdownMenuTrigger asChild>
					<Button variant="default" size="lg" className="px-2 rounded-lg">
						<ProfileAvatar user={user} />
						<span className="hidden font-semibold lg:inline-block">{user?.user_metadata?.name ?? user?.user_metadata?.nickname}</span>
					</Button>
				</DropdownMenuTrigger>
			}
			<DropdownMenuContent className="my-2 -ml-1 p-2 w-54 bg-gray-50" align="start">
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
							<span>MyPage</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<LogoutButton />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
