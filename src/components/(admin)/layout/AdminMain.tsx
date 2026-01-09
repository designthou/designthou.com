"use client";

import React from "react";
import { ScrollToBlockTopButton } from ".";

export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 flex-col w-0">
      <main className="relative flex-1 pb-8 pt-[calc(var(--global-layout-padding)+var(--global-layout-nav-height))] w-full bg-white z-0 sm:pt-0">
        {children}
        <ScrollToBlockTopButton />
      </main>
    </div>
  );
}
