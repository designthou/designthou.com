import { Metadata } from "next";
import { Sparkle } from "lucide-react";
import { Wip } from "@/components";
import { SiteConfig } from "@/app/config";

export const metadata: Metadata = {
  title: SiteConfig.title.NOTICE,
  description: SiteConfig.description.NOTICE,
  openGraph: {
    title: SiteConfig.title.NOTICE,
    description: SiteConfig.title.NOTICE,
    images: [
      {
        url: `${SiteConfig.url}/og/static?title=${encodeURIComponent(SiteConfig.title.NOTICE)}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function ServiceNoticePage() {
  return (
    <section className="p-4 max-w-300">
      <h2 className="page-title">Notice</h2>
      <div className="mt-8">
        <Wip
          icon={<Sparkle size={20} />}
          message="Notice List will be uploaded soon!"
          className="bg-none border border-dashed text-primary"
        />
      </div>
    </section>
  );
}
