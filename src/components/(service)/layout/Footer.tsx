import Image from 'next/image';
import Link from 'next/link';
import designthouSVG from '@/public/favicon/favicon.svg';
import { route } from '@/constants';
import { SiteConfig } from '../../../app/config';

export default async function Footer() {
	return (
		<footer className="pt-16 w-full">
			<div className="mx-auto py-12 px-4 w-full text-sm bg-muted rounded-4xl sm:py-24 sm:px-8">
				<div className="grid grid-cols-1 gap-8 mx-auto max-w-300 p-1.5 text-gray-700 md:grid-cols-4">
					<div className="col-span-2 flex flex-col gap-8">
						<div className="flex flex-col gap-4">
							<Link
								href={route.SERVICE.ROOT}
								className="inline-flex items-center gap-2 w-fit text-lg text-gray-700 font-bold rounded-lg text-center"
								aria-label="Go to Designthou Main Page">
								<Image src={designthouSVG} alt="Designthou" width={28} height={28} priority />
								Designthou
							</Link>
							<dl className="grid grid-cols-1">
								<div className="flex items-center gap-2">
									<dt className="min-w-32">상호명</dt>
									<dd>디자인도우</dd>
								</div>
								<div className="flex items-center gap-2">
									<dt className="min-w-32">대표자</dt>
									<dd>이영재</dd>
								</div>
								<div className="flex items-center gap-2">
									<dt className="min-w-32">주소</dt>
									<dd> 경기도 화성시 동탄중심상가2길 8, 401호</dd>
								</div>
								<div className="flex items-center gap-2">
									<dt className="min-w-32">사업자번호</dt>
									<dd>625-50-00764</dd>
								</div>
								<div className="flex items-center gap-2">
									<dt className="min-w-32">통신판매업신고번호</dt>
									<dd>2022-화성동탄-0795</dd>
								</div>
								<div className="flex items-center gap-2">
									<dt className="min-w-32">개인정보보호책임자</dt>
									<dd>권혁민</dd>
								</div>
							</dl>
						</div>
						<div className="">
							<div className="font-semibold">Need Help?</div>
							<Link href="mailto:designthou@naver.com" rel="noopener" target="_blank" className="text-xs text-blue-500 underline">
								designthou@naver.com
							</Link>{' '}
							/{' '}
							<Link href="mailto:designthou.dev@gmail.com" rel="noopener" target="_blank" className="text-xs text-blue-500 underline">
								designthou.dev@gmail.com
							</Link>
						</div>
					</div>
					<div className="col-span-2">
						<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
							<div className="flex flex-col gap-4">
								<div className="text-base font-bold">Features</div>
								<Link href={route.SERVICE.NEWS}>Architectural News</Link>
								<Link href={route.SERVICE.COMPETITION}>Competition</Link>
								<Link href={route.SERVICE.FREE_SOURCE}>Open Source</Link>
								<Link href={route.SERVICE.ONLINE_COURSE}>Online Course</Link>
								<Link href={route.SERVICE.TIPS}>Youtube Tips</Link>
								<Link href={route.SERVICE.REVIEWS}>Reviews</Link>
								<Link href={route.SERVICE.QUESTION_BOARD}>Question Board</Link>
							</div>
							<div className="flex flex-col gap-4">
								<div className="text-base font-bold">Company</div>
								<Link href={route.SERVICE.ABOUT}>About</Link>
								<Link href={route.SERVICE.NOTICE}>Notice</Link>
								<Link href={route.SERVICE.FAQ}>FAQ</Link>
								<Link href={route.SERVICE.PRIVACY}>Privacy Policy</Link>
								<Link href={route.SERVICE.TERMS}>Terms of Service</Link>
								<Link href={route.SERVICE.SUPPORT}>Support</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="py-4 text-gray-600 text-center">{SiteConfig.copyright}</div>
		</footer>
	);
}
