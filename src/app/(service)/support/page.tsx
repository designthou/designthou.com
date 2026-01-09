import { Metadata } from "next";
import { SupportForm } from "@/components";
import { SiteConfig } from "@/app/config";

export const metadata: Metadata = {
  title: SiteConfig.title.SUPPORT,
  description: SiteConfig.description.SUPPORT,
  openGraph: {
    title: SiteConfig.title.SUPPORT,
    description: SiteConfig.title.SUPPORT,
    images: [
      {
        url: `${SiteConfig.url}/og/static?title=${encodeURIComponent(SiteConfig.title.SUPPORT)}`,
        width: 1200,
        height: 630,
      },
    ],
  },
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
