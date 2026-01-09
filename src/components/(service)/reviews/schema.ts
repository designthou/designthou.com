import { z } from "zod";

type ReviewFormSchema = z.infer<typeof reviewFormSchema>;

const reviewFormSchema = z.object({
  title: z.string().min(1, {
    message: "제목은 최소 한 글자 이상이어야 합니다.",
  }),
  content: z.string().min(10, {
    message: "내용은 최소 10글자 이상이어야 합니다.",
  }),
  category: z.string().nonempty("카테고리를 선택해 주세요"),
});

export type { ReviewFormSchema };
export { reviewFormSchema };
