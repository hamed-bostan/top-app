import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
import { estedad } from "../../public/fonts/estedad";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={estedad.variable}>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
