import Image from 'next/image';
import React from 'react';
import { ArrowRight, Sparkle } from 'lucide-react';
import GradientLiquidImage from '/public/home/gradient-liquid.webp';
import RhinoClassImage from '/public/rhino-class.webp';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	AspectRatio,
	GradientIndicator,
	HomeNewsSection,
	HomeReviewSection,
	LinkifyButton,
	Skeleton,
} from '@/components';
import { route } from '@/constants';

export const revalidate = 3600;

export default async function HomePage() {
	return (
		<section className="flex flex-col justify-items-center gap-12 p-4 bg-white">
			<div className="relative w-full rounded-2xl overflow-hidden aspect-[28/11]">
				<Image
					src={GradientLiquidImage}
					alt="Gradient Liquid Image"
					fill
					sizes="(max-width: 640px) 100dvw, (max-width: 1024px) 100dvw, 100dvw"
					placeholder="blur"
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 flex items-center bg-none">
					<div className="flex flex-col gap-1 p-3 pl-4 text-white font-bold font-mono text-lg sm:text-xl sm:pl-14 md:gap-4 md:text-3xl lg:text-5xl">
						<p>Welcome to Designthou</p>
						<p>Meet our Spatial Content</p>
						<ul className="hidden flex-row flex-wrap items-center gap-2 text-xs sm:flex md:text-sm">
							<li className="px-1.5 py-1 bg-white/30 backdrop-blur-sm text-white rounded-full md:px-3 md:py-1.5"> Lively News</li>
							<li className="px-1.5 py-1 bg-white/30 backdrop-blur-sm text-white rounded-full md:px-3 md:py-1.5">Competition Info</li>
							<li className="px-1.5 py-1 bg-white/30 backdrop-blur-sm text-white rounded-full md:px-3 md:py-1.5">
								Open Source (.dwg, .ai)
							</li>
							<li className="px-1.5 py-1 bg-white/30 backdrop-blur-sm text-white rounded-full md:px-3 md:py-1.5">
								Online / Offline Course
							</li>
							<li className="px-1.5 py-1 bg-white/30 backdrop-blur-sm text-white rounded-full md:px-3 md:py-1.5">Youtube Tips</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-4">
				<div className="ui-flex-center-between">
					<h3 className="flex items-center gap-2 text-lg font-bold">
						<GradientIndicator />
						실시간 건축 / 공간 뉴스
					</h3>
					<LinkifyButton title={'더보기'} href={route.SERVICE.NEWS} icon={<ArrowRight size={18} />} />
				</div>
				<React.Suspense
					fallback={
						<div className="grid grid-cols-1 gap-4 w-full sm:grid-cols-2">
							{Array.from({ length: 6 }, (_, idx) => (
								<Skeleton key={idx} className="w-full min-h-32" />
							))}
						</div>
					}>
					<HomeNewsSection />
				</React.Suspense>
			</div>
			<div className="flex flex-col gap-4">
				<div className="ui-flex-center-between">
					<h3 className="flex items-center gap-2 text-lg font-bold">
						<GradientIndicator />
						실시간 수강후기
					</h3>
					<LinkifyButton title={'더보기'} href={route.SERVICE.REVIEWS} icon={<ArrowRight size={18} />} />
				</div>
				<React.Suspense
					fallback={
						<div className="flex gap-4 w-full overflow-x-hidden">
							{Array.from({ length: 4 }, (_, idx) => (
								<Skeleton key={idx} className="min-w-[300px] min-h-90 sm:min-w-[350px]" />
							))}
						</div>
					}>
					<HomeReviewSection />
				</React.Suspense>
			</div>
			<AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
				<Image
					src={RhinoClassImage}
					alt="Rhino All in one class"
					fill
					loading="lazy"
					placeholder="blur"
					className="h-full w-full rounded-xl object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</AspectRatio>

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
								기존에 제공하던 건축 관련 뉴스, 다양한 팁 영상, 온라인 강의, 공모전, 일러스트/캐드 소스 등의 컨텐츠를 순차적으로 제공할
								예정입니다.
							</p>
							<p>
								DB, 결제 시스템 등의 정비를 위해 <strong>2026년 1분기 중</strong>
								으로 완료될 예정입니다.
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
								기존과 같이 구매 / 신청한 기간으로부터 최대 6개월 간 수강가능합니다. 예외적으로, Rhino All-in-One Class 무료 이벤트
								참여하셨던 수강생분들은 지속적으로 수강 가능합니다.
							</p>
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
								기존에 운영중이던 인프라 최적화를 위해 잠시 플랫폼 운영을 쉬게 되었습니다. 온라인 강의 제공, 다양한 소스 제공 시 발생하던
								잦은 오류를 방지하기 위해, 재정비 이후 기존 플랫폼보다 최적화된 서비스를 제공할 예정입니다.
							</p>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</section>
	);
}
