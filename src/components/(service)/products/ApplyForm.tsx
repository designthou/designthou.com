/* eslint-disable react-hooks/incompatible-library */
'use client';

import { UseFormReturn } from 'react-hook-form';
import {
	ApplyFormSchema,
	Callout,
	Form,
	formatPhoneNumber,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Textarea,
} from '@/components';
import { banks, courseOptions, programs } from '@/constants';
import React from 'react';
import { maskAccountNumber } from '@/utils/bank';

export default function ApplyForm({ form }: { form: UseFormReturn<ApplyFormSchema> }) {
	const [isFocused, setIsFocused] = React.useState(false);

	return (
		<Form {...form}>
			<form id="apply-form" className="flex flex-col gap-8 p-1 h-full overflow-y-auto scrollbar-thin">
				<FormField
					control={form.control}
					name="option"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">수업 옵션 ⭐️⭐️</FormLabel>
							<Select
								onValueChange={value => {
									field.onChange(value);

									if (value === courseOptions.at(-1)) {
										form.resetField('program');
									}
								}}
								defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="w-full cursor-pointer truncate">
										<SelectValue placeholder="카테고리 선택" />
									</SelectTrigger>
								</FormControl>
								<SelectContent className="max-h-60">
									<SelectGroup>
										{courseOptions.map((option, idx) => (
											<SelectItem key={`${option}_${idx}`} value={option} className="cursor-pointer">
												{option}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				{(form.watch('option') === courseOptions[0] || form.watch('option') === courseOptions[1]) && (
					<FormField
						control={form.control}
						name="program"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-semibold">프로그램 ⭐️</FormLabel>
								<Select
									onValueChange={value => {
										field.onChange(value);
										form.trigger('program');
									}}
									defaultValue={field.value!}>
									<FormControl>
										<SelectTrigger className="w-full cursor-pointer">
											<SelectValue placeholder="프로그램 선택" />
										</SelectTrigger>
									</FormControl>
									<SelectContent className="max-h-60">
										<SelectGroup>
											{programs.map((program, idx) => (
												<SelectItem key={`${program}_${idx}`} value={program} className="cursor-pointer">
													{program}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">이 름</FormLabel>
							<FormControl>
								<Input placeholder="김도우" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">이메일</FormLabel>
							<FormControl>
								<Input placeholder="designthou@naver.com" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="phone_number"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">전화번호</FormLabel>
							<FormControl>
								<Input
									value={formatPhoneNumber(field.value)}
									onChange={e => {
										const value = e.target.value.replace(/\D/g, '').slice(0, 11);
										field.onChange(value);
										form.trigger();
									}}
									inputMode="numeric"
									maxLength={13}
									placeholder="010-1234-5678"
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex flex-col gap-2">
					<div className="grid grid-cols-5 gap-2">
						<FormField
							control={form.control}
							name="bank"
							render={({ field }) => (
								<FormItem className="col-span-2">
									<FormLabel className="font-semibold">은행</FormLabel>

									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger className="w-full cursor-pointer">
												<SelectValue placeholder="은행 선택" />
											</SelectTrigger>
										</FormControl>
										<SelectContent className="max-h-60">
											<SelectGroup>
												{banks.map((bank, idx) => (
													<SelectItem key={`${bank}_${idx}`} value={bank} className="cursor-pointer">
														{bank}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="account_number"
							render={({ field }) => (
								<FormItem className="col-span-3">
									<FormLabel className="font-semibold">계좌번호</FormLabel>
									<FormControl>
										<Input
											value={isFocused ? field.value : maskAccountNumber(field.value)}
											onChange={e => {
												field.onChange(e.target.value.replace(/\D/g, '').slice(0, 14));
												form.trigger();
											}}
											onFocus={() => setIsFocused(true)}
											onBlur={() => {
												setIsFocused(false);
												field.onBlur();
											}}
											inputMode="numeric"
											placeholder="계좌번호를 입력하세요"
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Callout message="입금 확인 및 추후 환불을 위한 계좌번호를 입력해 주세요." className="w-full text-sm" />
				</div>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">추가 정보</FormLabel>
							<FormControl>
								<Textarea
									placeholder="현재 자신의 상황에 대해서 설명해주세요. 특히, 어떤 부분을 얻어가고 싶은지 작성해 주세요. (프로그램 다뤄본 경험 등)"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
