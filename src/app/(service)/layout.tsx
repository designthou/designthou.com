import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "../globals.css";
import { SiteConfig } from "@/../config";
import { Main, Nav, ScrollToTopButton } from "@/components";
import { ReactQueryProvider } from "@/providers";
import { GAProvider } from "@/lib/ga4";

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
    template: `%s - ${SiteConfig.title.default}`,
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
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_ID,
    other: {
      "naver-site-verification": "d40d03ef9270913b96ad108a57d72246fdfc73e8",
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
      </head>
      <body className={`${inter} ${geistMono.variable} antialiased`}>
        {process.env.NEXT_PUBLIC_GA4_ID ? (
          <GAProvider gaId={process.env.NEXT_PUBLIC_GA4_ID} />
        ) : null}
        <div className="max-w-300 h-screen mx-auto w-full">
          <ReactQueryProvider>
            <Nav />
            <Main>{children}</Main>
            <ScrollToTopButton />
          </ReactQueryProvider>
        </div>
      </body>
    </html>
  );
}
