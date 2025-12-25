export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto pt-[var(--global-layout-nav-height)] max-w-300 w-full bg-white sm:mt-0">
      {children}
    </main>
  );
}
