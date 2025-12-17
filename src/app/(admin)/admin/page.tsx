import { route } from "@/constants";
import { redirect } from "next/navigation";

export default function AdminRootPage() {
  // 로그인 전이면 redirect('/admin/login'), 로그인 후면 redirect('/admin/dashboard') -> middleware로 page.jsx 화면 그리기 전에 확인
  redirect(route.ADMIN.DASHBOARD);
  return null;
}
