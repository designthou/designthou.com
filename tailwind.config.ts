// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import plaiceholder from '@plaiceholder/tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
	content: [],
	theme: {
		extend: {},
	},
	variants: {},
	plugins: [
		plaiceholder({
			resolver: src => fs.readFileSync(path.join('./public', `${src}.png`)),
		}),
	],
};
