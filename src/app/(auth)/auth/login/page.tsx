import { Metadata } from 'next';
import { BadgeInfo } from 'lucide-react';
import { SiteConfig } from '@/app/config';
import { Callout, LoginForm } from '@/components';

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
			<Callout
				icon={<BadgeInfo size={16} />}
				message="기존 사용자의 경우, 새로 가입 시 이전 사용자 정보와 대조하여 데이터를 연결할 예정입니다"
				className="justify-center mt-4 mx-auto text-xs"
			/>
			<LoginForm />
		</>
	);
}
