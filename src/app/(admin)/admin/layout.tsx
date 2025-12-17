import { AdminMain, AdminNav, Aside } from "@/components";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <Aside />
        <AdminNav />
        <AdminMain>{children}</AdminMain>
      </div>
    </div>
  );
}
