import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

function getRedisKey() {
  // 必需是 string 类型 不能空 用函数判空
  const redisId = process.env.REDIS_URL;
  const redisSecret = process.env.REDIS_SECRET;

  if (!redisId || redisId.length === 0) {
    throw new Error("No redisId for redis provider set");
  }

  if (!redisSecret || redisSecret.length === 0) {
    throw new Error("No redisSecret for redis provider set");
  }
  return { redisId, redisSecret };
}
const redis = new Redis({
  url: getRedisKey().redisId,
  token: getRedisKey().redisSecret,
});

// 速率限制
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 h"),
});

export default withAuth(
  async function middleware(req) {
    // 相对路径
    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith("/api")) {
      const ip = req.ip ?? "127.0.0.1";
      try {
        // 速率限制
        const { success } = await ratelimit.limit(ip);
        if (!success) return NextResponse.json({ error: "Too many requests" });

        return NextResponse.next();
      } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" });
      }
    }

    // auth 路径 通过 jwt 判断 放行路径 授权页面
    const token = await getToken({ req });
    const isAuth = !!token;

    const isAuthPage = pathname.startsWith("/login");

    const sensitiveRoutes = ["/dashboard"];

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return null;
    }

    if (
      !isAuth &&
      sensitiveRoutes.some((route) => pathname.startsWith(route))
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*", "/api/:path*"],
};
