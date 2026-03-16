'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowUpRight, BadgeAlert, Eye, EyeOff } from 'lucide-react';
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
} from '@/components';
import { courseOptions, fieldName } from '@/constants';
import { maskAccountNumber } from '@/utils/bank';
import { cn } from '@/lib/utils';

export default function ApplyCouresContext() {
	const [step, setStep] = React.useState<'info' | 'confirm'>('info');
	const [isAccountNumberVisible, setIsAccountNumberVisible] = React.useState(false);

	const defaultValues = {
		option: courseOptions[0],
		program: '',
		name: '',
		email: '',
		phoneNumber: '',
		description: '',
		bank: '',
		accountNumber: '',
	} as const;

	const form = useForm<ApplyFormSchema>({
		resolver: zodResolver(applyFormSchema),
		mode: 'onBlur',
		defaultValues,
	});

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button type="button" size="lg" className="w-full rounded-lg font-bold" disabled={true}>
					신청하러 가기
					<ArrowUpRight size={18} />
				</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col min-w-[40dvw] h-[90dvh]">
				{step === 'info' ? (
					<>
						<DialogHeader>
							<DialogTitle className="text-xl text-left font-bold sm:text-2xl">수업 신청하기</DialogTitle>
							<DialogDescription asChild>
								<Callout message={'꼭 하단의 [수업 옵션]을 선택해주세요'} icon={<BadgeAlert size={16} />} />
							</DialogDescription>
						</DialogHeader>

						<ApplyForm form={form} />
					</>
				) : (
					<>
						<DialogHeader>
							<Button type="button" variant="outline" className="w-fit" onClick={() => setStep('info')}>
								<ArrowLeft size={18} />
								다시 확인하기
							</Button>
							<DialogTitle className="mt-2 text-xl text-left font-bold sm:text-2xl">정보 확인하기</DialogTitle>
						</DialogHeader>
						<ul className="flex flex-col gap-4 h-full overflow-y-auto scrollbar-thin">
							{Object.keys(defaultValues).map(name => {
								return (
									<li key={name} className="flex flex-col gap-1">
										<span className="text-sm font-bold">{fieldName[name as keyof typeof defaultValues]}</span>
										<span
											className={cn(
												'p-2 text-sm bg-muted rounded-lg',
												name === 'accountNumber' ? 'inline-flex justify-between items-center' : '',
											)}>
											{name === 'accountNumber'
												? isAccountNumberVisible
													? form.getValues()[name as keyof typeof defaultValues]
													: maskAccountNumber(form.getValues()[name] || '')
												: name === 'phoneNumber'
													? formatPhoneNumber(form.getValues()[name]!)
													: form.getValues()[name as keyof typeof defaultValues] || '해당 없음'}

											{name === 'accountNumber' && (
												<Button type="button" variant="outline" size="icon-sm" onClick={() => setIsAccountNumberVisible(prev => !prev)}>
													{isAccountNumberVisible ? <EyeOff size={16} /> : <Eye size={16} />}
												</Button>
											)}
										</span>
									</li>
								);
							})}
						</ul>
					</>
				)}

				<DialogFooter className="flex flex-row justify-end items-center gap-2">
					<DialogClose asChild>
						<Button type="button" variant="outline" size="lg">
							취소하기
						</Button>
					</DialogClose>
					<Button
						type="button"
						disabled={false}
						size="lg"
						form="apply-form"
						onClick={async () => {
							if (step === 'info') {
								const isValid = await form.trigger();

								if (!isValid) return;
								setStep('confirm');
								return;
							}

							if (step === 'confirm') {
								//
							}
						}}>
						{step === 'info' ? '신청하기' : '제출하기'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
