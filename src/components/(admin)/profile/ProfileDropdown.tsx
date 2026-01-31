'use client';

import Link from 'next/link';
import { User as UserIcon } from 'lucide-react';
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
	GradientCircle,
	LogoutButton,
} from '@/components';
import { SiteConfig } from '@/app/config';
import { route } from '@/constants';

export default function ProfileDropdown({ user }: { user: User | null }) {
	return (
		<DropdownMenu>
			{
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="py-1 w-full">
						<UserIcon />
						<span className="hidden font-semibold lg:inline-block">{user?.user_metadata?.nickname}</span>
					</Button>
				</DropdownMenuTrigger>
			}
			<DropdownMenuContent className="my-2 -ml-1 p-2 w-54 bg-gray-50" align="start">
				<DropdownMenuLabel className="flex items-center gap-2">
					<GradientCircle trigger={user?.email ?? SiteConfig.url} className="p-3 w-3 h-3" />
					<div className="flex flex-col gap-2">
						<span className="text-xs">{user?.email}</span>
						<span className="text-xs text-gray-500">@{user?.user_metadata?.nickname}</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link href={route.ADMIN.MYPAGE} className="w-full">
							<span>MyPage</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem disabled>Email</DropdownMenuItem>
					<DropdownMenuItem disabled>Settings</DropdownMenuItem>
				</DropdownMenuGroup>

				{user?.role === 'admin' && (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<Link href={route.OUTER.GITHUB} target="_blank" rel="noopener noreferrer" className="w-full">
								<span>Github</span>
							</Link>
						</DropdownMenuItem>
					</>
				)}

				<DropdownMenuSeparator />
				<LogoutButton />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
