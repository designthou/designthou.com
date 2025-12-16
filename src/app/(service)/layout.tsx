// import { Aside, Main, Nav } from "@/components/layout";
// import { ReactQueryProvider } from "@/providers";

import { Main, Nav } from "@/components/";

export default function ServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[1200px] h-screen mx-auto w-full">
      <Nav />
      <Main>{children}</Main>
      {/* <ReactQueryProvider>
          <Aside />
          <Nav />
          <Main>{children}</Main>
        </ReactQueryProvider> */}
    </div>
  );
}
