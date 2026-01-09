import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "Designthou";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `
            radial-gradient(
              circle at 20% 80%,
              #fed7aa 0%,
              #f87171 45%,
              #fff7ed 100%
            )
          `,
      }}
    >
      <h1
        style={{
          fontSize: 72,
          fontWeight: 900,
          color: "#fff",
          letterSpacing: "-0.03em",
          textAlign: "center",
        }}
      >
        {title}
      </h1>

      <p
        style={{
          marginTop: 16,
          fontSize: 28,
          fontWeight: 500,
          color: "#fff",
        }}
      >
        Architecture & Design Platform
      </p>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}
