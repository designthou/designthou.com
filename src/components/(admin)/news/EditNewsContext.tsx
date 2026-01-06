"use client";

import React from "react";
import { Edit } from "lucide-react";
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
} from "@/components";
import { useIsClient, useMediaQuery } from "@/hooks";
import { screenSize } from "@/constants";
import { NewsFormSchema } from "./schema";

export default function EditNewsContext({
  data,
}: {
  data: NewsFormSchema & { id: string };
}) {
  const isDesktop = useMediaQuery(screenSize.MIN_MD);
  const [isContextOpen, setIsContextOpen] = React.useState(false);
  const mounted = useIsClient();

  const closeForm = () => setIsContextOpen(false);
  const toggle = (open: boolean) => setIsContextOpen(open);

  if (!mounted) return <Skeleton className="w-8 h-8 bg-muted rounded-lg" />;

  return (
    <>
      {isDesktop ? (
        <Dialog open={isContextOpen} onOpenChange={toggle}>
          <DialogTrigger asChild>
            <Button type="button" size="icon-sm" variant="ghost">
              <Edit size={18} />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>뉴스 편집</DialogTitle>
              <DialogDescription className="hidden">
                Editing news Dialog 입니다.
              </DialogDescription>
            </DialogHeader>
            <NewsForm
              type="edit"
              formData={data}
              closeForm={closeForm}
              className="py-4"
            />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isContextOpen} onOpenChange={toggle}>
          <DrawerTrigger asChild>
            <Button type="button" size="icon-sm" variant="ghost">
              <Edit size={18} />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-left">뉴스 편집</DrawerTitle>
              <DrawerDescription className="hidden">
                Editing news Drawer
              </DrawerDescription>
            </DrawerHeader>
            <NewsForm
              type="edit"
              formData={data}
              closeForm={closeForm}
              className="px-4"
            />
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
