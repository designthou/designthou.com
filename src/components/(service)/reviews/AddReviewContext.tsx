"use client";

import React from "react";
import { Plus } from "lucide-react";
import {
  AddReviewForm,
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
              리뷰 작성하기
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col min-w-[60dvw]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">리뷰 작성</DialogTitle>
              <DialogDescription className="px-3 py-1.5 w-fit bg-gradient-orange-100 text-white font-semibold rounded-lg">
                현재 지원하지 않는 기능입니다. 곧 지원 예정입니다.
              </DialogDescription>
            </DialogHeader>
            <AddReviewForm
              footer={
                <DialogFooter>
                  <Button type="submit" size="lg" disabled={true}>
                    제출하기
                  </Button>
                </DialogFooter>
              }
            />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isContextOpen} onOpenChange={toggle}>
          <DrawerTrigger asChild>
            <Button variant="default" size="lg" className="font-semibold">
              <Plus size={18} />
              리뷰 작성하기
            </Button>
          </DrawerTrigger>
          <DrawerContent className="flex flex-col h-[90svh]">
            <DrawerHeader>
              <DrawerTitle className="text-lg text-left">리뷰 작성</DrawerTitle>
              <DrawerDescription className="mt-3 px-3 py-1.5 bg-gradient-orange-100 text-white text-xs text-left font-semibold rounded-lg">
                현재 지원하지 않는 기능입니다. 곧 지원 예정입니다.
              </DrawerDescription>
            </DrawerHeader>

            <div className="flex-1 min-h-0 overflow-y-auto px-4">
              <AddReviewForm
                footer={
                  <DrawerFooter className="px-0 pb-8">
                    <Button type="submit" size="lg" disabled={true}>
                      제출하기
                    </Button>

                    <DrawerClose asChild>
                      <Button type="button" variant="outline">
                        취소하기
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                }
              />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
