import { redirect } from "next/navigation";
import React from "react";
import { AdminMain, AdminNav, Aside } from "@/components";
import { createClient } from "@/lib/supabase/server";
import { route } from "@/constants";
import AuthProvider from "@/providers/AuthProvider";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(route.AUTH.LOGIN);
  }

  return (
    <div className="flex flex-col h-svh min-h-screen">
      <div className="flex flex-1">
        <AuthProvider initialUser={user}>
          <Aside />
          <AdminNav />
          <AdminMain>{children}</AdminMain>
        </AuthProvider>
      </div>
    </div>
  );
}
