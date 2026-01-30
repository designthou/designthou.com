'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	applyFormSchema,
	ApplyFormSchema,
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

export default function ApplyForm() {
	const form = useForm<ApplyFormSchema>({
		resolver: zodResolver(applyFormSchema),
		defaultValues: {
			category: 'portfolio',
			name: '',
			email: '',
			phoneNumber: '',
			description: '',
		},
	});

	const onSubmit = async (values: ApplyFormSchema) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form id="apply-form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8 w-full">
				<FormField
					control={form.control}
					name="category"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">카테고리</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="w-full cursor-pointer">
										<SelectValue placeholder="카테고리 선택" />
									</SelectTrigger>
								</FormControl>
								<SelectContent className="max-h-60">
									<SelectGroup>
										{['Sketchup', 'Autocad', 'portfolio'].map((category, idx) => (
											<SelectItem key={`${category}_${idx}`} value={category} className="cursor-pointer">
												{category}
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
					name="phoneNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">전화번호</FormLabel>
							<FormControl>
								<Input
									value={formatPhoneNumber(field.value)}
									onChange={e => {
										const raw = e.target.value.replace(/\D/g, '');
										field.onChange(raw);
									}}
									inputMode="numeric"
									placeholder="01012345678"
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">추가 정보</FormLabel>
							<FormControl>
								<Textarea placeholder="현재 상황에 대해서 설명해주세요. 특히, 어떤 부분을 얻어가고 싶은지 작성해 주세요." {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
