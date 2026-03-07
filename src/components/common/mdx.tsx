/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from 'next/link';
import Image, { type ImageProps } from 'next/image';
import { Star } from 'lucide-react';
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import { highlight } from 'sugar-high';
import React, { type ReactNode } from 'react';
import { Callout, Wip, Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components';

/* -------------------- Types -------------------- */

type TableData = {
	headers: string[];
	rows: (string | number | ReactNode)[][];
};

type TableProps = {
	data: TableData;
};

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
	href: string;
};

type HeadingProps = {
	children: ReactNode;
};

type RoundedImageMDXProps = Partial<ImageProps> & {
	src: string; // MDX will usually pass a string path
	alt?: string;
};

/* -------------------- Components -------------------- */

function Table({ data }: TableProps) {
	const headers = data.headers.map((header, index) => <th key={index}>{header}</th>);

	const rows = data.rows.map((row, index) => (
		<tr key={index}>
			{row.map((cell, cellIndex) => (
				<td key={cellIndex}>{cell}</td>
			))}
		</tr>
	));

	return (
		<table>
			<thead>
				<tr>{headers}</tr>
			</thead>
			<tbody>{rows}</tbody>
		</table>
	);
}

function CustomLink(props: CustomLinkProps) {
	const { href, children, ...rest } = props;

	if (href.startsWith('/')) {
		// next/link expects `href` prop; we forward other anchor props via passHref behavior
		return (
			<Link href={href} {...rest}>
				{children}
			</Link>
		);
	}

	if (href.startsWith('#')) {
		return (
			<a href={href} {...rest}>
				{children}
			</a>
		);
	}

	return (
		<a target="_blank" rel="noopener noreferrer" href={href} {...rest}>
			{children}
		</a>
	);
}

/**
 * RoundedImage: MDX에서 넘어오는 props 형태가 자유로워서
 * - 우선 MDX가 주는 src (string) 을 next/image에 넣기 적합한 타입으로 변환해서 넘긴다.
 * - className, alt 등 나머지 props는 안전하게 스프레드.
 */
function RoundedImage({ src, alt = '', ...rest }: RoundedImageMDXProps) {
	if (!src) return null;

	return <Image src={src as ImageProps['src']} alt={alt} className="rounded-lg" {...rest} />;
}

type CodeProps = React.HTMLAttributes<HTMLElement> & {
	children: string;
};

function Code({ children, className }: CodeProps) {
	const html = highlight(children);

	// block code
	if (className) {
		return (
			<pre className="overflow-x-auto">
				<code className={className} dangerouslySetInnerHTML={{ __html: html }} />
			</pre>
		);
	}

	// inline code
	return <code className="px-1 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800" dangerouslySetInnerHTML={{ __html: html }} />;
}

/* -------------------- Utils -------------------- */

function slugify(str: string) {
	return str
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/&/g, '-and-')
		.replace(/[^\w\-]+/g, '')
		.replace(/\-\-+/g, '-');
}

// Helper function to extract text from ReactNode
function getTextFromNode(node: ReactNode): string {
	if (typeof node === 'string') {
		return node;
	}
	if (typeof node === 'number') {
		return String(node);
	}
	if (Array.isArray(node)) {
		return node.map(getTextFromNode).join('');
	}
	if (node && typeof node === 'object' && 'props' in node) {
		return getTextFromNode((node as { props: { children: ReactNode } }).props.children);
	}
	return '';
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
	const Heading = ({ children }: HeadingProps) => {
		const text = getTextFromNode(children);
		const slug = slugify(text);

		return React.createElement(
			`h${level}`,
			{ id: slug },
			<>
				<a href={`#${slug}`} key={`link-${slug}`} className="anchor" />
				{children}
			</>,
		);
	};

	Heading.displayName = `Heading${level}`;
	return Heading;
}

function Description({ children }: { children: React.ReactNode }) {
	return <p className="my-0 px-4 py-2 w-fit text-gray-600 bg-gray-100 rounded-lg">{children}</p>;
}

