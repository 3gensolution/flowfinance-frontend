import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Header } from "@/app/header";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: "FlowFinance - Peer-to-Peer DeFi Lending",
  description: "Maximize your capital efficiency. Earn passive yields or borrow against your crypto assets instantly with zero paperwork.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <Header />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
