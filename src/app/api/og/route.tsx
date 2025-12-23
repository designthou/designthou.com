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

    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const host = request.headers.get("host");
    const baseUrl = `${protocol}://${host}`;

    const ogBackgroundImageName = "og-background.webp";
    const imageUrl = `${baseUrl}/${ogBackgroundImageName}`;

    const imageRes = await fetch(imageUrl);
    if (!imageRes.ok) {
      throw new Error(`Failed to fetch image: ${imageUrl}`);
    }
    const imageBuffer = await imageRes.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString("base64");

    return new ImageResponse(
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 80,
          background: "#fff",
          fontWeight: 700,
        }}
      >
        {/* Background Image Layer */}
        <img
          alt={title}
          src={`data:image/jpeg;base64,${imageBase64}`}
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
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.2,
            color: "#fff",
            textAlign: "left",
            wordBreak: "keep-all",
            letterSpacing: "-0.03em",
            marginBottom: 8,
            justifyContent: "flex-start",
            textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
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
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      },
    );
  } catch (e: unknown) {
    return new Response(
      `Failed to generate the image: ${e instanceof Error ? e.message : "Unknown error"}`,
      {
        status: 500,
      },
    );
  }
}
