import { useMutation } from "@tanstack/react-query";
import { type SignUpSchema } from "@/components";

export default function useSignup() {
  return useMutation({
    async mutationFn({
      email,
      password,
      nickname,
    }: Omit<SignUpSchema, "confirmPassword">) {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, nickname }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "회원가입 실패");
      }

      return response.json();
    },
  });
}
