export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="w-full bg-white">{children}</main>;
}
