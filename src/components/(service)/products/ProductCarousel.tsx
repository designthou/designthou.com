'use client';

import Image from 'next/image';
import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import RhinoClassImage from '/public/og-background.webp';
import sectionAutocad from '/public/online-course/placeholder/autocad/section.png';
import isometricSketchup from '/public/online-course/placeholder/sketchup/7-4.png';
import { Card, CardContent, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components';

export default function ProductCarousel() {
	const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

	return (
		<Carousel
			opts={{ loop: true }}
			plugins={[plugin.current]}
			className="py-8 w-full"
			onMouseEnter={plugin.current.stop}
			onMouseLeave={plugin.current.reset}>
			<CarouselContent>
				{[RhinoClassImage, sectionAutocad, isometricSketchup].map((image, index) => (
					<CarouselItem key={index}>
						<Card className="py-0 border-none shadow-none">
							<CardContent className="ui-flex-center aspect-video px-0">
								<Image src={image} alt="image-1" className="object-cover rounded-md" />
							</CardContent>
						</Card>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="hidden sm:inline-flex sm:left-6" />
			<CarouselNext className="hidden sm:inline-flex sm:right-6" />
		</Carousel>
	);
}
