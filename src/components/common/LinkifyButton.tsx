import Link from "next/link";
import React from "react";
import { Button } from "@/components";

export default function LinkifyButton({
  title,
  href,
  icon,
}: {
  title: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Button type="button" variant="secondary" size="lg" asChild>
      <Link href={href} className="font-semibold">
        {title}
        {icon}
      </Link>
    </Button>
  );
}
