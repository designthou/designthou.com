import { z } from "zod";

type NewsFormSchema = z.infer<typeof newsFormSchema>;

const newsFormSchema = z.object({
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
  created_at: z.date(),
});

export type { NewsFormSchema };
export { newsFormSchema };
