import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SiteConfig } from "@/app/config";
import {
  Footer,
  KakaoOpenChat,
  Main,
  Nav,
  ScrollToTopButton,
} from "@/components";
import { ReactQueryProvider } from "@/providers";
import { GAProvider } from "@/lib/ga4";
import Script from "next/script";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s`,
    default: SiteConfig.title.default,
  },
  description: SiteConfig.subtitle,
  openGraph: {
    title: SiteConfig.title.default,
    description: SiteConfig.subtitle,
    siteName: "Designthou",
    locale: "ko_KR",
    type: "website",
    url: SiteConfig.url,
    images: [
      {
        url: `https://designthou.com/og-background2.png`,
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SiteConfig.title.default,
    description: "Designthou - Spatial Content Platform",
    images: ["https://designthou.com/api/og?title=designthou&twitter=1"],
  },
  icons: {
    icon: "/apple-touch-icon.png",
    shortcut: "/apple-touch-icon.png",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_ID,
    other: {
      "naver-site-verification":
        process.env.NEXT_PUBLIC_NAVER_SEARCH_CONSOLE_ID!,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="apple-mobile-web-app-title" content="Designthou" />
        <meta name="msapplication-TileColor" content="ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1, user-scalable=0"
        />
        <meta name="robots" content="index, follow" />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        {process.env.NEXT_PUBLIC_GA4_ID ? (
          <GAProvider gaId={process.env.NEXT_PUBLIC_GA4_ID} />
        ) : null}
        <div className="h-screen mx-auto w-full">
          <ReactQueryProvider>
            <Nav />
            <Main>{children}</Main>
            <Footer />
            <KakaoOpenChat />
            <ScrollToTopButton />
          </ReactQueryProvider>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
