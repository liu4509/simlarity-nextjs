import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { db } from "@/lib/db";

function getGoogleCredentials() {
  // 必需是 string 类型 不能空 用函数判空
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || clientId.length === 0) {
    throw new Error("No clientID for google provider set");
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("No clientID for google provider set");
  }
  return { clientId, clientSecret };
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    // 会话模式
    strategy: "jwt",
  },
  // 管理页面
  pages: {
    signIn: "/login",
  },
  // 供应商
  providers: [
    GithubProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
  ],
  callbacks: {
    session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },

    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
};
