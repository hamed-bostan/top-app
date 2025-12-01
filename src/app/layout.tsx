import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
import { estedad } from "../../public/fonts/estedad";
import Providers from "@/lib/store/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={estedad.variable}>
      <body>
        <QueryProvider>
          <Providers>{children}</Providers>
        </QueryProvider>
      </body>
    </html>
  );
}
