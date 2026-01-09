import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    <div tw="flex w-full h-full items-center justify-center bg-white">
      <div tw="flex flex-col items-center">
        <h1 tw="flex items-center text-6xl font-bold tracking-tight">
          <span className="p-3 text-white bg-gradient-orange-100 rounded-lg">
            Designthou
          </span>
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
