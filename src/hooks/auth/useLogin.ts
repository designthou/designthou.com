import { useMutation } from "@tanstack/react-query";
import { type LoginSchema } from "@/components";

export default function useLogin() {
  return useMutation({
    async mutationFn({ email, password }: LoginSchema) {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "로그인 실패");
      }

      return response.json();
    },
  });
}
