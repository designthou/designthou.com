import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
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
  TipTapEditor,
} from "@/components";
import { reviewFormSchema, ReviewFormSchema } from "./schema";
import { reviewsCategoryList } from "@/constants";

export default function AddReviewForm({ footer }: { footer: React.ReactNode }) {
  const form = useForm<ReviewFormSchema>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      title: "생생한 포트폴리오 후기입니다.",
      content: "후기를 작성해 주세요.",
      category: "online-course",
    },
  });

  const onSubmit = async (values: ReviewFormSchema) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">제 목</FormLabel>
              <FormControl>
                <Input placeholder="제목" {...field} />
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
              <FormLabel className="font-semibold">카테고리</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-60">
                  <SelectGroup>
                    {reviewsCategoryList.map((category, idx) => (
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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">내 용</FormLabel>
              <FormControl>
                <TipTapEditor value={field.value} onChange={field.onChange} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {footer}
      </form>
    </Form>
  );
}
