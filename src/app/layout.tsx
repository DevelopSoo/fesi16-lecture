// app/layout.tsx

import "./globals.css";
import { MSWProvider } from "@/providers/MSWProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
