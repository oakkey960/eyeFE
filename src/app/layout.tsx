import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eye Donation Platform",
  description: "ระบบติดตามข้อมูลการบริจาคดวงตา",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className="antialiased h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
