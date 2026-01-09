import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Designthou";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
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
      <div tw="flex flex-col items-center">
        <h1
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "white", // orange-900 느낌
            textAlign: "center",
            padding: "0 80px",
            lineHeight: 1.2,
          }}
        >
          Designthou
        </h1>
        <p
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: "white", // orange-900 느낌
            textAlign: "center",
            padding: "0 40px",
            lineHeight: 1.2,
          }}
        >
          {title}
        </p>
        <p tw="mt-4 text-2xl text-gray-500">Architecture & Design Platform</p>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}
