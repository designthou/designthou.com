import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Sparkle } from "lucide-react";
import { SiteConfig } from "@/app/config";
import { AnimateLoader, Wip } from "@/components";

export const metadata: Metadata = {
  title: SiteConfig.title.OPEN_SOURCE,
  description: SiteConfig.description.OPEN_SOURCE,
};

const YoutubeVideo = dynamic(
  () => import("@/components/(service)/tips/YoutubeVideo"),
  {
    loading: () => (
      <div className="ui-flex-center min-h-50 bg-muted rounded-lg sm:min-h-130">
        <AnimateLoader />
      </div>
    ),
  },
);

export default function ServiceTipsPage() {
  return (
    <section className="p-4 max-w-300">
      <h2 className="page-title">Youtube Tips</h2>
      <div className="mt-8">
        <YoutubeVideo />
        <Wip
          icon={<Sparkle size={20} />}
          message="Multiple Youtube Tips will be uploaded soon!"
          className="mt-8 bg-none border border-dashed text-primary"
        />
      </div>
    </section>
  );
}
