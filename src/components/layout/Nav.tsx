import Link from "next/link";
import { route } from "@/constants";

export default async function Nav() {
  return (
    <header className="max-w-[1200px] mx-auto w-full z-40">
      <nav
        id="layout-nav"
        className="flex flex-row justify-between items-center w-full p-3"
      >
        <h1 className="ui-flex-center text-lg font-black text-white bg-gradient-orange-100 rounded-lg transition-colors hover:bg-light">
          <Link href={route.SERVICE.ROOT} className="p-1.5">
            Designthou
          </Link>
        </h1>
      </nav>
    </header>
  );
}
