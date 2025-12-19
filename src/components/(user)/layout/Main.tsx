export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mt-[var(--global-layout-nav-height)] w-full bg-white sm:mt-0">
      {children}
    </main>
  );
}
