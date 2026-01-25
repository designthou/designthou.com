import type { NextConfig } from 'next';
import withPlaiceholder from '@plaiceholder/next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: process.env.NEXT_PUBLIC_SUPABASE_HOSTNAME!,
				pathname: '/storage/v1/object/public/**',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				pathname: '/**',
			},
		],
	},
};

export default withPlaiceholder(nextConfig);
