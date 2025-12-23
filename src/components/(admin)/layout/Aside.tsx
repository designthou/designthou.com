"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import {
  House,
  LayoutList,
  MonitorPlay,
  Newspaper,
  Search,
} from "lucide-react";
import designthouSVG from "@/public/favicon.svg";
import { Button } from "@/components";
import { route, screenSize } from "@/constants";
import { useMediaQuery } from "@/hooks";

const links = [
  {
    title: "News",
    to: route.ADMIN.NEWS,
    icon: <Newspaper size={18} className="text-gray-900" />,
  },
  {
    title: "Competitons",
    to: route.ADMIN.COMPETITION,
    icon: <LayoutList size={18} />,
  },
  {
    title: "Youtube Tips",
    to: route.ADMIN.TIPS,
    icon: <MonitorPlay size={18} />,
  },
] as const;

export default function Aside() {
  const segment = useSelectedLayoutSegment();
  const isLGDown = useMediaQuery(screenSize.MAX_LG);
  console.log(isLGDown);
  return (
    <div className="relative">
      <aside
        className={`fixed flex-col left-0 hidden py-2 h-full w-14 max-h-screen bg-white overflow-y-auto overflow-x-hidden border-muted border-r md:sticky md:flex lg:w-56 lg:p-3`}
      >
        <div className="flex flex-col justify-between gap-2 h-full lg:gap-4">
          <header className="flex justify-center items-center min-h-9 lg:justify-between">
            <h1 className={"ui-flex-center text-black"}>
              <Link
                href={route.ADMIN.DASHBOARD}
                className="inline-flex items-center gap-0 text-center hover:bg-light lg:gap-1 lg:text-lg"
              >
                <Image
                  src={designthouSVG}
                  alt="Designthou"
                  width={36}
                  height={36}
                  priority
                />
              </Link>
            </h1>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="hidden lg:inline-flex"
            >
              <Search size={18} className="text-gray-900" />
            </Button>
          </header>
          <nav className="flex flex-col flex-1 gap-2 md:px-2 lg:px-0">
            {links.map(({ title, to, icon }) => (
              <Link
                href={to}
                key={to}
                className={`ui-flex-center gap-0 py-1.5 px-2 min-h-9 ${
                  to === route.SERVICE.ROOT + segment ? "bg-muted" : "bg-white"
                } text-gray-800 font-medium rounded-md hover:bg-muted active:bg-gray-200 transition-colors lg:gap-2 lg:justify-between`}
              >
                <div className="ui-flex-center gap-2">
                  {icon}
                  <span className="hidden lg:inline">{title}</span>
                </div>
                {to === route.SERVICE.ROOT + segment && (
                  <div className="hidden mr-2 w-1.5 h-1.5 rounded-full bg-black lg:inline-block" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="px-2 lg:px-0">
          <Button type="button" className="mb-2 w-full font-bold" asChild>
            <Link href={route.SERVICE.ROOT} target="_blank">
              <span className="hidden lg:inline">사용자 홈</span>
              <House size={18} />
            </Link>
          </Button>
        </div>

        <small className="text-default mx-3 mb-2 mt-1 hidden text-[0.5rem] opacity-50 lg:block">
          © 2025{" "}
          <Link
            href={route.SERVICE.ROOT}
            className="hover:underline"
            target="_blank"
          >
            DESIGNTHOU
          </Link>
        </small>
      </aside>
    </div>
  );
}
