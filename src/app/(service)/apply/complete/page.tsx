'use client';

import Link from 'next/link';
import { ArrowLeft, Mail, Building2, MessageCircle, Info } from 'lucide-react';
import { Button } from '@/components';
import { route } from '@/constants';
import { useAuthStore } from '@/stores';

export default function ApplyCompletePage() {
	const user = useAuthStore(({ user }) => user);

	return (
		<main className="max-w-xl mx-auto px-4 py-16 flex flex-col gap-8">
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl font-bold">신청이 완료되었습니다 🎉</h1>
				<p className="text-sm text-muted-foreground">아래 내용을 확인해 주세요.</p>
			</div>

			<div className="flex flex-col gap-4">
				<section className="flex flex-col gap-2 p-4 border rounded-lg">
					<div className="flex items-center gap-2 font-bold">
						<Mail size={16} />
						이메일 확인
					</div>
					<p className="text-sm text-muted-foreground">입력하신 이메일로 신청 확인 메일이 발송됩니다. 스팸함도 함께 확인해 주세요.</p>
					{user && (
						<div className="flex flex-col gap-4 p-4 bg-muted rounded-lg">
							<Button asChild className="w-fit">
								<Link href={route.SERVICE.DASHBOARD}>My Page</Link>
							</Button>
							<p className="text-sm text-gray-600">☑️ 로그인한 사용자는 [My Page]에서 신청한 수업이 확인됩니다.</p>
						</div>
					)}
				</section>

				<section className="flex flex-col gap-2 p-4 border rounded-lg">
					<div className="flex items-center gap-2 font-bold">
						<Building2 size={16} />
						입금 계좌
					</div>

					<div className="flex items-center gap-2 p-3 text-primary bg-light border border-muted">
						<Info size={16} />
						<p className="text-sm rounded-lg">
							입금 확인 후 최종 등록이 완료되며, 입력하신 전화번호 혹은 이메일로 따로 연락드립니다.{' '}
							<strong>입금 정보는 이메일을 확인해 주세요.</strong>
						</p>
					</div>
				</section>

				<section className="flex flex-col gap-2 p-4 border rounded-lg">
					<div className="flex items-center gap-2 font-bold">
						<MessageCircle size={16} />
						문의
					</div>
					<div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
						문의사항은 아래의 이메일로 연락 부탁드립니다.
					</div>
					<div className="flex items-center gap-2 text-sm">
						<Link href="mailto:designthou.dev@gmail.com" className="underline text-muted-foreground font-medium">
							designthou.dev@gmail.com
						</Link>

						<Link href="mailto:designthou@naver.com" className="underline text-muted-foreground font-medium">
							designthou@naver.com
						</Link>
					</div>
				</section>
			</div>

			<Button asChild variant="outline">
				<Link href={route.SERVICE.ROOT}>
					<ArrowLeft size={16} />
					홈으로 돌아가기
				</Link>
			</Button>
		</main>
	);
}
