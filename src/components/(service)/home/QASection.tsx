import { Sparkle } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui';
import { GradientIndicator } from '@/components/common';

export default function QASection() {
	return (
		<div>
			<h3 className="flex items-center gap-2 text-lg font-bold">
				<GradientIndicator /> Q & A
			</h3>
			<Accordion type="single" collapsible className="w-full" defaultValue="item-1">
				<AccordionItem value="item-1">
					<AccordionTrigger className="font-bold">
						<div className="flex items-center gap-2">
							<Sparkle size={16} />
							기존에 제공하던 서비스 그대로 제공하나요?
						</div>
					</AccordionTrigger>
					<AccordionContent className="flex flex-col gap-4 text-balance">
						<p>
							기존에 제공하던 건축 관련 뉴스, 다양한 팁 영상, 일러스트/캐드 소스, 온라인 강의 등의 컨텐츠를 순차적으로 제공할 예정입니다.
						</p>
						<p>
							현재 건축 관련 뉴스, 다양한 팁 영상, 일러스트/캐드 소스 등은 정상적으로 제공 중입니다. 온라인 강의는 현재 유지보수 중으로
							구매가 불가능합니다.
						</p>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger className="font-bold">
						<div className="flex items-center gap-2">
							<Sparkle size={16} />
							기존 수강하던 강의는 계속 수강 가능한가요?
						</div>
					</AccordionTrigger>
					<AccordionContent className="flex flex-col gap-4 text-balance">
						<p className="font-medium">
							기존 수강 등록해주신 분들을 대상으로 <b>간단한 검증(닉네임, 이메일 대조)</b>으로 이어서 수강가능하도록 조치할 예정입니다.
						</p>
						<p>
							기존과 같이 구매 / 신청한 기간으로부터 최대 6개월 간 수강가능합니다. 12월 중순부터 2월말까지 온라인 강의 수강 불가 문제로,
							기존 2025년 7월 이후로 구매하신 분들 대상으로 약 3개월 연장조치 해드렸습니다.
						</p>
						<p>현재는 온라인 강의는 판매 중단 중입니다.</p>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger className="font-bold">
						<div className="flex items-center gap-2">
							<Sparkle size={16} />왜 재정비에 들어갔나요?
						</div>
					</AccordionTrigger>
					<AccordionContent className="flex flex-col gap-4 text-balance">
						<p>
							기존에 운영중이던 인프라 최적화를 위해 잠시 플랫폼 운영을 쉬게 되었습니다. 온라인 강의 제공, 다양한 소스 제공 시 발생하던 잦은
							오류를 방지하기 위해, 재정비 이후 기존 플랫폼보다 최적화된 서비스를 제공할 예정입니다.
						</p>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
