import { Wip } from "@/components";
import { Sparkle } from "lucide-react";

export default function AdminOnlineCoursePage() {
  return (
    <section className="p-4">
      <Wip
        icon={<Sparkle size={18} />}
        message={"Online Course Page, Still Work in progress"}
      />
    </section>
  );
}
