import Link from 'next/link';
import Image, { type ImageProps } from 'next/image';
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import { highlight } from 'sugar-high';
import React, { type ReactNode } from 'react';

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
function RoundedImage(props: RoundedImageMDXProps) {
	const { src, alt = '', ...rest } = props;
	const { src: _, alt: __, ...imageProps } = rest as ImageProps;

	// next/image의 src 타입을 만족시키기 위해 as Parameters hack 사용
	// src가 문자열이면 그대로 넣어도 되므로 캐스트로 처리
	return <Image src={src as ImageProps['src']} alt={alt} className="rounded-lg" {...imageProps} />;
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

/* -------------------- MDX Components Map -------------------- */

const baseComponents = {
	h1: createHeading(1),
	h2: createHeading(2),
	h3: createHeading(3),
	h4: createHeading(4),
	h5: createHeading(5),
	h6: createHeading(6),
	Image: RoundedImage,
	a: CustomLink,
	code: Code,
	pre: ({ children }: { children: React.ReactNode }) => children,
	Table,
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
