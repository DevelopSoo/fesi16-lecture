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
      <body>
        <MSWProvider>
          <header>로고 + 메뉴</header>
          {children}
        </MSWProvider>
      </body>
    </html>
  );
}
