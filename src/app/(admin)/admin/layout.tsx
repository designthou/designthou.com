import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-1 min-h-screen">AdminLayout{children}</div>;
}
