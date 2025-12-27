import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.NEXT_PUBLIC_SUPABASE_REMOTE_IMAGE_HOSTNAME}`,
        pathname: `/storage/v1/object/public/${process.env.NEXT_PUBLIC_SUPABASE_REMOTE_IMAGE_BUCKET_NAME}/**`,
      },
    ],
  },
};

export default nextConfig;
