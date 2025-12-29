"use client";

import dynamic from "next/dynamic";
import { getYouTubeId } from "@/utils/video";
import { AnimateLoader } from "@/components/common";

const YouTube = dynamic(() => import("react-youtube"), {
  ssr: false,
  loading: () => (
    <div className="ui-flex-center min-h-50 bg-muted rounded-lg sm:min-h-90 md:min-h-130 lg:min-h-160">
      <AnimateLoader />
    </div>
  ),
});

export default function Video({
  url = "https://youtu.be/pHhTa65w9c4?si=8hrUjLUuk6xgg2O0",
}: {
  url?: string;
}) {
  const videoId = getYouTubeId(url);

  return (
    <div
      id="ytb-wrapper"
      className="w-full aspect-video rounded-xl overflow-hidden"
    >
      <YouTube
        videoId={videoId!}
        style={{ borderRadius: "64px" }}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 0,
            modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
            rel: 0, // 영상 종료 후 관련 영상 숨김
            showinfo: 0, // (deprecated지만 일부 환경에서 영향)
            fs: 0, // 전체화면 버튼 숨김
            iv_load_policy: 3, // 영상 내 정보 카드 숨김
          },
        }}
        iframeClassName="aspect-video-iframe"
        className="aspect-video"
        onEnd={(e) => {
          e.target.stopVideo(0);
        }}
      />
    </div>
  );
}
