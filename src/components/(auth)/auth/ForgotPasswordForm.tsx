'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useForgotPassword } from '@/hooks';
import {
	AnimateLoader,
	Button,
	forgotPasswordSchema,
	ForgotPasswordSchema,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { route } from '@/constants';

export default function ForgotPasswordForm() {
	const form = useForm<ForgotPasswordSchema>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: '',
		},
	});

	const router = useRouter();
	const { mutate: updatePassword, isPending } = useForgotPassword();

	const onSubmit = (values: ForgotPasswordSchema) => {
		const { email } = values;

		updatePassword(
			{ email },
			{
				onSuccess() {
					toast.success('비밀번호 재설정 이메일을 확인하세요!');
					router.push(route.ADMIN.ROOT);
				},
				onError(error) {
					console.error(error);
					form.resetField('email');
					toast.error(error?.message);
				},
			},
		);
	};

	return (
		<div className="flex flex-col gap-4 mt-8 p-8 bg-white rounded-lg">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type="email" placeholder="hello-designthou@gmail.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" variant="outline" size="lg">
						{isPending ? <AnimateLoader /> : 'Send reset email'}
					</Button>
				</form>
			</Form>
		</div>
	);
}
