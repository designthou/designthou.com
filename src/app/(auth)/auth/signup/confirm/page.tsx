import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { route } from "@/constants";

export default async function ConfirmPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(route.ADMIN.ROOT);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-lg font-semibold">이메일 인증을 처리 중입니다</h1>
      <p className="text-sm text-muted-foreground">잠시만 기다려 주세요...</p>
    </div>
  );
}
