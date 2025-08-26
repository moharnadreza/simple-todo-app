import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "@/components";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simple, ToDo!",
  description:
    "A clean and efficient todo app, built with Next.js, TailwindCSS, and zero clutter.",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
