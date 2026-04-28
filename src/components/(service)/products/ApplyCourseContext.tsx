'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowUpRight, BadgeAlert, Eye, EyeOff, Link2 } from 'lucide-react';
import {
	Callout,
	ApplyForm,
	applyFormSchema,
	ApplyFormSchema,
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	formatPhoneNumber,
	AnimateLoader,
} from '@/components';
import { courseOptions, fieldName, outerLink, route } from '@/constants';
import { maskAccountNumber } from '@/utils/bank';
import { cn } from '@/lib/utils';
import { useAddOfflineCourseStudentMutation } from '@/hooks';

export default function ApplyCouresContext() {
	const router = useRouter();

	const [step, setStep] = React.useState<'intro' | 'info' | 'confirm'>('intro');
	const [isAccountNumberVisible, setIsAccountNumberVisible] = React.useState(false);
	const [isContextOpen, setIsContextOpen] = React.useState(false);

	const defaultValues = {
		option: courseOptions[0],
		program: '',
		name: '',
		email: '',
		phone_number: '',
		description: '',
		bank: '',
		account_number: '',
	} as const;

	const form = useForm<ApplyFormSchema>({
		resolver: zodResolver(applyFormSchema),
		defaultValues,
	});

	const toggle = (open: boolean) => {
		setIsContextOpen(open);

		if (!open) setStep('intro');
	};

	const { mutate: add, isPending: isAddPending } = useAddOfflineCourseStudentMutation({
		onSuccess: () => {
			setIsContextOpen(false);
			setStep('info');

			form.reset();

			router.push(`${route.SERVICE.APPLY_COMPLETE}?from=apply`);
		},
	});

	return (
		<Dialog open={isContextOpen} onOpenChange={toggle}>
			<DialogTrigger asChild>
				<Button type="button" size="lg" className="w-full rounded-sm font-bold" disabled={false}>
					신청하러 가기
					<ArrowUpRight size={18} />
				</Button>
			</DialogTrigger>
			{isContextOpen && (
				<DialogContent
					className={cn(
						'flex flex-col min-w-[40dvw] md:min-w-[600px]',
						step !== 'intro' ? 'h-[90dvh] overflow-y-auto scrollbar-thin' : '',
					)}>
					{step === 'intro' && (
						<>
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
								<Button asChild size="lg" className="w-full bg-black cursor-pointer">
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
						</>
					)}
					{step === 'info' && (
						<>
							<DialogHeader>
								<Button type="button" variant="outline" className="w-fit" onClick={() => setStep('intro')}>
									<ArrowLeft size={18} />
									상담하러 가기
								</Button>
								<DialogTitle className="mt-2 text-xl text-left font-bold sm:text-2xl">수업 신청하기</DialogTitle>
								<DialogDescription asChild>
									<Callout message={'꼭 하단의 [수업 옵션]을 선택해주세요'} icon={<BadgeAlert size={16} />} />
								</DialogDescription>
							</DialogHeader>

							<ApplyForm form={form} />
						</>
					)}
					{step === 'confirm' && (
						<>
							<DialogHeader>
								<Button type="button" variant="outline" className="w-fit" onClick={() => setStep('info')}>
									<ArrowLeft size={18} />
									수정하기
								</Button>
								<DialogTitle className="mt-2 text-xl text-left font-bold sm:text-2xl">정확히 입력했는지 꼭 확인해주세요</DialogTitle>
							</DialogHeader>
							<ul className="flex flex-col gap-4">
								{Object.keys(defaultValues).map(name => {
									return (
										<li key={name} className="flex items-center gap-4">
											<span className="min-w-14 text-sm text-gray-600 font-bold">{fieldName[name as keyof typeof defaultValues]}</span>
											<div
												className={cn(
													'p-2 text-sm bg-muted text-gray-600 rounded-lg',
													name === 'account_number' ? 'inline-flex w-full justify-between items-center' : '',
												)}>
												<span>
													{name === 'account_number'
														? isAccountNumberVisible
															? form.getValues()?.[name as keyof typeof defaultValues]
															: maskAccountNumber(form.getValues()?.[name] || '')
														: name === 'phone_number'
															? formatPhoneNumber(form.getValues()?.[name] || '')
															: form.getValues()?.[name as keyof typeof defaultValues] || '해당 없음'}
												</span>

												{name === 'account_number' && (
													<Button type="button" variant="outline" size="icon-sm" onClick={() => setIsAccountNumberVisible(prev => !prev)}>
														{isAccountNumberVisible ? <EyeOff size={16} /> : <Eye size={16} />}
													</Button>
												)}
											</div>
										</li>
									);
								})}
							</ul>
							<ul className="p-3 text-gray-600 text-sm">
								<li className="list-disc">여러분의 전화번호, 계좌번호 등 소중한 데이터는 암호화되어 저장됩니다</li>
							</ul>
						</>
					)}

					<DialogFooter className="flex flex-row justify-end items-center gap-2 mt-auto">
						<DialogClose asChild>
							<Button type="button" variant="ghost" size="lg">
								취소하기
							</Button>
						</DialogClose>
						<Button
							type="button"
							disabled={isAddPending}
							size="lg"
							variant={'default'}
							form="apply-form"
							onClick={async () => {
								if (step === 'intro') {
									setStep('info');
								}

								if (step === 'info') {
									const isValid = await form.trigger();

									if (!isValid) return;
									setStep('confirm');
									return;
								}

								if (step === 'confirm') {
									add({ ...form.getValues(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() });
								}
							}}>
							{isAddPending && <AnimateLoader />}
							{step === 'intro' && '상담 완료'}
							{step === 'info' && '신청하기'}
							{step === 'confirm' && '제출하기'}
						</Button>
					</DialogFooter>
				</DialogContent>
			)}
		</Dialog>
	);
}
