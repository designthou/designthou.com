import { Wip } from "@/components";
import { Sparkle } from "lucide-react";

export default function AdminOpenSourcePage() {
  return (
    <section className="p-4">
      <Wip
        icon={<Sparkle size={18} />}
        message={"Open Source Page, Still Work in progress"}
      />
    </section>
  );
}
