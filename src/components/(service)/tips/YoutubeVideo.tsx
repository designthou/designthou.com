"use client";

import dynamic from "next/dynamic";
import { getYouTubeId } from "@/utils/video";
import { AnimateLoader } from "@/components/common";

const YouTube = dynamic(() => import("react-youtube"), {
  ssr: false,
  loading: () => (
    <div className="ui-flex-center min-h-50 bg-muted rounded-lg sm:min-h-130">
      <AnimateLoader />
    </div>
  ),
});

export default function Video() {
  const videoId = getYouTubeId(
    "https://youtu.be/pHhTa65w9c4?si=8hrUjLUuk6xgg2O0",
  );

  return (
    <YouTube
      videoId={videoId!}
      style={{ borderRadius: "16px" }}
      opts={{
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 0,
        },
      }}
      className="aspect-video"
    />
  );
}