function TagList({ data }: { data?: string | string[] }) {
	if (!data) return null;

	const items = Array.isArray(data) ? data : data?.split(',').map(s => s.trim());

	return (
		<ul className="flex flex-wrap items-center gap-1 list-none pl-0">
			{items.map(item => (
				<li key={item} className="list-none px-2 py-1 bg-gray-100 text-gray-700 rounded-full sm:px-3 sm:py-1.5">
					{item}
				</li>
			))}
		</ul>
	);
}

function RhinoClassCurriculumAccordion() {
	return (
		<Accordion type="multiple" className="w-full" defaultValue={['item-1']}>
			<AccordionItem value="item-1">
				<AccordionTrigger className="font-bold text-lg">Chapter 1 _ 라이노 모델링 기초</AccordionTrigger>
				<AccordionContent>
					<ul className="flex flex-col gap-4 text-balance">
						<li className="list-decimal">라이노 기본설명 및 세팅</li>
						<li className="list-decimal">인터페이스와 기본조작법</li>
						<li className="list-decimal">라이노의 개체유형</li>
						<li className="list-decimal">기본 2D 명령어</li>
						<li className="list-decimal">기본 3D 명령어</li>
					</ul>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-2">
				<AccordionTrigger className="font-bold text-lg">Chapter 2 _ 라이노 모델링 심화</AccordionTrigger>
				<AccordionContent>
					<ul className="flex flex-col gap-4 text-balance">
						<li className="list-decimal">실전 모델링의 기초, Box&Box</li>
						<li className="list-decimal">실전 모델링의 정수, The House -1</li>
						<li className="list-decimal">실전 모델링의 정수, The House -2</li>
						<li className="list-decimal">디자인 프로세스, 모델링에서 평면으로!</li>
						<li className="list-decimal">그래스호퍼를 활용한, 랜드스케이프 생성하기</li>
					</ul>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-3">
				<AccordionTrigger className="font-bold text-lg">Chapter 3 _ 브이레이 렌더링</AccordionTrigger>
				<AccordionContent>
					<ul className="flex flex-col gap-4 text-balance">
						<li className="list-decimal">재질생성 원리 배우기 -1</li>
						<li className="list-decimal">재질생성 원리 배우기 -2</li>
						<li className="list-decimal">재질 적용방법</li>
						<li className="list-decimal">카메라 구도 조작법</li>
						<li className="list-decimal">빛 조절하는 방법</li>
						<li className="list-decimal">건축물 재질 맵핑</li>
						<li className="list-decimal">가구 배치하기</li>
						<li className="list-decimal">주간 최종 렌더링</li>
						<li className="list-decimal">야간 최종 렌더링</li>
						<li className="list-decimal">실내 투시도 렌더링</li>
						<li className="list-decimal">툰 렌더링</li>
					</ul>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-4">
				<AccordionTrigger className="font-bold text-lg">Chapter 4 _ 트윈모션 렌더링</AccordionTrigger>
				<AccordionContent>
					<ul className="flex flex-col gap-4 text-balance">
						<li className="list-decimal">모델링을 트윈모션으로 가져오기</li>
						<li className="list-decimal">트윈모션 기본 조작법</li>
						<li className="list-decimal">재질 입히기</li>
						<li className="list-decimal">지형, 나무, 잔디 조성하기 (library)</li>
						<li className="list-decimal">가구, 사람, 조명 배치하기 (library)</li>
						<li className="list-decimal">시간, 위치, 날씨, 조명, 카메라 설정하기 -1 (envrionment)</li>
						<li className="list-decimal">시간, 위치, 날씨, 조명, 카메라 설정하기 -2 (environment)</li>
						<li className="list-decimal">영상 촬영하기 (video)</li>
						<li className="list-decimal">이미지와 비디오 렌더링하기 (rendering)</li>
					</ul>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-5">
				<AccordionTrigger className="font-bold text-lg">Chapter 5 _ 포토샵 다이어그램</AccordionTrigger>
				<AccordionContent>
					<ul className="flex flex-col gap-4 text-balance">
						<li className="list-decimal">포토샵 기본조작 배우기</li>
						<li className="list-decimal">포토샵 합성기초 배우기</li>
						<li className="list-decimal">사이트 다이어그램 (site diagram)</li>
						<li className="list-decimal">프로세스 다이어그램 (process diagram)</li>
						<li className="list-decimal">평면 리터칭 (retouching)</li>
						<li className="list-decimal">아이소메트릭 다이어그램 (isometric diagram)</li>
					</ul>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-6">
				<AccordionTrigger className="font-bold text-lg">Chapter 6 _ 포토샵 리터칭 & 패널 레이아웃</AccordionTrigger>
				<AccordionContent>
					<ul className="flex flex-col gap-4 text-balance">
						<li className="list-decimal">조감도 리터칭</li>
						<li className="list-decimal">실외 투시도 리터칭</li>
						<li className="list-decimal">실내 투시도 리터칭</li>
						<li className="list-decimal">패널 만들기</li>
					</ul>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}

function SketchupClassCurriculumAccordion() {
	return (
		<Accordion type="multiple" className="w-full" defaultValue={['item-1']}>
			<AccordionItem value="item-1">
				<AccordionTrigger className="font-bold text-lg">Chapter 1 _ 스케치업 모델링 기초</AccordionTrigger>
				<AccordionContent>
					<ul className="flex flex-col gap-4 text-balance">
						<li className="list-decimal">스케치업 소개 및 작업환경 세팅</li>
						<li className="list-decimal">인터페이스 및 기본 조작</li>
						<li className="list-decimal">2D 그리기 도구</li>
						<li className="list-decimal">2D & 3D 편집 도구</li>
						<li className="list-decimal">2D & 3D 제어 도구</li>
					</ul>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-2">
				<AccordionTrigger className="font-bold text-lg">Chapter 2 _ 스케치업 모델링 응용</AccordionTrigger>
				<AccordionContent>
					<ul className="flex flex-col gap-4 text-balance">
						<li className="list-decimal">그룹 & 컴포넌트</li>
						<li className="list-decimal">재질(Paint Bucket)</li>
						<li className="list-decimal">고체도구 & 단면</li>
						<li className="list-decimal">루비 배우기 Part 1</li>
						<li className="list-decimal">루비 배우기 Part 2</li>
						<li className="list-decimal">가구 모델링</li>
					</ul>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-3">
				<AccordionTrigger className="font-bold text-lg">Chapter 3 _ 스케치업 모델링 실전</AccordionTrigger>
				<AccordionContent>
					<ul className="flex flex-col gap-4 text-balance">
						<li className="list-decimal">모델링 프로세스</li>
						<li className="list-decimal">[주택 모델링 Part 1] 1층 벽체, 슬라브 만들기</li>
						<li className="list-decimal">[주택 모델링 Part 2] 2층 벽체, 슬라브 만들기</li>
						<li className="list-decimal">[주택 모델링 Part 3] 천장 및 부가요소 만들기</li>
						<li className="list-decimal">[주택 모델링 Part 4] 창, 문, 계단 만들기</li>
						<li className="list-decimal">[주택 모델링 Part 5] 공간 가구 배치 및 디테일</li>
					</ul>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-4">
				<AccordionTrigger className="font-bold text-lg">Chapter 4 _ 렌더링의 정석, 브이레이</AccordionTrigger>
				<AccordionContent>
					<ul className="flex flex-col gap-4 text-balance">
						<li className="list-decimal">[렌더링의 기본 원리] 장면, 음영, 재질, 최종</li>
						<li className="list-decimal">[장면] 렌더 뷰 설정하기</li>
						<li className="list-decimal">[음영] 빛과 그림자 조절하기</li>
						<li className="list-decimal">[재질] 고퀄리티 재질 생성원리1</li>
						<li className="list-decimal">[재질] 고퀄리티 재질 생성원리2</li>
						<li className="list-decimal">[재질] 고효율 재질 적용하기</li>
						<li className="list-decimal">[재질] 내/외부 가구소스 배치하고 재질 적용하기</li>
						<li className="list-decimal">[재질] 재질확인용 렌더링 & 재질 수정하기</li>
						<li className="list-decimal">[실습] 최종 렌더링1_주간샷</li>
						<li className="list-decimal">[실습] 최종 렌더링2_야간샷</li>
					</ul>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-5">
				<AccordionTrigger className="font-bold text-lg">Chapter 5 _ 실시간 렌더링 프로그램, 엔스케이프</AccordionTrigger>
				<AccordionContent>
					<ul className="flex flex-col gap-4 text-balance">
						<li className="list-decimal">엔스케이프란 어떤 프로그램일까?</li>
						<li className="list-decimal">인터페이스</li>
						<li className="list-decimal">맵핑 기본 개념</li>
						<li className="list-decimal">맵핑 재질 생성</li>
						<li className="list-decimal">맵핑 실전 적용</li>
						<li className="list-decimal">라이브러리 배치(실내)</li>
						<li className="list-decimal">라이브러리 배치(실외)</li>
						<li className="list-decimal">조명 설정(야경)</li>
						<li className="list-decimal">비주얼 세팅</li>
						<li className="list-decimal">렌더링(이미지/영상/VR)</li>
					</ul>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-6">
				<AccordionTrigger className="font-bold text-lg">Chapter 6 _ 이미지를 바꾸는 마법, 포토샵</AccordionTrigger>
				<AccordionContent>
					<ul className="flex flex-col gap-4 text-balance">
						<li className="list-decimal">포토샵의 인터페이스와 기본 개념</li>
						<li className="list-decimal">합성과 기초원리</li>
						<li className="list-decimal">프로세스 다이어그램</li>
						<li className="list-decimal">아이소매트릭 다이어그램</li>
						<li className="list-decimal">투시도 리터칭</li>
						<li className="list-decimal">조감도 리터칭</li>
						<li className="list-decimal">목업 파일 만들기</li>
					</ul>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}

/* -------------------- MDX Components Map -------------------- */

const baseComponents = {
	h1: createHeading(1),
	h2: createHeading(2),
	h3: createHeading(3),
	h4: createHeading(4),
	h5: createHeading(5),
	h6: createHeading(6),
	Image: RoundedImage,
	Description,
	a: CustomLink,
	code: Code,
	pre: ({ children }: { children: React.ReactNode }) => children,
	Table,
	Link,
	Wip: ({ message }: { message: string }) => <Wip message={message} className="border border-muted bg-light" />,
	Callout: ({
		message,
		icon = <Star size={18} className="fill-orange-300 text-orange-300" />,
		className,
	}: {
		message: React.ReactNode;
		icon?: React.ReactNode;
		className: string;
	}) => <Callout message={message} icon={icon} className={className} />,
	TagList,
	RhinoClassCurriculumAccordion,
	SketchupClassCurriculumAccordion,
};

/* -------------------- CustomMDX -------------------- */

/**
 * MDXRemoteProps['components'] 타입이 엄격해서 직접 병합 후 명시적으로 캐스트한다.
 * 이 방식은 런타임 동작에는 영향 없고 타입 체크만 통과시킨다.
 */
export function CustomMDX(props: MDXRemoteProps) {
	const merged = {
		// baseComponents는 다양한 react 컴포넌트 타입을 포함하고 있으므로 unknown을 거쳐 캐스트
		...(baseComponents as unknown as MDXRemoteProps['components']),
		...(props.components || {}),
	} as MDXRemoteProps['components'];

	return <MDXRemote {...props} components={merged} />;
}
