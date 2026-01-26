import Image from 'next/image';
import React from 'react';
import { Activity, ArrowRight, Sparkle } from 'lucide-react';
import RhinoClassImage from '/public/og-background.webp';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	AspectRatio,
	GradientIndicator,
	HomeNewsList,
	HomeReviewList,
	LinkifyButton,
	Progress,
	Skeleton,
} from '@/components';
import { route } from '@/constants';

export default async function HomePage() {
	return (
		<section className="flex flex-col justify-items-center gap-12 p-4 bg-white">
			<div className="flex items-center p-8 bg-gradient-orange-50 text-white font-bold font-mono text-2xl rounded-lg h-[100px] sm:h-[150px] md:h-[200px] lg:h-[250px] sm:text-3xl lg:text-4xl">
				Welcome to Spatial Content Platform
			</div>
			<p className="flex items-center gap-3 py-6 px-3 bg-light text-sm text-gray-700 font-semibold rounded-lg border border-gray-100">
				<Activity size={21} />
				현재 디자인도우 플랫폼은 리뉴얼 중입니다. <br />
				플랫폼 내부 시스템 정비 후, 2026년 1월 중으로 재오픈 예정입니다.
			</p>
			<div>
				<h2 className="mb-3 font-bold">재정비 진도율 - {75}%</h2>
				<Progress value={75} className="w-full" />
			</div>

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
								예정되어 있던 2025년중으로 작업이 마무리 될 예정이었으나, DB, 결제 시스템 등의 정비를 위해 <strong>2026년 1월 중</strong>
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
					<HomeNewsList />
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
						<div className="grid grid-cols-1 gap-4 w-full sm:grid-cols-2 md:grid-cols-4">
							{Array.from({ length: 4 }, (_, idx) => (
								<Skeleton key={idx} className="w-full min-h-91" />
							))}
						</div>
					}>
					<HomeReviewList />
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
		</section>
	);
}
