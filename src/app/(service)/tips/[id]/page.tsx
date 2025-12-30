import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
import { AnimateLoader, Button } from "@/components";
import { createClient } from "@/lib/supabase/server";
import { convertSupabaseDateToShortHumanReadable } from "@/lib/supabase";
import { route } from "@/constants";

const YoutubeVideo = dynamic(
  () => import("@/components/(service)/tips/YoutubeVideo"),
  {
    loading: () => (
      <div className="ui-flex-center min-h-50 bg-muted rounded-lg">
        <AnimateLoader />
      </div>
    ),
  },
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
      <Button variant="secondary" size="lg" asChild>
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
      <div className="mt-8 p-4 w-full bg-muted rounded-lg">
        <Button type="button" asChild className="ml-auto">
          {data.download_url && (
            <Link href={data?.download_url} target="_blank" rel="noopener">
              <Download size={18} />
              Download
            </Link>
          )}
        </Button>
        <dl className="flex flex-col gap-4 px-3 py-1.5 w-full">
          <dt className="flex items-center gap-4">
            <span className="font-semibold">
              디자인도우 건축 디자인 오픈채팅방
            </span>
            <Button type="button" variant="default" asChild>
              <Link
                href="https://open.kakao.com/o/gzL5v2Hd"
                target="_blank"
                rel="noopenner noreferrer"
              >
                바로가기
                <ArrowUpRight size={18} />
              </Link>
            </Button>
          </dt>
          <dd className="flex items-center gap-2 w-full">
            <p>
              건축, 인테리어 작업에 도움이 필요할 때 언제든지 질문 가능합니다
            </p>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-light border border-orange-200 rounded-lg">
              <span>참여코드</span>-
              <span className="inline-block px-3 py-1.5 font-black text-white bg-gradient-orange-100 rounded-md">
                디도 (eleh)
              </span>
            </div>
          </dd>
        </dl>
      </div>
    </section>
  );
}
