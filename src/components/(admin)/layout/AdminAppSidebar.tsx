'use client';

import Link from 'next/link';
// import { useSelectedLayoutSegment } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { House } from 'lucide-react';
import {
	Button,
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	// SidebarMenuButton,
	// SidebarMenuItem,
} from '@/components';
import { route } from '@/constants';
import { ProfileDropdown } from '../profile';

export default function AdminAppSidebar({ user }: { user: User | null }) {
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader />
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{/* {linkWithRoutes.map(({ title, to, icon }) => (
								<SidebarMenuItem key={title}>
									<SidebarMenuButton asChild>
										<Link href={to}>
											{icon}
											<span>{title}</span>
											{to === route.ADMIN.ROOT + '/' + segment && (
												<div className="hidden mr-2 w-1.5 h-1.5 rounded-full bg-gradient-orange-100 lg:inline-block" />
											)}
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))} */}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter>
				<div className="flex flex-col gap-1 px-1">
					<div className="p-1 border border-muted rounded-lg">
						<ProfileDropdown user={user} />
					</div>
					<div className="ui-flex-center p-1 border border-muted rounded-lg">
						<Button type="button" variant="default" className="w-full font-bold" asChild>
							<Link href={route.SERVICE.ROOT} target="_blank" className="text-sm">
								<House size={18} />
								<span className="hidden lg:inline">사용자 홈</span>
							</Link>
						</Button>
					</div>
				</div>

				<small className="text-default mx-3 mb-2 mt-1 hidden text-[0.5rem] opacity-50 lg:block">
					© 2025{' '}
					<Link href={route.SERVICE.ROOT} className="hover:underline" target="_blank">
						DESIGNTHOU
					</Link>
				</small>
			</SidebarFooter>
		</Sidebar>
	);
}
