import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://bio-affiliate.vercel.app"),
  title: "PHU | Affiliate",
  description: "Sản phẩm yêu thích được tuyển chọn bởi PHU",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "PHU | Affiliate",
    description: "Sản phẩm yêu thích được tuyển chọn bởi PHU",
    images: [{ url: "/img_1775.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PHU | Affiliate",
    description: "Sản phẩm yêu thích được tuyển chọn bởi PHU",
    images: ["/img_1775.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
