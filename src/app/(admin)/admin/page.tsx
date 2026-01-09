import { LogoutButton } from "@/components";
import { route } from "@/constants";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminRootPage() {
  // 로그인 전이면 redirect('/admin/login'), 로그인 후면 redirect('/admin/dashboard') -> middleware로 page.jsx 화면 그리기 전에 확인
  // redirect(route.ADMIN.DASHBOARD);
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(route.AUTH.LOGIN);
  }

  return (
    <div className="ui-flex-center flex-col gap-8 mt-8">
      {user && <p>환영합니다 {user.email}</p>}
      {user && <LogoutButton />}
    </div>
  );
}
