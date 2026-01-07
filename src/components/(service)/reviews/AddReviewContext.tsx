"use client";

import React from "react";
import { Plus } from "lucide-react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  TipTapEditor,
} from "@/components";
import { useIsClient, useMediaQuery } from "@/hooks";
import { screenSize } from "@/constants";

export default function AddReviewContext() {
  const isDesktop = useMediaQuery(screenSize.MIN_MD);
  const [isContextOpen, setIsContextOpen] = React.useState(false);
  const mounted = useIsClient();

  // const closeForm = () => setIsContextOpen(false);
  const toggle = (open: boolean) => setIsContextOpen(open);

  if (!mounted) return <Skeleton className="w-36 h-10 bg-muted rounded-lg" />;

  return (
    <>
      {isDesktop ? (
        <Dialog open={isContextOpen} onOpenChange={toggle}>
          <DialogTrigger asChild>
            <Button type="button" size="lg" className="font-semibold">
              <Plus size={18} />
              리뷰 추가하기
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col min-w-[60dvw]">
            <DialogHeader>
              <DialogTitle className="text-lg">리뷰 추가</DialogTitle>
              <DialogDescription className="px-3 py-1.5 bg-gradient-orange-100 text-white font-semibold rounded-lg">
                현재 지원하지 않는 기능입니다. 곧 지원 예정입니다.
              </DialogDescription>
            </DialogHeader>

            <TipTapEditor content={"후기를 작성해 주세요"} />
            <DialogFooter>
              <Button type="submit" size="lg" disabled={true}>
                제출하기
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isContextOpen} onOpenChange={toggle}>
          <DrawerTrigger asChild>
            <Button variant="default" size="lg" className="font-semibold">
              <Plus size={18} />
              리뷰 추가하기
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-lg text-left">리뷰 추가</DrawerTitle>
              <DrawerDescription className="mt-3 px-3 py-1.5 bg-gradient-orange-100 text-white text-xs text-left font-semibold rounded-lg">
                현재 지원하지 않는 기능입니다. 곧 지원 예정입니다.
              </DrawerDescription>
            </DrawerHeader>

            <TipTapEditor content={"후기를 작성해 주세요"} />
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
