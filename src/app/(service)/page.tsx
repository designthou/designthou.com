import Image from 'next/image';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import GradientLiquidImage from '/public/home/gradient-liquid.webp';
import RhinoClassImage from '/public/rhino-class.webp';
import { AspectRatio, GradientIndicator, HomeNewsSection, HomeReviewSection, LinkifyButton, QASection, Skeleton } from '@/components';
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

			{/* <QASection /> */}
		</section>
	);
}
