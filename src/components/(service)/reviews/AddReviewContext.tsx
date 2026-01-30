'use client';

import React from 'react';
import { CloudAlertIcon, Plus } from 'lucide-react';
import {
	AddReviewForm,
	Button,
	Callout,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components';

export default function AddReviewContext() {
	const [isContextOpen, setIsContextOpen] = React.useState(false);

	const toggle = (open: boolean) => setIsContextOpen(open);

	return (
		<Dialog open={isContextOpen} onOpenChange={toggle}>
			<DialogTrigger asChild>
				<Button type="button" size="lg" className="font-semibold">
					<Plus size={18} />
					리뷰 작성하기
				</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col min-w-[60dvw]">
				<DialogHeader>
					<DialogTitle className="text-xl text-left font-bold">리뷰 작성</DialogTitle>
					<DialogDescription asChild>
						<Callout message="현재 지원하지 않는 기능입니다. 곧 지원 예정입니다." icon={<CloudAlertIcon size={16} />} />
					</DialogDescription>
				</DialogHeader>
				<AddReviewForm
					footer={
						<DialogFooter>
							<Button type="submit" size="lg" disabled={true}>
								제출하기
							</Button>
						</DialogFooter>
					}
				/>
			</DialogContent>
		</Dialog>
	);
}
