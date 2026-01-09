import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    <div tw="flex flex-col w-full h-full items-center justify-center">
      <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
        <h1 tw="flex flex-col text-4xl font-bold tracking-tight text-center">
          Youtube Tips
        </h1>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}
