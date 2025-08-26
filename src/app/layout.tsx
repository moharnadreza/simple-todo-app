import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SimpleToDo",
  description:
    "A clean and efficient todo app, built with Next.js, TailwindCSS, and zero clutter.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body className="antialiased">{children}</body>
  </html>
);

export default RootLayout;
