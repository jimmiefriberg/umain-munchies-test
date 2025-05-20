import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Muchies",
  description: "Umain Test Site",
};

export const viewport = {
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  width: "device-width",
};

const SFPro = localFont({
  src: [
    {
      path: "../../public/fonts/SF-Pro.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/SF-Pro-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-sfpro",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${SFPro.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
