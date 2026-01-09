import { Metadata } from "next";
import { Sparkle } from "lucide-react";
import { Wip } from "@/components";
import { SiteConfig } from "@/app/config";

export const metadata: Metadata = {
  title: SiteConfig.title.ONLINE_COURSE,
  description: SiteConfig.description.ONLINE_COURSE,
  openGraph: {
    title: SiteConfig.title.ONLINE_COURSE,
    description: SiteConfig.title.ONLINE_COURSE,
    images: [
      {
        url: `${SiteConfig.url}/og/static?title=${encodeURIComponent(SiteConfig.title.ONLINE_COURSE)}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function ServiceOnlineCoursePage() {
  return (
    <section className="p-4 max-w-300">
      <h2 className="page-title">Online Course</h2>
      <div className="mt-8">
        <Wip
          icon={<Sparkle size={20} />}
          message="Online Course will be uploaded soon!"
          className="bg-none border border-dashed text-primary"
        />
      </div>
    </section>
  );
}
