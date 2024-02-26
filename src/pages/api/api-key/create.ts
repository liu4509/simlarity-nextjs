import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateApiData } from "@/types/api";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { nanoid } from "nanoid";
import { z } from "zod";
import { withMethods } from "@/lib/api-middlewares/with-methods";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CreateApiData>
) => {
  try {
    // session 中读取 user
    const user = await getServerSession(req, res, authOptions).then(
      (ress) => ress?.user
    );
    if (!user) {
      return res.status(401).json({
        error: "Unauthorized to perform this action.",
        createdApiKey: null,
      });
    }

    // 数据库 通过 user.id 查询 apikey
    const existingApiKey = await db.apiKey.findFirst({
      where: { userId: user.id, enabled: true },
    });
    // 有 apikey 返回错误信息
    if (existingApiKey) {
      return res.status(400).json({
        error: "You already have a valid API key",
        createdApiKey: null,
      });
    }

    // 创建 apikey
    const createdApiKeyApi = await db.apiKey.create({
      data: {
        userId: user.id,
        key: nanoid(),
      },
    });

    return res
      .status(200)
      .json({ error: null, createdApiKey: createdApiKeyApi });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues, createdApiKey: null });
    }

    return res.status(500).json({
      error: "Internal Server Error",
      createdApiKey: null,
    });
  }
};

// 通过 给定的 方法 使用 创建apikey处理
export default withMethods(["GET"], handler);
