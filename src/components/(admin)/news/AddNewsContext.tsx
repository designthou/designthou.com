'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
	Skeleton,
	NewsForm,
} from '@/components';
import { useIsClient, useMediaQuery } from '@/hooks';
import { screenSize } from '@/constants';

export default function AddNewsContext() {
	const isDesktop = useMediaQuery(screenSize.MIN_MD);
	const [isContextOpen, setIsContextOpen] = React.useState(false);
	const mounted = useIsClient();

	const closeForm = () => setIsContextOpen(false);
	const toggle = (open: boolean) => setIsContextOpen(open);

	if (!mounted) return <Skeleton className="w-30 h-9 bg-muted rounded-lg" />;

	return (
		<>
			{isDesktop ? (
				<Dialog open={isContextOpen} onOpenChange={toggle}>
					<DialogTrigger asChild>
						<Button type="button">
							<Plus size={18} />
							Add News
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle className="text-lg">뉴스 추가</DialogTitle>
							<DialogDescription className="hidden">Adding news Dialog 입니다.</DialogDescription>
						</DialogHeader>
						<NewsForm type="add" closeForm={closeForm} className="py-4" />
					</DialogContent>
				</Dialog>
			) : (
				<Drawer open={isContextOpen} onOpenChange={toggle}>
					<DrawerTrigger asChild>
						<Button variant="default">
							<Plus size={18} />
							Add News
						</Button>
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader>
							<DrawerTitle className="text-left text-lg">뉴스 추가</DrawerTitle>
							<DrawerDescription className="hidden">Adding news Drawer</DrawerDescription>
						</DrawerHeader>
						<NewsForm type="add" closeForm={closeForm} className="px-4" />
						<DrawerFooter className="pt-2">
							<DrawerClose asChild>
								<Button type="button" variant="outline">
									Cancel
								</Button>
							</DrawerClose>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			)}
		</>
	);
}
