import Link from 'next/link';
import { Metadata } from 'next';
import { Button, ForgotPasswordForm } from '@/components';
import { SiteConfig } from '@/app/config';
import { route } from '@/constants';

export const metadata: Metadata = {
	title: SiteConfig.title.FORGOT_PASSWORD,
	description: SiteConfig.description.FORGOT_PASSWORD,
	openGraph: {
		title: SiteConfig.title.FORGOT_PASSWORD,
		description: SiteConfig.title.FORGOT_PASSWORD,
		images: [
			{
				url: `${SiteConfig.url}/og/static`,
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function ForgotPasswordPage() {
	return (
		<>
			<h2 className="font-bold text-base text-center sm:text-2xl">Forgot password?</h2>
			<ForgotPasswordForm />
			<div className="mt-8 text-center">
				<Button type="button" variant="link" asChild>
					<Link href={route.AUTH.LOGIN}>Back to Sign in</Link>
				</Button>
			</div>
		</>
	);
}
