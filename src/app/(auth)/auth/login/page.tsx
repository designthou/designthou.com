import { Metadata } from 'next';
import { SiteConfig } from '@/app/config';
import { LoginForm } from '@/components';

export const metadata: Metadata = {
	title: SiteConfig.title.LOGIN,
	description: SiteConfig.description.LOGIN,
	openGraph: {
		title: SiteConfig.title.LOGIN,
		description: SiteConfig.title.LOGIN,
		images: [
			{
				url: `${SiteConfig.url}/og/static`,
				width: 1200,
				height: 630,
			},
		],
	},
};

export default async function LoginPage() {
	return (
		<>
			<h2 className="auth-page-title">Join Designthou</h2>
			<LoginForm />
		</>
	);
}
