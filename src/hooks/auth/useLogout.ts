import { useMutation } from "@tanstack/react-query";

export default function useLogout() {
  return useMutation({
    async mutationFn() {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "로그아웃 실패");
      }

      return response.json();
    },
  });
}
