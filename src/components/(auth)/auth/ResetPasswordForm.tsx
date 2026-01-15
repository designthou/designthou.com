'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
	AnimateLoader,
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	PasswordInput,
	ResetPasswordSchema,
	resetPasswordSchema,
} from '@/components';
import { route } from '@/constants';
import { useAuthStore } from '@/stores';
import { useUpdateUser } from '@/hooks';

export default function ResetPasswordForm() {
	const searchParams = useSearchParams();

	const form = useForm<ResetPasswordSchema>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			email: searchParams.get('email') ?? '',
			password: '',
			confirmPassword: '',
		},
	});

	const router = useRouter();

	const { mutate: updateUser, isPending } = useUpdateUser();
	const resetUser = useAuthStore(({ resetUser }) => resetUser);

	React.useEffect(() => {
		const emailFromQuery = searchParams.get('email');
		if (emailFromQuery) form.setValue('email', emailFromQuery);
	}, [searchParams, form]);

	const onSubmit = async (values: ResetPasswordSchema) => {
		updateUser(
			{ password: values?.password },
			{
				onSuccess() {
					resetUser();

					router.push(route.AUTH.LOGIN);
					toast.success('비밀번호 재설정 성공');
				},
				onError(error) {
					console.error(error);
					toast.error(error?.message || '오류 발생, 비밀번호 재설정 실패');
				},
			},
		);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8 mt-8">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>이메일</FormLabel>
							<FormControl>
								<Input type="email" placeholder="hello-designthou@gmail.com" disabled={true} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>비밀번호</FormLabel>
							<FormControl>
								<PasswordInput placeholder="Password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>비밀번호 확인</FormLabel>
							<FormControl>
								<PasswordInput placeholder="Password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" variant="default" size="lg">
					{isPending ? <AnimateLoader /> : 'Update password'}
				</Button>
			</form>
		</Form>
	);
}
