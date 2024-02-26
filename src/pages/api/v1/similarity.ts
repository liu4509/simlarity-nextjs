import { cosineSimilarity } from "@/helpers/cosine_similarity";
import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import { openai } from "@/lib/openai";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

// 筛选需要的字段 相当于白名单
const reqSchema = z.object({
  text1: z.string().max(1000),
  text2: z.string().max(1000),
});

// 拿取合法 apikey 才能调用相似度 方法
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as unknown;

  // 请求头部 的值
  const apikey = req.headers.authorization;
  if (!apikey) {
    // 没有认证
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // 从 body 中解析 白名单 字段
    const { text1, text2 } = reqSchema.parse(body);

    // 确保 apikey 有效
    const validApiKey = await db.apiKey.findFirst({
      where: {
        key: apikey,
        enabled: true,
      },
    });
    if (!validApiKey) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const start = new Date();

    // TODO: openai 的 api 调用失败
    // 使用 openAI 计算两个文本的相似度
    // const embedding = await Promise.all(
    //   [text1, text2].map(async (text) => {
    //     const res = await openai.createEmbedding({
    //       model: "text-embedding-ada-002",
    //       input: text,
    //     });
    //     return res.data.data[0].embedding;
    //   })
    // );
    // const similarity = cosineSimilarity(embedding[0], embedding[1]);
    // 持续时间
    const duration = new Date().getTime() - start.getTime();

    await db.apiRequest.create({
      data: {
        duration,
        method: req.method as string,
        path: req.url as string,
        status: 200,
        apiKeyId: validApiKey.id,
        usedApiKey: validApiKey.key,
      },
    });

    return res.status(200).json({
      success: true,
      text1,
      text2,
      similarity: "openai 的 api 调用失败",
    });
    // return res.status(200).json({ success: true, text1, text2 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default withMethods(["POST"], handler);
