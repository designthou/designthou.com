import { Wip } from "@/components";
import { Sparkle } from "lucide-react";

export default function YoutubeTipsPage() {
  return (
    <section className="p-4">
      <Wip
        icon={<Sparkle size={18} />}
        message={"Youtube Tips, Still Work in progress"}
      />
    </section>
  );
}
