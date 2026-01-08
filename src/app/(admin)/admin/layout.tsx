import React from "react";
import { AdminMain, AdminNav, Aside } from "@/components";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-svh min-h-screen">
      <div className="flex flex-1">
        <Aside />
        <AdminNav />
        <AdminMain>{children}</AdminMain>
      </div>
    </div>
  );
}
