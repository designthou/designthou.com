import { Metadata } from "next";
import { SupportForm } from "@/components";
import { SiteConfig } from "@/app/config";

export const metadata: Metadata = {
  title: SiteConfig.title.OPEN_SOURCE,
  description: SiteConfig.description.OPEN_SOURCE,
};

export default function ServiceSupportPage() {
  return (
    <section className="p-4 max-w-300">
      <h2 className="page-title">Support</h2>
      <div className="mt-8">
        <SupportForm />
      </div>
    </section>
  );
}
