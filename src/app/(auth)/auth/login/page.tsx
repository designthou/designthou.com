import { Metadata } from 'next';
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
			<LoginForm />
			<Callout
				message={
					<ul className="ml-2">
						<li className="list-disc">플랫폼 이전으로 인해 기존 로그인 정보는 사용할 수 없습니다</li>
						<li className="list-disc">기존 사용자도 새로 회원가입해 주세요</li>
						<li className="list-disc">가입 시 기존 계정 정보와 자동으로 대조하여 데이터(강의)가 연결됩니다</li>
					</ul>
				}
				className="justify-center mt-4 mx-auto px-4 text-xs bg-white"
			/>
		</>
	);
}
