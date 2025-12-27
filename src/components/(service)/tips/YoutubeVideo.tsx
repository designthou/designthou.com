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
    <YouTube
      videoId={videoId!}
      style={{ borderRadius: "64px" }}
      opts={{
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 0,
          modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
        },
      }}
      iframeClassName="aspect-video-iframe"
      className="aspect-video"
      onEnd={(e) => {
        e.target.stopVideo(0);
      }}
    />
  );
}
