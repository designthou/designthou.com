'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Button,
	Input,
	SignUpSchema,
	signUpSchema,
	AnimateLoader,
} from '@/components';
import { useSignup } from '@/hooks';
import { route } from '@/constants';

export default function SignupForm() {
	const form = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
			nickname: '',
		},
	});

	const router = useRouter();

	const { mutate: signup, isPending } = useSignup();

	const onSubmit = async (values: SignUpSchema) => {
		const { email, password, nickname } = values;

		signup(
			{ email, password, nickname },
			{
				onSuccess() {
					form.reset();
					toast.success('이메일을 확인해 주세요. 인증 후 로그인 가능합니다.');

					router.refresh();
					router.push(route.AUTH.LOGIN);
				},
				onError(error) {
					console.error(error);
					if (error.message.includes('already registered')) {
						form.setError('email', {
							message: '이미 가입된 이메일입니다',
						});
						toast.error('이미 가입된 이메일입니다.');
					} else {
						toast.error(error.message);
					}
				},
			},
		);
	};

	return (
		<div className="flex flex-col gap-4 mt-4 p-4 bg-white rounded-lg">
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
					<FormField
						control={form.control}
						name="nickname"
						render={({ field }) => (
							<FormItem>
								<FormLabel>닉네임</FormLabel>
								<FormControl>
									<Input type="text" placeholder="Nickanme" {...field} />
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

			<div className="flex flex-col items-center gap-4">
				<Button asChild variant="link" className="mx-auto text-center">
					<Link href={route.AUTH.LOGIN}>Already have an account?</Link>
				</Button>
				<div className="text-sm font-medium text-gray-700">
					By proceeding, you agree to our{' '}
					<Link href={route.SERVICE.TERMS} target="_blank" className="underline">
						Terms
					</Link>{' '}
					and{' '}
					<Link href={route.SERVICE.PRIVACY} target="_blank" className="underline">
						Privacy Policy
					</Link>
					.
				</div>
			</div>
		</div>
	);
}
