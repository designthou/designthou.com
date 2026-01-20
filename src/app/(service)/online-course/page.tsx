import { Metadata } from 'next';
import { Sparkle, Star } from 'lucide-react';
import Image from 'next/image';
import autocadThumb from '@/public/online-course/placeholder/autocad/thumbnail-1.png';
import sketchupThumb from '@/public/online-course/placeholder/sketchup/thumbnail-1.png';
import rhinoThumb from '@/public/online-course/placeholder/rhino/thumbnail-1.png';
import { AspectRatio, Badge, Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Wip } from '@/components';
import { SiteConfig } from '@/app/config';
import Link from 'next/link';
import { route } from '@/constants';
import { monetizeWithSeparator } from '@/utils/currency';

export const metadata: Metadata = {
	title: SiteConfig.title.ONLINE_COURSE,
	description: SiteConfig.description.ONLINE_COURSE,
	openGraph: {
		title: SiteConfig.title.ONLINE_COURSE,
		description: SiteConfig.title.ONLINE_COURSE,
		images: [
			{
				url: `${SiteConfig.url}/og/static`,
				width: 1200,
				height: 630,
			},
		],
	},
};

const courses = [
	{
		id: 1,
		title: '건축 디자이너를 위한 Rhino All-in-one 클래스',
		image: rhinoThumb,
		categoryList: ['Rhino', 'Photoshop', 'Twinmotion', 'V-ray', 'Architecture', 'Interior'],
		price: 120000,
		description: '라이노, 트윈모션, 엔스케이프, 포토샵까지',
		starRate: 5.0,
		reviewCount: 200,
		created_at: new Date('2024-01-01'),
	},
	{
		id: 2,
		title: '건축, 인테리어 디자이너를 위한 AutoCAD',
		image: autocadThumb,
		categoryList: ['AutoCAD', 'Architecture', 'Interior'],
		price: 120000,
		description: '오토캐드 기본, 편집 명령어부터 평면도, 입면도, 단면도까지',
		starRate: 4.8,
		reviewCount: 20,
		created_at: new Date('2024-12-31'),
	},
	{
		id: 33,
		title: 'Sketchup All-in-one 클래스, 모델링부터 리터칭까지',
		image: sketchupThumb,
		categoryList: ['Sketchup', 'Enscape', 'V-ray', 'Photoshop', 'Architecture', 'Interior'],
		price: 120000,
		description: '스케치업, 브이레이, 엔스케이프, 포토샵까지',
		starRate: 5.0,
		reviewCount: 7,
		created_at: new Date('2025-12-01'),
	},
];

// TODO: 오름차순 / 내림차순 정렬
export default function ServiceOnlineCoursePage() {
	return (
		<section className="p-4 max-w-300">
			<h2 className="page-title hidden" aria-label="Online Course Title">
				Online Course
			</h2>
			<div>
				<div className="ui-flex-center-between">
					<h3 className="page-subtitle">전체 클래스</h3>
					<Select value={'최신 순'}>
						<SelectTrigger size="sm" className="w-40" id="order-trigger">
							<SelectValue placeholder={'업로드 날짜'} />
						</SelectTrigger>
						<SelectContent side="top">
							{['최신 순', '오래된 순'].map(trigger => (
								<SelectItem key={trigger} value={`${trigger}`}>
									{trigger}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-3 lg:grid-cols-4">
					{courses.map(({ id, title, image, price, description, starRate, reviewCount }) => (
						<Link key={id} href={`${route.SERVICE.ONLINE_COURSE}/${id}`} className="flex flex-col gap-2 rounded-lg">
							<AspectRatio ratio={1 / 1}>
								<Image
									src={image}
									alt={`${title} thumbnail`}
									fill
									placeholder="blur"
									sizes=""
									className="w-full h-full object-cover rounded-md"
								/>
							</AspectRatio>
							<div className="flex flex-col gap-1">
								<div className="h-12 overflow-hidden break-all text-ellipsis font-bold tracking-tight">{title}</div>
								<div className="flex flex-col gap-2">
									<span> ₩{monetizeWithSeparator(price)}</span>
								</div>
								<p className="text-muted-foreground text-xs whitespace-nowrap text-ellipsis overflow-hidden tracking-tight">
									{description}
								</p>
								<div className="flex items-center gap-2">
									<Badge variant="secondary" className="text-muted-foreground">
										<Star className="text-yellow-400" fill="oklch(85.2% 0.199 91.936)" />
										<span className="inline-flex items-center gap-1">
											{starRate.toFixed(1)}
											<span>({reviewCount})</span>
										</span>
									</Badge>
								</div>
							</div>
						</Link>
					))}
					<div className="flex flex-col gap-2 rounded-lg">
						<AspectRatio ratio={1 / 1}>
							<Image
								src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
								alt="Photo by Drew Beamer"
								fill
								className="w-full h-full rounded-lg object-cover dark:brightness-[0.2] grayscale"
							/>
						</AspectRatio>
						<div className="flex flex-col gap-2 py-2 px-2 border border-dotted rounded-lg">
							<p className="text-muted-foreground font-semibold">새로운 강의를 기대해 주세요!</p>
							<Button type="button" variant="secondary" size="sm" disabled>
								강의 추천하기
							</Button>
						</div>
					</div>
				</div>

				<Wip
					icon={<Sparkle size={20} />}
					message="Online Course will be uploaded soon!"
					className="mt-8 bg-none border border-dashed text-primary"
				/>
			</div>
		</section>
	);
}
