'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import googleIcon from '@/public/google.svg';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/hooks';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Button,
	Input,
	loginSchema,
	type LoginSchema,
	AnimateLoader,
	PasswordInput,
} from '@/components';
import { route } from '@/constants';
import { SiteConfig } from '@/app/config';
import { createClient } from '@/lib/supabase/client';

export default function LoginForm() {
	const supabase = createClient();
	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const router = useRouter();
	const { mutate: signIn, isPending } = useLogin();

	const loginWithGoogle = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				// redirectTo: 'http://localhost:3000/api/auth/callback',
				redirectTo: `${SiteConfig.url}/api/auth/callback`,
			},
		});
	};

	const onSubmit = async (values: LoginSchema) => {
		const { email, password } = values;

		signIn(
			{ email, password },
			{
				onSuccess() {
					toast.success('로그인 성공');

					router.push(route.ADMIN.ROOT);
				},

				onError(error) {
					console.error(error);
					form.resetField('password');
					toast.error(error?.message);
				},
			},
		);
	};

	return (
		<div className="flex flex-col gap-4 mt-8 p-4 bg-white rounded-lg">
			<Button type="button" variant="default" onClick={loginWithGoogle}>
				<Image src={googleIcon} alt="Continue with Google Icon" className="mr-2 w-4 h-4 text-subtle" />
				Sign in with Google
			</Button>
			<div className="my-4">
				<div className="flex relative items-center">
					<div className="border-t border-subtle grow"></div>
					<span className="mx-2 text-sm font-normal leading-none text-gray-500 shrink">or</span>
					<div className="border-t border-subtle grow"></div>
				</div>
			</div>
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
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<div className="flex justify-between items-center">
									<FormLabel>Password</FormLabel>
									<Button asChild variant="link" size="sm" className="h-auto text-gray-500 text-center">
										<Link href={route.AUTH.FORGOT_PASSWORD}>Forgot Password?</Link>
									</Button>
								</div>
								<FormControl>
									<PasswordInput placeholder="Password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" variant="secondary" size="lg">
						{isPending ? <AnimateLoader /> : 'Login'}
					</Button>
				</form>
			</Form>

			<Button asChild variant="link" className="mx-auto text-center transition-all">
				<Link href={route.AUTH.SIGNUP}>Do you need to register?</Link>
			</Button>
		</div>
	);
}
