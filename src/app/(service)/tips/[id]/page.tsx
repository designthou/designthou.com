import dynamic from "next/dynamic";
import { AnimateLoader, Button } from "@/components";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { convertSupabaseDateToShortHumanReadable } from "@/lib/supabase";
import { route } from "@/constants";
import { ArrowLeft, Download } from "lucide-react";

const YoutubeVideo = dynamic(
  () => import("@/components/(service)/tips/YoutubeVideo"),
  {
    loading: () => (
      <div className="ui-flex-center min-h-50 bg-muted rounded-lg">
        <AnimateLoader />
      </div>
    ),
  }
);

export default async function TipVideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("youtube_tips")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return (
    <section className="mx-auto p-4">
      <Button asChild size="lg">
        <Link href={route.SERVICE.TIPS}>
          <ArrowLeft size={18} />
          Tips Page
        </Link>
      </Button>
      <div className="ui-flex-center-between mt-8">
        <h2 className="page-title">{data?.title}</h2>
        <div className="px-3 py-1.5 w-fit bg-gray-100 text-gray-700 rounded-lg">
          {convertSupabaseDateToShortHumanReadable(data?.created_at)}
        </div>
      </div>
      <div className="mt-8 rounded-lg">
        <YoutubeVideo url={data?.url} />
      </div>
      <div className="mt-8 w-full">
        <Button type="button" asChild className="ml-auto">
          {data.download_url && (
            <Link href={data?.download_url} target="_blank" rel="noopener">
              <Download size={18} />
              Download
            </Link>
          )}
        </Button>
      </div>
    </section>
  );
}
