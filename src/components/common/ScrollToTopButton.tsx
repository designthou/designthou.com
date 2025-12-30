"use client";

import { useScroll } from "@/hooks";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components";
import { cn } from "@/lib/utils";

const topPositionToStartShowing = 300;

export default function ScrollToTopButton() {
  const pageYOffset = useScroll();

  return (
    <Button
      type="button"
      size="lg"
      className={cn(
        "rounded-full",
        `${pageYOffset >= topPositionToStartShowing ? "fixed bottom-8 right-4 h-12 z-20" : "hidden"}`,
      )}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      aria-label="Scroll To Top of the Window Button"
    >
      <ArrowUp size={20} />
    </Button>
  );
}
