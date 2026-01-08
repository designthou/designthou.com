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
    <div className="flex flex-1 flex-col w-0">
      <main
        ref={targetRef}
        className="relative flex-1 pb-8 pt-[calc(var(--global-layout-padding)+var(--global-layout-nav-height))] w-full bg-white z-0 sm:pt-0"
      >
        {children}
        <ScrollToBlockTopButton targetRef={targetRef} />
      </main>
    </div>
  );
}
