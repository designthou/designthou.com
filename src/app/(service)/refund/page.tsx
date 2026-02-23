import { Metadata } from 'next';
import { SiteConfig } from '@/app/config';

export const metadata: Metadata = {
	title: SiteConfig.title.REFUND,
	description: SiteConfig.description.REFUND,
	openGraph: {
		title: SiteConfig.title.REFUND,
		description: SiteConfig.title.REFUND,
		images: [
			{
				url: `${SiteConfig.url}/og/static`,
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function RefundPage() {
	return (
		<section id="" className="mx-auto p-4 max-w-200 border-gray-200 border-dashed border-l border-r">
			<h2 className="page-title">Refund Policy(환불 정책)</h2>
			<div className="flex flex-col gap-12 mt-8">
				<div>
					<h3 className="page-subtitle">제1조 (목적)</h3>
					<p>본 환불 규정은 디자인도우에서 제공하는 온라인 강의 및 디지털 콘텐츠(영상, PDF, 템플릿 등)에 적용됩니다.</p>
				</div>

				<div>
					<h3 className="page-subtitle">제2조 (청약철회 및 환불 기준)</h3>

					<div className="flex flex-col gap-2">
						<p className="font-semibold">결제일로부터 7일 이내이며, 강의 수강 또는 콘텐츠 이용 이력이 없는 경우 전액 환불이 가능합니다.</p>
						<p>
							(전자상거래법에 따른 청약철회 기준) 강의를 일부 수강한 경우에는 「소비자분쟁해결기준」에 따라 이용한 강의 분량에 해당하는 금액
							및 제반 수수료를 공제 후 환불됩니다.
						</p>
						<p>디지털 콘텐츠의 특성상 강의 자료(다운로드 파일 등)를 다운로드하거나 열람한 경우에는 청약철회가 제한될 수 있습니다.</p>
						<p className="font-semibold">결제일로부터 6개월이 경과한 경우에는 환불이 불가합니다.</p>
					</div>
				</div>

				<div>
					<h3 className="page-subtitle">제3조 (환불 불가 사항)</h3>
					<p>다음 각 호에 해당하는 경우 환불이 제한될 수 있습니다.</p>
					<ul className="mt-4 ml-4 list-disc">
						<li className="list-disc font-semibold">결제일 기준 6개월이 경과한 경우</li>
						<li className="list-disc">콘텐츠 다운로드 또는 실질적 이용이 이루어진 경우</li>
						<li className="list-disc">수강 진행률이 상당 부분 초과한 경우</li>
						<li className="list-disc">회원의 귀책 사유로 서비스 이용이 제한된 경우</li>
					</ul>
				</div>
				<div>
					<h3 className="page-subtitle">제4조 (환불 절차)</h3>

					<p>환불 요청은 고객센터 또는 공식 문의 채널을 통해 접수해야 합니다. </p>

					<p>결제 일자 및 이용 내역 확인 후 환불 가능 여부를 안내드립니다.</p>
					<p>환불 승인 시 결제 수단에 따라 영업일 기준 3~7일 이내 처리됩니다.</p>
				</div>
				<div>
					<h3 className="page-subtitle">제5조 (기타)</h3>
					<p>본 환불 규정은 관련 법령을 준수하며, 필요 시 사전 고지 후 변경될 수 있습니다.</p>
				</div>
			</div>
		</section>
	);
}
