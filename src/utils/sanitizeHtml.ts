// utils/sanitizeHtml.server.ts
import { SiteConfig } from '@/app/config';
import sanitizeHtml from 'sanitize-html';

const FALLBACK_IMAGE = '/rhino_class.webp';
const BASE_URL = SiteConfig.url;

export default function sanitizeHtmlServer(html?: string) {
	if (!html) return '';

	// 1. 개행 문자 정리
	const normalized = html.replace(/\\n/g, '');

	return sanitizeHtml(normalized, {
		allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
		allowedAttributes: {
			...sanitizeHtml.defaults.allowedAttributes,
			img: ['src', 'alt', 'title', 'loading', 'decoding'],
		},

		// src 검증
		transformTags: {
			img: (_, attribs) => {
				const src = attribs.src;

				const isValidSrc = typeof src === 'string' && /^https?:\/\//.test(src);

				return {
					tagName: 'img',
					attribs: {
						src: isValidSrc ? src : `${BASE_URL}${FALLBACK_IMAGE}`,
						alt: attribs.alt ?? '이미지를 불러올 수 없습니다',
						loading: 'lazy',
						decoding: 'async',
					},
				};
			},
		},
	});
}
