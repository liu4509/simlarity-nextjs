import { getServerSession } from "next-auth";
import Link from "next/link";
import SignlnButton from "@/components/SignInButton";
import { buttonVariants } from "@/components/ui/Button";
import SignOutButton from "@/components/SignOutButton";
import ThemeToggle from "@/components/ThemeToggle";

// 需要用到服务端的架构 使用异步组件
const Navbar = async () => {
  const session = await getServerSession();

  return (
    <div className="fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex justify-between items-center">
        {/* 主页链接 */}
        <Link href="/" className={buttonVariants({ variant: "link" })}>
          Text Similarity 1.0
        </Link>

        {/* 明暗切换  小屏显示 min-width: 768px*/}
        <div className="md:hidden">
          <ThemeToggle />
        </div>

        {/* 文档按钮 大屏显示 */}
        <div className="hidden md:flex gap-4">
          <ThemeToggle />
          <Link
            href="/documentation"
            className={buttonVariants({ variant: "ghost" })}
          >
            Documentation
          </Link>

          {/* 判断登录状态 是否显示登录按钮 or 仪表盘和退出登录按钮*/}
          {session ? (
            <>
              <Link
                href="/dashboard"
                className={buttonVariants({ variant: "ghost" })}
              >
                Dashboard
              </Link>
              <SignOutButton />
            </>
          ) : (
            <SignlnButton />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
