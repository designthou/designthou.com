"use client";

import React from "react";
import { ScrollToBlockTopButton } from ".";

export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const targetRef = React.useRef<HTMLElement | null>(null);

  return (
    <main
      ref={targetRef}
      className="grid grid-rows-[1fr] w-full h-screen overflow-y-auto pt-[calc(var(--global-layout-padding)+var(--global-layout-nav-height))] pb-4 bg-white sm:pt-0"
    >
      {children}
      <ScrollToBlockTopButton targetRef={targetRef} />
    </main>
  );
}
