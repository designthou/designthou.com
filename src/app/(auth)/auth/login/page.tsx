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
			<h2 className="font-bold text-base text-center sm:text-2xl">Join Designthou</h2>
			<LoginForm />
		</>
	);
}
