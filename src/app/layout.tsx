import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import ReactQueryProvider from "@/providers/react-query-provider";

import "./globals.css";
import ToastProvider from "@/providers/toast-provider";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meetmax App",
  description: "Social media app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={roboto.className}>
      <body>
        <ToastProvider />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
