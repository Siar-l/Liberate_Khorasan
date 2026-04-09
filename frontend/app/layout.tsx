import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://liberatekhorasan.org"),
  title: {
    default: "Liberate Khurasan",
    template: "%s | Liberate Khurasan",
  },
  description:
    "Liberate Khurasan shares announcements and articles in Persian and English.",
  keywords: [
    "Liberate Khurasan",
    "Khorasan",
    "Khurasan",
    "articles",
    "announcements",
    "Persian",
    "English",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "fa-IR": "/fa",
      "en-US": "/en",
    },
  },
  openGraph: {
    title: "Liberate Khurasan",
    description: "Announcements and articles in Persian and English.",
    url: "https://liberatekhorasan.org",
    siteName: "Liberate Khurasan",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Liberate Khurasan",
    description: "Announcements and articles in Persian and English.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
