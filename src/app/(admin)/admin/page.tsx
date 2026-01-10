"use client";

import { LogoutButton } from "@/components";
import { useAuthStore } from "@/stores";

export default function AdminRootPage() {
  const user = useAuthStore(({ user }) => user);

  return (
    <div className="ui-flex-center flex-col gap-8 mt-8">
      {user && <p>환영합니다 {user.email}</p>}
      {user && <LogoutButton />}
    </div>
  );
}
