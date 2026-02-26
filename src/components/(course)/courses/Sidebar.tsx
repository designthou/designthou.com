'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { ChevronRight, LayoutDashboard } from 'lucide-react';
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
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarRail,
	CollapsibleTrigger,
	Collapsible,
	CollapsibleContent,
	useSidebar,
	ServiceProfileDropdown,
} from '@/components';
import { route } from '@/constants';
import { useCourseCurriculum, useIsMobile } from '@/hooks';
import { cn } from '@/lib/utils';

// const tabs = [
// 	{ title: 'Curriculum', query: 'curriculum', icon: <NotebookTabs size={18} /> },
// 	{ title: 'Q&A', query: 'Q&A', icon: <CircleQuestionMark size={18} /> },
// ];

/**
 *
 * 1. course -> profile dashboard 에서 확인 후, route에 전달된 slug를 활용하여 어떤 코스인지 판단
 * 2. courseId를 기준으로 chapters 들을 가져오고, chapter 각 내부에 위치한 lessons들을 가져올 수 있도록 구현
 */
export default function AppSidebar({
	courseId,
	user,
	...props
}: { courseId: string; user: User | null } & React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname();
	const curriculums = useCourseCurriculum({ courseId });

	const { toggleSidebar } = useSidebar();
	const isMobile = useIsMobile();

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<ServiceProfileDropdown user={user} triggerVariant={'outline'} menuContentMargin="ml-0" />
			</SidebarHeader>
			<SidebarContent>
				{curriculums.map(chapter => (
					<Collapsible key={chapter.id} title={chapter.title} defaultOpen className="group/collapsible">
						<SidebarGroup>
							<SidebarGroupLabel>
								<CollapsibleTrigger className="flex justify-between items-center w-full">
									<span className="text-left text-sm font-semibold">{chapter.title}</span>
									<ChevronRight size={16} className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
								</CollapsibleTrigger>
							</SidebarGroupLabel>
							<CollapsibleContent>
								<SidebarGroupContent key={chapter.id}>
									<SidebarMenu className="mt-3">
										{chapter.lessons.map(({ id, title, order_index }) => {
											return (
												<SidebarMenuItem key={title}>
													<SidebarMenuButton
														asChild
														variant={pathname.includes(id) ? 'outline' : 'default'}
														className={cn('relative', pathname.includes(id) ? 'font-bold' : '')}>
														<Link
															href={`/courses/${courseId}/lessons/${id}`}
															onClick={() => {
																if (!isMobile) return;

																toggleSidebar();
															}}>
															<span className="truncate">
																{order_index}. {title}
															</span>
															{pathname?.includes(id) && (
																<div className="absolute top-1 right-1 hidden mr-2 w-1.5 h-1.5 rounded-full bg-gradient-orange-100 sm:inline-block" />
															)}
														</Link>
													</SidebarMenuButton>
												</SidebarMenuItem>
											);
										})}
									</SidebarMenu>
								</SidebarGroupContent>
							</CollapsibleContent>
						</SidebarGroup>
					</Collapsible>
				))}
			</SidebarContent>
			<SidebarRail />
			<SidebarFooter>
				<div className="ui-flex-center p-1 border border-muted rounded-lg">
					<Button type="button" variant="default" className="w-full font-bold" asChild>
						<Link href={route.SERVICE.DASHBOARD} target="_blank" className="text-sm">
							<LayoutDashboard size={16} />
							<span className="">My Dashboard</span>
						</Link>
					</Button>
				</div>
				<small className="text-default mx-3 mb-2 mt-1 hidden text-[0.5rem] opacity-50 lg:block">
					© 2026{' '}
					<Link href={route.SERVICE.ROOT} className="hover:underline" target="_blank">
						DESIGNTHOU
					</Link>
				</small>
			</SidebarFooter>
		</Sidebar>
	);
}
