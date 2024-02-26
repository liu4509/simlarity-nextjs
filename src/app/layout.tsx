import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

// 字体
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("bg-white text-slate-900 antialiased", inter.className)}
    >
      <body className="min-h-screen bg-slate-50 dark:bg-slate-900 antialiased">
        {/* 定义统一布局 */}
        <Providers>
          {children}
          <Toaster position="bottom-right" />
          {/* @ts-expect-error Server Component */}
          <Navbar />
        </Providers>

        {/* 页尾 */}
        <div className="h-40 md:hidden" />
      </body>
    </html>
  );
}
