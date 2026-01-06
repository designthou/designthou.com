"use client";

import { useForm } from "react-hook-form";
import {
  AnimateLoader,
  Button,
  DatePicker,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { newsCategoryList } from "@/constants";
import { useAddNewsMutation, useEditNewsMutation } from "@/hooks";
import { newsFormSchema, NewsFormSchema } from "./schema";
import { isEqual } from "es-toolkit";
import { toast } from "sonner";

export default function NewsForm({
  type,
  formData,
  closeForm,
  className,
}: {
  type: "add" | "edit";
  formData?: NewsFormSchema & { id: string };
  closeForm: () => void;
  className?: string;
}) {
  const form = useForm<NewsFormSchema>({
    resolver: zodResolver(newsFormSchema),
    defaultValues:
      type === "add"
        ? {
            title: "",
            url: "",
            category: "architecture",
            created_at: new Date(),
          }
        : {
            ...formData,
          },
  });

  const { mutate: add, isPending: isAddPending } =
    useAddNewsMutation(closeForm);
  const { mutate: edit, isPending: isEditPending } =
    useEditNewsMutation(closeForm);

  const onSubmit = async (values: NewsFormSchema) => {
    const now = new Date().toISOString();

    if (type === "add") {
      add({
        ...values,
        created_at: values.created_at.toISOString(),
        updated_at: now,
      });
      return;
    }

    if (type === "edit" && formData) {
      if (isEqual(formData, { ...values, id: formData.id })) {
        return toast.warning("변경사항이 없습니다.");
      }

      edit({
        id: formData.id,
        ...values,
        created_at: values.created_at.toISOString(),
        updated_at: now,
      });
      return;
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid items-start gap-6", className)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Title</FormLabel>
              <FormControl>
                <Input placeholder="제목" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">URL</FormLabel>
              <FormControl>
                <Input placeholder="https://designthou.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Course</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-60">
                  <SelectGroup>
                    {newsCategoryList.map((category, idx) => (
                      <SelectItem
                        key={`${category}_${idx}`}
                        value={category}
                        className="cursor-pointer"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="created_at"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker date={field.value} setDate={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg">
          {isAddPending || isEditPending ? (
            <AnimateLoader />
          ) : type === "add" ? (
            "Submit"
          ) : (
            "Edit"
          )}
        </Button>
      </form>
    </Form>
  );
}
