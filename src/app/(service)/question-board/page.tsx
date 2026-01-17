import { SiteConfig } from '@/app/config';
import { Wip } from '@/components';
import { LoaderPinwheel } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: SiteConfig.title.QUESTION_BOARD,
	description: SiteConfig.description.QUESTION_BOARD,
	openGraph: {
		title: SiteConfig.title.QUESTION_BOARD,
		description: SiteConfig.title.QUESTION_BOARD,
		images: [
			{
				url: `${SiteConfig.url}/og/static`,
				width: 1200,
				height: 630,
			},
		],
	},
};

export default async function QuestionBoardPage() {
	return (
		<section className="p-4 bg-light rounded-lg">
			<div className="flex justify-between">
				<h2 className="text-lg font-bold">Question Board</h2>
			</div>
			<div className="my-12">
				<Wip message={'질문 게시판 서비스를 준비중입니다!'} icon={<LoaderPinwheel />} />
			</div>
		</section>
	);
}
