import { z } from "zod";

type LoginSchema = z.infer<typeof loginSchema>;
type SignUpSchema = z.infer<typeof signUpSchema>;

const loginSchema = z.object({
  email: z.email({ message: "Email is invalid" }),
  password: z
    .string()
    .min(1, { message: "Password cannot be blank" })
    .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{7,15}$/, {
      message: `Write correct password format`,
    }),
});

const signUpSchema = z
  .object({
    email: z.email({ message: "이메일 형식이 올바르지 않습니다." }),
    password: z
      .string()
      .min(1, { message: "Password cannot be blank" })
      .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{7,15}$/, {
        message: `올바른 비밀번호 형식을 입력해주세요 (특수문자 포함)`,
      }),
    confirmPassword: z.string().regex(/.+/, {
      message: "확인을 위해 패스워드를 한 번 더 입력해 주세요",
    }),
    nickname: z.string().min(2, { message: "2글자 이상 작성해주세요" }),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    path: ["confirmPassword"],
    message: "패스워드가 일치하지 않습니다.",
  });

export type { LoginSchema, SignUpSchema };
export { loginSchema, signUpSchema };
