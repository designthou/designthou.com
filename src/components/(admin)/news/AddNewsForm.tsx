"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import {
  AnimateLoader,
  Button,
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
import { useAddNewsMutation } from "@/hooks";

type AddNewsFormSchema = z.infer<typeof addNewsFormSchema>;

const addNewsFormSchema = z.object({
  title: z.string().min(1, {
    message: "제목은 최소 한 글자 이상이어야 합니다.",
  }),
  url: z.string().superRefine((val, ctx) => {
    try {
      const url = new URL(val);
      if (url.protocol !== "https:") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `"https://"로 시작하는 url 만 가능합니다.`,
        });
      }
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "유효하지 않는 URL 입니다.",
      });
    }
  }),
  category: z.string().nonempty("카테고리를 선택해 주세요"),
});

export default function AddNewsForm({
  closeForm,
  className,
}: {
  closeForm: () => void;
  className?: string;
}) {
  const form = useForm<AddNewsFormSchema>({
    resolver: zodResolver(addNewsFormSchema),
    defaultValues: {
      title: "",
      url: "",
      category: "architecture",
    },
  });

  const { mutate, isPending } = useAddNewsMutation(closeForm);
  const onSubmit = async (values: AddNewsFormSchema) => {
    const now = new Date().toISOString();
    mutate({ ...values, created_at: now, updated_at: now });
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
              <FormLabel>Title</FormLabel>
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
              <FormLabel>URL</FormLabel>
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
              <FormLabel className="font-semibold">코 스</FormLabel>
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

        <Button type="submit" size="lg">
          {isPending ? <AnimateLoader /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
