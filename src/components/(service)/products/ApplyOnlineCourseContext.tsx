'use client';

import Link from 'next/link';
import React from 'react';
import { ArrowUpRight, BadgeAlert, Link2 } from 'lucide-react';
import {
	Dialog,
	DialogTrigger,
	Button,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogClose,
	DialogFooter,
} from '@/components';
import { Callout } from '@/components/common';
import { cn } from '@/lib/utils';
import { outerLink } from '@/constants';

export default function ApplyOnlineCourseContext() {
	const [isContextOpen, setIsContextOpen] = React.useState(false);
	const [isOpenChatClicked, setIsOpenChatClicked] = React.useState(false);

	const toggle = (open: boolean) => {
		setIsContextOpen(open);
	};

	return (
		<Dialog open={isContextOpen} onOpenChange={toggle}>
			<DialogTrigger asChild>
				<Button type="button" size="lg" className="w-full rounded-sm font-bold" disabled={false}>
					신청하러 가기
					<ArrowUpRight size={18} />
				</Button>
			</DialogTrigger>
			{isContextOpen && (
				<DialogContent className={cn('flex flex-col min-w-[40dvw] md:min-w-[600px] h-[50dvh] overflow-y-auto scrollbar-thin')}>
					<DialogHeader>
						<DialogTitle className="text-xl text-left font-bold sm:text-2xl">수업 신청하기</DialogTitle>
						<DialogDescription asChild>
							<Callout
								message={'수업 신청 전 하단의 카카오톡 오픈 채팅방에서 상담 후, 클래스를 신청해 주세요'}
								icon={<BadgeAlert size={16} />}
								className="text-start"
							/>
						</DialogDescription>
					</DialogHeader>

					<div className="flex flex-col gap-4 mt-4 mb-8 p-4 bg-muted rounded-lg">
						<Button asChild size="lg" className="w-full bg-black cursor-pointer" onClick={() => setIsOpenChatClicked(true)}>
							<Link href={outerLink.CONSULTING} target="_blank">
								<Link2 size={18} />
								오픈 채팅방에서 상담하기
							</Link>
						</Button>
						<ul className="ml-4">
							<li className="list-disc text-muted-foreground text-sm">
								개인 상담 후, 이 페이지로 돌아와주세요. 관련 정보 등록 후, 최종 등록이 완료됩니다.
							</li>
							<li className="list-disc text-muted-foreground text-sm">이미 완료하셨다면, [상담 완료] 버튼을 눌러주세요.</li>
						</ul>
					</div>
					<DialogFooter className="flex flex-row justify-end items-center gap-2 mt-auto">
						<DialogClose asChild>
							<Button type="button" variant="ghost" size="lg">
								취소하기
							</Button>
						</DialogClose>
						<Button type="button" size="lg" variant={isOpenChatClicked ? 'default' : 'secondary'} onClick={() => setIsContextOpen(false)}>
							상담완료
						</Button>
					</DialogFooter>
				</DialogContent>
			)}
		</Dialog>
	);
}
