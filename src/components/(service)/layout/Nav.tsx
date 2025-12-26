"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import Image from "next/image";
import React from "react";
import { ArrowRightIcon, X } from "lucide-react";
import designthouSVG from "@/public/favicon.svg";
import { Button, Menu, MotionBlock } from "@/components";
import { route } from "@/constants";
import { cn } from "@/lib/utils";

const navigations = [
  {
    title: "News",
    to: route.SERVICE.NEWS,
  },
  {
    title: "Tips",
    to: route.SERVICE.TIPS,
  },

  {
    title: "Reviews",
    to: route.SERVICE.REVIEWS,
  },
] as const;

export default function Nav() {
  const [isSideNavOpen, setIsSideNavOpen] = React.useState(false);
  const toggle = () => setIsSideNavOpen((isSideNavOpen) => !isSideNavOpen);

  const segment = useSelectedLayoutSegment();
  return (
    <>
      <header className="fixed top-0 mx-auto w-full h-[var(--global-layout-nav-height)] bg-white/30 backdrop-blur-sm z-40">
        <nav
          id="layout-nav"
          className="flex flex-row justify-between items-center mx-auto p-3 max-w-300 w-full bg-white/30 backdrop-blur-sm"
        >
          <h1 className="ui-flex-center text-white bg-gradient-orange-100 rounded-lg">
            <Link
              href={route.SERVICE.ROOT}
              className="inline-flex items-center gap-2 p-1.5 text-center text-lg font-black"
              aria-label="Go to Designthou Main Page"
            >
              <Image
                src={designthouSVG}
                alt="Designthou"
                width={28}
                height={28}
                priority
              />
              Designthou
            </Link>
          </h1>
          <div className="ui-flex-center-between gap-4">
            {navigations.map((navigation) => (
              <Link
                key={navigation.title}
                href={navigation.to}
                className={cn(
                  "hidden p-2 font-medium text-gray-700 rounded-lg transition-all hover:opacity-90 active:bg-muted sm:inline-block",
                  route.SERVICE.ROOT + segment === navigation.to
                    ? "bg-primary font-semibold text-white"
                    : "bg-white hover:bg-muted",
                )}
              >
                {navigation.title}
              </Link>
            ))}
          </div>
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
        {navigations.map((navigation) => (
          <MotionBlock
            key={navigation.title}
            onClick={toggle}
            className="rounded-lg"
          >
            <Link
              href={navigation.to}
              className="ui-flex-center-between px-3 w-full min-h-15 rounded-lg font-medium cursor-pointer active:bg-light"
            >
              <span>{navigation.title}</span>
              <ArrowRightIcon size={20} />
            </Link>
          </MotionBlock>
        ))}
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
