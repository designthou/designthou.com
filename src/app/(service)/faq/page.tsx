import { Metadata } from "next";
import { Sparkle } from "lucide-react";
import { FaqAccordion, Wip } from "@/components";
import { SiteConfig } from "@/app/config";

export const metadata: Metadata = {
  title: SiteConfig.title.FAQ,
  description: SiteConfig.description.FAQ,
  openGraph: {
    title: SiteConfig.title.FAQ,
    description: SiteConfig.title.FAQ,
    images: [
      {
        url: `${SiteConfig.url}/og/static`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function ServiceFAQPage() {
  return (
    <section className="p-4 max-w-300">
      <h2 className="page-title">FAQ (자주 묻는 질문)</h2>
      <div className="mt-8">
        <FaqAccordion />
        <Wip
          icon={<Sparkle size={20} />}
          message="FAQ will be more updated soon!"
          className="mt-8 bg-none border border-dashed text-primary"
        />
      </div>
    </section>
  );
}
