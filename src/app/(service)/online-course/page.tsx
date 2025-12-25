import { Metadata } from "next";
import { Sparkle } from "lucide-react";
import { Wip } from "@/components";
import { SiteConfig } from "@/app/config";

export const metadata: Metadata = {
  title: SiteConfig.title.ONLINE_COURSE,
  description: SiteConfig.description.ONLINE_COURSE,
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
