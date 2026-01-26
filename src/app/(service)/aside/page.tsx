import { Metadata } from 'next';
import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SiteConfig } from '@/app/config';
import {
	AsciiArt,
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components';
import { ASCII_ART_SRC } from '@/constants';

export const metadata: Metadata = {
	title: SiteConfig.title.ASIDE,
	description: SiteConfig.description.ASIDE,
	openGraph: {
		title: SiteConfig.title.ASIDE,
		description: SiteConfig.title.ASIDE,
		images: [
			{
				url: `${SiteConfig.url}/og/static`,
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function AsidePage() {
	return (
		<section className="p-4 max-w-300">
			<div className="flex flex-col gap-4 w-full">
				<h2 className="page-title">Aside Service</h2>
				<p className="font-medium text-sm text-gray-700 sm:text-base lg:text-lg">Meet our offline service</p>
			</div>

			<div className="flex items-center gap-0 my-8 bg-amber-50 w-full h-[100px] sm:h-[200px] md:h-[250px] lg:h-[320px]">
				<AsciiArt
					src={ASCII_ART_SRC}
					detail={50}
					config={{
						mouseRadius: 60,
						intensity: 3,
						contrast: 110,
						brightness: 105,
						saturation: 120,
						useTransparentBackground: true,
					}}
				/>
				<AsciiArt
					src={ASCII_ART_SRC}
					detail={50}
					config={{
						mouseRadius: 60,
						intensity: 3,
						contrast: 110,
						brightness: 105,
						saturation: 120,
						useTransparentBackground: true,
					}}
				/>
			</div>

			<div className="flex flex-col justify-between gap-8 my-8 p-4 bg-light border border-muted sm:items-center  sm:flex-row sm:p-8">
				<div className="flex flex-col gap-2">
					<p className="w-fit font-semibold text-base text-gray-900 sm:text-lg">하단의 서비스를 오프라인으로 제공합니다.</p>
					<ul className="flex flex-col gap-2 text-sm sm:text-base">
						<li className="inline-flex items-center gap-2">
							<ArrowRight size={14} className="text-gray-700" /> <span>스케치업 모델링 응용</span>
						</li>
						<li className="inline-flex items-center gap-2">
							<ArrowRight size={14} className="text-gray-700" />
							<span>실무에 가까운 오토캐드 도면 작성</span>
						</li>
						<li className="inline-flex items-center gap-2">
							<ArrowRight size={14} className="text-gray-700" />
							<span>포트폴리오 피드백</span>
						</li>
					</ul>
				</div>
				<Dialog>
					<DialogTrigger asChild>
						<Button type="button" size="lg" className="w-fit rounded-full">
							신청하러 가기
							<ArrowUpRight size={18} />
						</Button>
					</DialogTrigger>
					<DialogContent className="flex flex-col min-w-[50dvw]">
						<DialogHeader>
							<DialogTitle className="text-xl text-left font-bold sm:text-2xl">관련 정보 작성하기</DialogTitle>
							<DialogDescription className="text-left font-medium">꼭, 어떤 피드백을 원하는지 선택해주세요.</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<DialogClose asChild>
								<Button type="button" variant="outline" size="lg" className="rounded-full">
									취소하기
								</Button>
							</DialogClose>
							<Button type="submit" size="lg" className="rounded-full">
								제출하기
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</section>
	);
}
