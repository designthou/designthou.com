'use client';

import { useRouter } from 'next/navigation';
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
	ResetPasswordSchema,
	resetPasswordSchema,
} from '@/components';
import { route } from '@/constants';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/stores';

export default function ResetPasswordForm() {
	const form = useForm<ResetPasswordSchema>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
	});

	const supabase = createClient();
	const [isPending, setIsPending] = React.useState(false);
	const router = useRouter();

	const resetUser = useAuthStore(({ resetUser }) => resetUser);

	React.useEffect(() => {
		const loadSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (session?.user?.email) {
				form.setValue('email', session.user.email);
			}
		};

		loadSession();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onSubmit = async (values: ResetPasswordSchema) => {
		setIsPending(true);
		try {
			const { error: updateUserError } = await supabase.auth.updateUser({ password: values?.password });
			if (updateUserError) {
				throw new Error(updateUserError.message);
			}

			const { error: signOutError } = await supabase.auth.signOut({ scope: 'local' });

			if (signOutError) {
				throw new Error(signOutError?.message);
			}

			resetUser();

			router.refresh();
			router.push(route.AUTH.LOGIN);
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
					{isPending ? <AnimateLoader /> : 'Update password'}
				</Button>
			</form>
		</Form>
	);
}
