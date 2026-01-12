import { Metadata } from 'next';
import { SignupForm } from '@/components';
import { SiteConfig } from '@/app/config';

export const metadata: Metadata = {
	title: SiteConfig.title.SIGN_UP,
	description: SiteConfig.description.SIGN_UP,
	openGraph: {
		title: SiteConfig.title.SIGN_UP,
		description: SiteConfig.title.SIGN_UP,
		images: [
			{
				url: `${SiteConfig.url}/og/static`,
				width: 1200,
				height: 630,
			},
		],
	},
};

export default async function SignUpPage() {
	return (
		<>
			<h2 className="font-bold text-base text-center sm:text-2xl">Create your Designthou account</h2>
			<SignupForm />
		</>
	);
}
