'use client';

import React from 'react';
import Link from 'next/link';
import { CloudAlertIcon, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
	AddReviewForm,
	AnimateLoader,
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
import { DialogClose } from '@radix-ui/react-dialog';
import { useAddReviewMutation } from '@/hooks/mutations/reviews';
import { reviewFormSchema, ReviewFormSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/stores';
import { route } from '@/constants';

export default function AddReviewContext() {
	const form = useForm<ReviewFormSchema>({
		resolver: zodResolver(reviewFormSchema),
		defaultValues: {
			title: '생생한 포트폴리오 후기입니다.',
			content: '후기를 작성해 주세요.',
		},
	});

	const user = useAuthStore(({ user }) => user);
	const { mutate: add, isPending } = useAddReviewMutation({
		trigger: form.getValues('category'),
		handler: {
			onSuccess: () => {
				setIsContextOpen(false);
				form.reset();
			},
		},
	});
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
			{isContextOpen && (
				<DialogContent className="flex flex-col min-w-[40dvw] md:min-w-[600px] h-[90dvh] overflow-y-auto scrollbar-thin">
					<DialogHeader>
						<DialogTitle className="text-xl text-left font-bold">리뷰 작성</DialogTitle>
						<DialogDescription asChild>
							<Callout
								message={
									!user?.id ? (
										<div className="ui-flex-center-between gap-4">
											<p>로그인 후에 후기를 작성해 주세요</p>
											<Button type="button" variant="outline" size="sm" asChild>
												<Link href={route.AUTH.LOGIN}>Login</Link>
											</Button>
										</div>
									) : (
										<p>제목, 카테고리, 내용을 입력해 주세요.</p>
									)
								}
								icon={<CloudAlertIcon size={16} />}
							/>
						</DialogDescription>
					</DialogHeader>
					<AddReviewForm form={form} />
					<DialogFooter className="flex flex-row justify-end items-center gap-2 mt-auto">
						<DialogClose asChild>
							<Button type="button" variant="ghost" size="lg">
								취소하기
							</Button>
						</DialogClose>
						<Button
							type="button"
							size="lg"
							form="review-apply-form"
							disabled={!user || isPending}
							onClick={() => {
								if (user?.id) {
									add({
										...form.getValues(),
										user_id: user?.id,
										username: user?.user_metadata.nickname,
										view_count: 0,
										comment_id: null,
										is_secret: false,
										notice: false,
										password: null,
										created_at: new Date().toISOString(),
										updated_at: new Date().toISOString(),
									});
								}
							}}>
							{isPending && <AnimateLoader />}
							제출하기
						</Button>
					</DialogFooter>
				</DialogContent>
			)}
		</Dialog>
	);
}
