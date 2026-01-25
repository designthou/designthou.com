'use server';

import fs from 'node:fs/promises';
import path from 'node:path';
import { glob } from 'glob';
import { getPlaiceholder } from 'plaiceholder';

const getLocalImage = async (imageUrl: string) => {
	try {
		const fsPath = path.join(process.cwd(), 'public', imageUrl.replace(/^\/+/, ''));
		const file = await fs.readFile(fsPath);

		const { base64 } = await getPlaiceholder(file);

		return base64;
	} catch (error) {
		console.error(error);
	}
};

const getRemoteImage = async (src: string) => {
	const buffer = await fetch(src).then(async res => Buffer.from(await res.arrayBuffer()));

	const {
		metadata: { height, width },
		...plaiceholder
	} = await getPlaiceholder(buffer, { size: 10 });

	return {
		...plaiceholder,
		img: { src, height, width },
	};
};

const getRemoteImages = async (pattern: string) => {
	try {
		const data = await Promise.all(
			glob.sync(pattern).map(async file => {
				const src = file.replace('./public', '');
				const buffer = await fs.readFile(file);

				const plaiceholder = await getPlaiceholder(buffer);

				return { ...plaiceholder, img: { src } };
			}),
		);
		return data;
	} catch (error) {
		console.error(error);
	}
};

export { getLocalImage, getRemoteImage, getRemoteImages };
