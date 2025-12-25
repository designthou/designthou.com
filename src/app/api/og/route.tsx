import React from "react";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") ?? "designthou";

    if (!title) {
      return new Response("Missing title", { status: 400 });
    }

    const imageUrl = new URL("/og-background2.png", request.url).toString();
    return new ImageResponse(
      <div
        style={{
          position: "relative",
          display: "flex",
          height: "100%",
          width: "100%",
          backgroundColor: "black",
        }}
      >
        {/* Background Image Layer */}
        <img
          alt={title}
          src={imageUrl}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(3px)",
            transform: "scale(1.02)",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.2,
            color: "#000",
            textAlign: "left",
            wordBreak: "keep-all",
            letterSpacing: "-0.03em",
            marginBottom: 8,
            width: "100%",
          }}
        >
          {title}
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=36000",
        },
      }
    );
  } catch (e: unknown) {
    return new Response(
      `Failed to generate the image: ${e instanceof Error ? e.message : "Unknown error"}`,
      {
        status: 500,
      }
    );
  }
}
