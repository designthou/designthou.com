import { Metadata } from 'next';
import { SiteConfig } from '@/app/config';
import { Callout, LoginForm } from '@/components';
import { AlertTriangle } from 'lucide-react';

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
			<Callout icon={<AlertTriangle />} message="이전 사용자 정보를 복구 중이며, 대조하여 기존 데이터를 연결할 예정입니다" />
			<LoginForm />
		</>
	);
}
