"use client";

import { X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AnimateLoader,
  Button,
} from "@/components";
import { useDeleteNewsMutation } from "@/hooks";

export default function DeleteNewsAlertDialog({ id }: { id: string }) {
  const { mutate: remove, isPending } = useDeleteNewsMutation();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" size="icon-sm" variant="ghost">
          <X size={21} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => remove({ id })}>
            {isPending ? <AnimateLoader /> : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
