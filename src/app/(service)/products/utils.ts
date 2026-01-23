'use server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type Metadata = {
	title: string;
	publishedAt: string;
	summary: string;
	image: string;
	productId: 'rhino-all-in-one' | 'sketchup-all-in-one' | 'autocad' | 'portfolio' | string;
	tags?: string[];
	published?: boolean;
	category?: string;
	template?: string;
};

export type MDXData = {
	metadata: Metadata;
	slug: string;
	content: string;
	reviewCount: number | undefined;
};

function parseFrontmatter(fileContent: string) {
	const { data, content } = matter(fileContent);

	const metadata: Metadata = {
		title: data.title ?? '',
		publishedAt: data.publishedAt ?? '',
		summary: data.summary ?? '',
		image: data.image ?? 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80',
		productId: data.productId,
		category: data.category,
		template: data.template,
		published: typeof data.published === 'boolean' ? data.published : data.published === 'true',
		tags: Array.isArray(data.tags)
			? data.tags.map(String)
			: typeof data.tags === 'string' && data.tags.length
				? data.tags
						.split(',')
						.map(s => s.trim())
						.filter(Boolean)
				: [],
	};

	return { metadata, content: content.trim() };
}

function getMDXFiles(dir: fs.PathLike) {
	return fs.readdirSync(dir).filter(file => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: fs.PathOrFileDescriptor) {
	const rawContent = fs.readFileSync(filePath, 'utf-8');
	return parseFrontmatter(rawContent);
}

function getMDXData(dir: fs.PathLike): {
	metadata: Metadata;
	slug: string;
	content: string;
}[] {
	const mdxFiles = getMDXFiles(dir);
	return mdxFiles.map(file => {
		const { metadata, content } = readMDXFile(path.join(dir as string, file));

		const slug = path.basename(file, path.extname(file));

		return {
			metadata,
			slug,
			content,
		};
	});
}

export async function getProductList() {
	return getMDXData(path.join(process.cwd(), 'src', 'app', '(service)', 'products', 'productList'));
}

export async function formatDate(date: string, includeRelative = false) {
	const currentDate = new Date();
	if (!date?.includes('T')) {
		date = `${date}T00:00:00`;
	}
	const targetDate = new Date(date);

	const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
	const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
	const daysAgo = currentDate.getDate() - targetDate.getDate();

	let formattedDate = '';

	if (yearsAgo > 0) {
		formattedDate = `${yearsAgo}y ago`;
	} else if (monthsAgo > 0) {
		formattedDate = `${monthsAgo}mo ago`;
	} else if (daysAgo > 0) {
		formattedDate = `${daysAgo}d ago`;
	} else {
		formattedDate = 'Today';
	}

	const fullDate = targetDate.toLocaleString('ko-kr', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});

	if (!includeRelative) {
		return fullDate;
	}

	return `${fullDate} (${formattedDate})`;
}
