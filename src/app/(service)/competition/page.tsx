import { Metadata } from "next";
import { Sparkle } from "lucide-react";
import { Wip } from "@/components";
import { SiteConfig } from "@/app/config";

export const metadata: Metadata = {
  title: SiteConfig.title.ABOUT,
  description: SiteConfig.description.COMPETITION,
};

export default function ServiceCompetitionPage() {
  return (
    <section className="p-4 max-w-300">
      <h2 className="page-title">Competitions</h2>
      <div className="mt-8">
        <Wip
          icon={<Sparkle size={20} />}
          message="Competitions will be uploaded soon!"
          className="bg-none border border-dashed text-primary"
        />
      </div>
    </section>
  );
}
