import { ArrowUp } from "lucide-react";
import { Button } from "@/components";

export default function ScrollToBlockTopButton({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLElement | null>;
}) {
  return (
    <Button
      type="button"
      className="fixed right-4 bottom-16"
      size="icon-lg"
      onClick={() => {
        targetRef.current?.scrollTo({
          behavior: "smooth",
          top: 0,
        });
      }}
    >
      <ArrowUp size={20} />
    </Button>
  );
}
