'use client';

import React from 'react';

const ASCII_CHARS = ' .:-=designthou';

type Config = {
	mouseRadius: number;
	intensity: number;
	fontSize: number;
	lineHeight: number;
	mousePersistence: number;
	returnSpeed: number;
	returnWhenStill: boolean;

	enableJiggle: boolean;
	jiggleIntensity: number;

	detailFactor: number; // promptcache의 detailFactor
	contrast: number; // 100 = no change
	brightness: number; // 100 = no change
	saturation: number; // 100 = no change

	useTransparentBackground: boolean;
	backgroundColor: string;
};

interface Props {
	src: string;
	/** promptcache의 detailFactor(기본 50)처럼 쓰고 싶으면 이 값을 넘기면 됨 */
	detail?: number;

	/** 아래 옵션들은 필요할 때만 override */
	config?: Partial<Config>;
	className?: string;
}

const DEFAULT_CONFIG: Config = {
	mouseRadius: 50,
	intensity: 3,
	fontSize: 12,
	lineHeight: 1,
	mousePersistence: 0.97,
	returnSpeed: 0.1,
	returnWhenStill: true,

	enableJiggle: true,
	jiggleIntensity: 0.2,

	detailFactor: 50,
	contrast: 100,
	brightness: 100,
	saturation: 100,

	useTransparentBackground: true,
	backgroundColor: 'transparent',
};

