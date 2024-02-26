"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    // 主体切换
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {/* 会话 */}
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
};

export default Providers;
