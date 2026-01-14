'use client';

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
	ResetPasswordSchema,
	resetPasswordSchema,
} from '@/components';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/stores';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function ResetPasswordForm({ email }: { email: string }) {
	const form = useForm<ResetPasswordSchema>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			email,
			password: '',
			confirmPassword: '',
		},
	});

	const [isPending, setIsPending] = React.useState(false);

	const resetUser = useAuthStore(({ resetUser }) => resetUser);

	const onSubmit = async (values: ResetPasswordSchema) => {
		setIsPending(true);
		try {
			const supabase = createClient();
			const { error: updateUserError } = await supabase.auth.updateUser({ password: values?.password });
			if (updateUserError) {
				throw new Error(updateUserError.message);
			}

			const { error: signOutError } = await supabase.auth.signOut({ scope: 'local' });

			if (signOutError) {
				throw new Error(signOutError?.message);
			}

			resetUser();
			toast.success('비밀번호 재설정 성공');
		} catch (error) {
			console.error(error);
			toast.error('오류 발생, 비밀번호 재설정 실패');
		} finally {
			setIsPending(false);
		}
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
								<Input type="email" placeholder="hello-designthou@gmail.com" {...field} />
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
								<Input type="password" placeholder="Password" {...field} />
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
								<Input type="password" placeholder="Password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" variant="default" size="lg">
					{isPending ? <AnimateLoader /> : 'Sign Up'}
				</Button>
			</form>
		</Form>
	);
}
