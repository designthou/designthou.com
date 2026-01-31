'use client';

import Link from 'next/link';
import { ChevronRight, House, LayoutDashboard } from 'lucide-react';
import { useSelectedLayoutSegment } from 'next/navigation';
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
	ProfileDropdown,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarRail,
	CollapsibleTrigger,
	Collapsible,
	CollapsibleContent,
} from '@/components';
import { route } from '@/constants';

// const tabs = [
// 	{ title: 'Curriculum', query: 'curriculum', icon: <NotebookTabs size={18} /> },
// 	{ title: 'Q&A', query: 'Q&A', icon: <CircleQuestionMark size={18} /> },
// ];

const curriculum = [
	{
		chapter: 'Welcome',
		section: [
			{ id: 'adjflajjdfjlsajdf', title: `1. 'studio HYK'의 건축 클래스를 소개합니다!`, videoUrl: 'https://youtube.com' },
			{ id: 'adjflajjd23jlsajdf', title: `2. 프로그램을 왜? 어떻게 배워야할까?`, videoUrl: 'https://youtube.com' },
		],
	},
	{
		chapter: 'Chapter 01',
		section: [
			{ id: '23234234234', title: `1. 스케치업 소개 및 작업환경 세팅`, videoUrl: 'https://youtube.com' },
			{ id: 'adfkljasdfj', title: `2. 인터페이스 및 기본 조작`, videoUrl: 'https://youtube.com' },
		],
	},
];

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const segment = useSelectedLayoutSegment();
	console.log(segment);

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<ProfileDropdown user={null} />
			</SidebarHeader>
			<SidebarContent className="gap-0">
				{curriculum.map(item => (
					<Collapsible key={item.chapter} title={item.chapter} defaultOpen className="group/collapsible">
						<SidebarGroup>
							<SidebarGroupLabel>
								<CollapsibleTrigger className="flex justify-between items-center w-full">
									<span className="text-sm font-semibold">{item.chapter}</span>
									<ChevronRight size={16} className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
								</CollapsibleTrigger>
							</SidebarGroupLabel>
							<CollapsibleContent>
								<SidebarGroupContent key={item.chapter}>
									<SidebarMenu>
										{item.section.map(({ id, title }) => (
											<SidebarMenuItem key={title}>
												<SidebarMenuButton asChild>
													<Link href={`/courses/lecture/?courseId=${123}&unitId=${id}`}>
														<span className="">{title}</span>
														{id === segment && (
															<div className="hidden mr-2 w-1.5 h-1.5 rounded-full bg-gradient-orange-100 lg:inline-block" />
														)}
													</Link>
												</SidebarMenuButton>
											</SidebarMenuItem>
										))}
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
							<span className="hidden lg:inline">대시보드로 가기</span>
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
