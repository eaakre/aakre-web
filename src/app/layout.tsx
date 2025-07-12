import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Head from "next/head";
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
  title: "Solid Ground Homes",
  description:
    "Custom homes built for Minnesota, North Dakota, and South Dakota",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Head>
          <meta
            name="google-site-verification"
            content="ANFRUgsgM1JSrkKp3WJEb4O3UbOJIba3IEfutVsjLE4"
          />
        </Head>
        <Header />
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
