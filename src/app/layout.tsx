import type { Metadata } from "next";
import { spaceGrotesk, inter, jetbrainsMono } from "@/lib/fonts";
import CursorTrail from "@/components/ui/CursorTrail";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quynh Le | Senior Fullstack Developer",
  description:
    "12+ years building scalable web & mobile applications. Expertise in React, .NET, Node.js, and cloud infrastructure.",
  openGraph: {
    title: "Quynh Le | Senior Fullstack Developer",
    description:
      "12+ years building scalable web & mobile applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body bg-bg-light text-text-dark antialiased">
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}
