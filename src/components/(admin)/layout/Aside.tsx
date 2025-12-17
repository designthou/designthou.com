"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { LayoutList, MonitorPlay, Newspaper, Search } from "lucide-react";
import { Button } from "@/components";
import { route } from "@/constants";

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

  return (
    <div className="relative">
      <aside
        className={`fixed flex-col left-0 hidden py-2 h-full w-14 max-h-screen bg-white overflow-y-auto overflow-x-hidden border-muted border-r md:sticky md:flex lg:w-56 lg:p-3`}
      >
        <div className="flex h-full flex-col justify-between gap-2 lg:gap-4">
          <header className="flex justify-between items-center min-h-9">
            <h1 className="inline-flex justify-center item-center py-1.5 px-2">
              <Link
                href={route.ADMIN.DASHBOARD}
                className="text-sm font-black text-center lg:text-lg"
              >
                Designthou
              </Link>
            </h1>
            <Button type="button" variant="ghost" size="icon-sm">
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
