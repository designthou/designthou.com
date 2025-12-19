"use client";

import Link from "next/link";
import React from "react";
import { ArrowRightIcon, X } from "lucide-react";
import { MotionBlock, Button, Menu } from "@/components";
import { route } from "@/constants";

export default function Nav() {
  const [isSideNavOpen, setIsSideNavOpen] = React.useState(false);
  const toggle = () => setIsSideNavOpen((isSideNavOpen) => !isSideNavOpen);

  return (
    <>
      <nav
        id="layout-nav"
        className={`fixed flex justify-center w-full pt-3 px-3 ${isSideNavOpen ? "bg-white" : ""} z-40 md:hidden`}
      >
        <div className="flex justify-between items-center flex-1 w-full px-4 py-3 min-h-[var(--global-layout-nav-height)] border border-muted rounded-xl bg-white backdrop-blur-lg">
          <h1
            className="ui-flex-center text-lg font-black text-white bg-gradient-gray-200 rounded-lg transition-colors hover:bg-light"
            onClick={() => setIsSideNavOpen(false)}
          >
            <Link href={route.ADMIN.DASHBOARD} className="p-1.5">
              Designthou
            </Link>
          </h1>
          <Button
            type="button"
            size="icon-lg"
            variant="ghost"
            className={`${isSideNavOpen ? "bg-light" : "bg-none"} rounded-full`}
            onClick={toggle}
          >
            {isSideNavOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </nav>

      <div
        id="layout-side-navigation"
        className={`fixed top-[calc(var(--global-layout-padding)+var(--global-layout-nav-height))] left-0 right-0 flex flex-col ${
          isSideNavOpen ? "max-h-full" : "max-h-0"
        } px-3 w-full bg-white z-20 overflow-hidden transition-[max-height] duration-200 ease-[cubic-bezier(0.22, 1, 0.36, 1)] md:hidden`}
      >
        <MotionBlock onClick={toggle} className="rounded-lg">
          <Link
            href={route.ADMIN.NEWS}
            className="flex justify-between items-center px-3 w-full min-h-15 rounded-lg font-medium cursor-pointer active:bg-light"
          >
            <span>News</span>
            <ArrowRightIcon size={20} />
          </Link>
        </MotionBlock>
        <MotionBlock onClick={toggle} className="rounded-lg">
          <Link
            href={route.ADMIN.COMPETITION}
            className="flex justify-between items-center px-3 w-full min-h-15 font-medium rounded-lg cursor-pointer active:bg-light"
          >
            Competition
            <ArrowRightIcon size={20} />
          </Link>
        </MotionBlock>
        <MotionBlock onClick={toggle} className="rounded-lg">
          <Link
            href={route.ADMIN.TIPS}
            className="flex justify-between items-center px-3 w-full min-h-15 font-medium rounded-lg cursor-pointer active:bg-light"
          >
            Youtube Tips
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