export default function AsciiArt({ src, detail, config: configOverride, className }: Props) {
	const wrapperRef = React.useRef<HTMLDivElement>(null);
	const canvasRef = React.useRef<HTMLCanvasElement>(null);
	const imageRef = React.useRef<HTMLImageElement>(null);

	const particles = React.useRef<{ x: number; y: number }[]>([]);
	const velocities = React.useRef<{ x: number; y: number }[]>([]);
	const original = React.useRef<{ x: number; y: number }[]>([]);
	const chars = React.useRef<{ char: string; color: string }[]>([]);

	const mouse = React.useRef({ x: -1000, y: -1000 });
	const lastMouseMoveTime = React.useRef(0);

	const rafRef = React.useRef<number>(0);
	const resizeObserverRef = React.useRef<ResizeObserver | null>(null);

	React.useEffect(() => {
		const wrapper = wrapperRef.current;
		const canvas = canvasRef.current;
		const img = imageRef.current;
		if (!wrapper || !canvas || !img) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const cfg: Config = {
			...DEFAULT_CONFIG,
			...(typeof detail === 'number' ? { detailFactor: detail } : {}),
			...(configOverride ?? {}),
		};

		let isAnimating = false;

		const updateCanvasSize = () => {
			const containerW = wrapper.clientWidth || 300;
			const containerH = wrapper.clientHeight || 150;

			// img가 아직 로드 안됐으면 임시로 1:1
			const iw = img.naturalWidth || 1;
			const ih = img.naturalHeight || 1;

			const mediaRatio = ih / iw;
			let width: number;
			let height: number;

			if (containerW * mediaRatio <= containerH) {
				width = containerW;
				height = width * mediaRatio;
			} else {
				height = containerH;
				width = height / mediaRatio;
			}

			// DPR 고려
			const dpr = window.devicePixelRatio || 1;
			canvas.width = Math.floor(width * dpr);
			canvas.height = Math.floor(height * dpr);
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;

			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			return { width, height };
		};

		const applyContrastAndBrightness = (imageData: ImageData) => {
			const { contrast, brightness } = cfg;
			const data = imageData.data;

			if (contrast === 100 && brightness === 100) return imageData;

			let contrastFactor: number;
			if (contrast < 100) contrastFactor = contrast / 100;
			else contrastFactor = 1 + ((contrast - 100) / 100) * 0.8;

			let brightnessFactor: number;
			if (brightness < 100) brightnessFactor = (brightness / 100) * 1.2;
			else brightnessFactor = 1 + ((brightness - 100) / 100) * 0.8;

			for (let i = 0; i < data.length; i += 4) {
				let r = data[i];
				let g = data[i + 1];
				let b = data[i + 2];

				// brightness
				if (brightness !== 100) {
					if (brightness < 100) {
						r *= brightnessFactor;
						g *= brightnessFactor;
						b *= brightnessFactor;
					} else {
						r = r + (255 - r) * (brightnessFactor - 1);
						g = g + (255 - g) * (brightnessFactor - 1);
						b = b + (255 - b) * (brightnessFactor - 1);
					}
				}

				// contrast
				if (contrast !== 100) {
					r = 128 + contrastFactor * (r - 128);
					g = 128 + contrastFactor * (g - 128);
					b = 128 + contrastFactor * (b - 128);
				}

				data[i] = Math.max(0, Math.min(255, r));
				data[i + 1] = Math.max(0, Math.min(255, g));
				data[i + 2] = Math.max(0, Math.min(255, b));
			}

			return imageData;
		};

		const colorScheme = (r: number, g: number, b: number) => {
			// promptcache와 동일한 saturation 처리(그레이 기준 보간)
			const sat = cfg.saturation / 100;
			const gray = 0.2989 * r + 0.587 * g + 0.114 * b;

			const rSat = Math.max(0, Math.min(255, gray + sat * (r - gray)));
			const gSat = Math.max(0, Math.min(255, gray + sat * (g - gray)));
			const bSat = Math.max(0, Math.min(255, gray + sat * (b - gray)));

			return `rgb(${Math.round(rSat)},${Math.round(gSat)},${Math.round(bSat)})`;
		};

		const generateAsciiArt = () => {
			const { width, height } = updateCanvasSize();
			if (!width || !height) return;

			const iw = img.naturalWidth || 1;
			const ih = img.naturalHeight || 1;
			const aspectRatio = ih / iw;

			// promptcache: columns = round(max(20,(width/1200)*detailFactor*3))
			const columns = Math.round(Math.max(20, (width / 1200) * cfg.detailFactor * 3));
			const rows = Math.ceil(columns * aspectRatio);

			const temp = document.createElement('canvas');
			temp.width = columns;
			temp.height = rows;
			const tctx = temp.getContext('2d');
			if (!tctx) return;

			tctx.drawImage(img, 0, 0, columns, rows);
			let imageData = tctx.getImageData(0, 0, columns, rows);
			imageData = applyContrastAndBrightness(imageData);
			tctx.putImageData(imageData, 0, 0);

			const fontSizeX = width / columns;
			const fontSizeY = fontSizeX * cfg.lineHeight;

			if (chars.current.length === 0) {
				chars.current = [];
				particles.current = [];
				velocities.current = [];
				original.current = [];

				for (let y = 0; y < rows; y++) {
					for (let x = 0; x < columns; x++) {
						const posX = x * fontSizeX;
						const posY = y * fontSizeY;

						chars.current.push({ char: ' ', color: 'black' });
						particles.current.push({ x: posX, y: posY });
						velocities.current.push({ x: 0, y: 0 });
						original.current.push({ x: posX, y: posY });
					}
				}
			} else {
				// rows/cols 변동 시(리사이즈)엔 재생성
				const expected = rows * columns;
				if (expected !== chars.current.length) {
					chars.current = [];
					particles.current = [];
					velocities.current = [];
					original.current = [];
					return generateAsciiArt();
				}
			}

			const pixels = imageData.data;

			for (let y = 0; y < rows; y++) {
				for (let x = 0; x < columns; x++) {
					const index = (y * columns + x) * 4;
					const r = pixels[index];
					const g = pixels[index + 1];
					const b = pixels[index + 2];

					const bright = 0.299 * r + 0.587 * g + 0.114 * b;

					// promptcache: Math.floor(brightness/256 * charset.length)
					const charIndex = Math.floor((bright / 256) * ASCII_CHARS.length);
					const char = ASCII_CHARS[Math.min(charIndex, ASCII_CHARS.length - 1)];
					const color = colorScheme(r, g, b);

					const idx = y * columns + x;
					chars.current[idx].char = char;
					chars.current[idx].color = color;

					const posX = x * fontSizeX;
					const posY = y * fontSizeY;
					original.current[idx].x = posX;
					original.current[idx].y = posY;
				}
			}
		};

		const animate = () => {
			if (!isAnimating) return;

			// 투명 배경 아닐 때만 fill
			const { width, height } = canvas.getBoundingClientRect();
			ctx.clearRect(0, 0, width, height);

			if (!cfg.useTransparentBackground) {
				ctx.fillStyle = cfg.backgroundColor;
				ctx.fillRect(0, 0, width, height);
			}

			ctx.font = `${cfg.fontSize}px monospace`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';

			const mouseStillTime = Date.now() - lastMouseMoveTime.current;
			const mouseIsStill = mouseStillTime > 500;

			for (let i = 0; i < particles.current.length && i < chars.current.length; i++) {
				const p = particles.current[i];
				const v = velocities.current[i];
				const o = original.current[i];

				const dx = p.x - mouse.current.x;
				const dy = p.y - mouse.current.y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < cfg.mouseRadius && (!mouseIsStill || !cfg.returnWhenStill)) {
					const force = (1 - distance / cfg.mouseRadius) * cfg.intensity;
					const angle = Math.atan2(dy, dx);
					v.x += Math.cos(angle) * force * 0.2;
					v.y += Math.sin(angle) * force * 0.2;
				}

				if (cfg.enableJiggle) {
					v.x += (Math.random() - 0.5) * cfg.jiggleIntensity;
					v.y += (Math.random() - 0.5) * cfg.jiggleIntensity;
				}

				// damping
				v.x *= cfg.mousePersistence;
				v.y *= cfg.mousePersistence;

				// move
				p.x += v.x;
				p.y += v.y;

				// spring to original
				p.x += (o.x - p.x) * cfg.returnSpeed;
				p.y += (o.y - p.y) * cfg.returnSpeed;

				ctx.fillStyle = chars.current[i].color;
				ctx.fillText(chars.current[i].char, p.x, p.y);
			}

			rafRef.current = requestAnimationFrame(animate);
		};

		const onMouseMove = (e: MouseEvent) => {
			const rect = canvas.getBoundingClientRect();
			mouse.current.x = e.clientX - rect.left;
			mouse.current.y = e.clientY - rect.top;
			lastMouseMoveTime.current = Date.now();
		};

		const onLeave = () => {
			mouse.current.x = -1000;
			mouse.current.y = -1000;
		};

		const init = () => {
			chars.current = [];
			particles.current = [];
			velocities.current = [];
			original.current = [];

			generateAsciiArt();
			isAnimating = true;
			animate();
		};

		if (img.complete) init();
		else img.onload = init;

		resizeObserverRef.current = new ResizeObserver(() => {
			chars.current = [];
			particles.current = [];
			velocities.current = [];
			original.current = [];
			generateAsciiArt();
		});
		resizeObserverRef.current.observe(wrapper);

		window.addEventListener('resize', generateAsciiArt);
		canvas.addEventListener('mousemove', onMouseMove);
		canvas.addEventListener('mouseleave', onLeave);

		return () => {
			isAnimating = false;
			cancelAnimationFrame(rafRef.current);
			window.removeEventListener('resize', generateAsciiArt);
			canvas.removeEventListener('mousemove', onMouseMove);
			canvas.removeEventListener('mouseleave', onLeave);
			resizeObserverRef.current?.disconnect();
		};
	}, [src, detail, configOverride]);

	return (
		<div ref={wrapperRef} className={['relative w-full h-full overflow-hidden', className].filter(Boolean).join(' ')}>
			<canvas ref={canvasRef} className="absolute inset-0 block max-w-full max-h-full" />
			<img ref={imageRef} src={src} className="hidden" alt="ascii-art" />
		</div>
	);
}
