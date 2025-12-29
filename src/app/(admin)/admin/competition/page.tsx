import { Wip } from "@/components";
import { Sparkle } from "lucide-react";

export default function AdminCompetitionPage() {
  return (
    <section className="p-4">
      <Wip
        icon={<Sparkle size={18} />}
        message={"Competition Page, Still Work in progress"}
      />
    </section>
  );
}
