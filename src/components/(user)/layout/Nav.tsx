"use client";

import Link from "next/link";
import React from "react";
import { ArrowRightIcon, X } from "lucide-react";
import { Button, Menu, MotionBlock } from "@/components";
import { route } from "@/constants";

export default function Nav() {
  const [isSideNavOpen, setIsSideNavOpen] = React.useState(false);
  const toggle = () => setIsSideNavOpen((isSideNavOpen) => !isSideNavOpen);

  return (
    <>
      <header className="fixed top-0 max-w-[1200px] mx-auto w-full h-[var(--global-layout-nav-height)] bg-white z-40 sm:static">
        <nav
          id="layout-nav"
          className="flex flex-row justify-between items-center p-3 w-full bg-white"
        >
          <h1 className="ui-flex-center text-lg font-black text-white bg-gradient-orange-100 rounded-lg">
            <Link href={route.SERVICE.ROOT} className="p-1.5">
              Designthou
            </Link>
          </h1>
          <Link
            href={route.SERVICE.REVIEWS}
            className="hidden p-2 font-medium rounded-lg transition-colors hover:bg-gray-50 active:bg-muted sm:inline-block"
          >
            Reviews
          </Link>
          <Button
            type="button"
            size="icon-lg"
            variant="ghost"
            className={`${isSideNavOpen ? "bg-light" : "bg-none"} rounded-full sm:hidden`}
            onClick={toggle}
          >
            {isSideNavOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </nav>
      </header>

      <div
        id="layout-side-navigation"
        className={`fixed top-[var(--global-layout-nav-height)] left-0 right-0 flex flex-col ${
          isSideNavOpen ? "max-h-full" : "max-h-0"
        } px-3 w-full bg-white z-20 overflow-hidden transition-[max-height] duration-200 ease-[cubic-bezier(0.22, 1, 0.36, 1)] md:hidden`}
      >
        <MotionBlock onClick={toggle} className="rounded-lg">
          <Link
            href={route.SERVICE.REVIEWS}
            className="flex justify-between items-center px-3 w-full min-h-15 rounded-lg font-medium cursor-pointer active:bg-light"
          >
            <span>Reviews</span>
            <ArrowRightIcon size={20} />
          </Link>
        </MotionBlock>
      </div>
      <div
        id="layout-overlay"
        onClick={toggle}
        className={`fixed top-0 ${isSideNavOpen ? "left-0" : "slide-out-to-bottom-full"} right-0 bottom-0 h-full bg-muted ${
          isSideNavOpen ? "opacity-80" : "opacity-0"
        } z-10 transition-opacity will-change-transform duration-300 ease-[cubic-bezier(0.22, 1, 0.36, 1)] cursor-pointer md:hidden`}
      />
    </>
  );
}
