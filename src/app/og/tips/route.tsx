import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "Designthou";

  return new ImageResponse(
    <div
      tw="flex flex-col w-full h-full items-center justify-center"
      style={{
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
      <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
        <h1 tw="flex flex-col text-4xl font-black tracking-tight text-center">
          {title}
        </h1>
        <p tw="mt-4 text-2xl text-gray-500">Architecture & Design Platform</p>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}
