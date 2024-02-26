import { type ZodIssue } from "zod";
import { ApiKey } from "@prisma/client";

// 创建 or 撤销 类型

export interface CreateApiData {
  error: string | ZodIssue[] | null;
  createdApiKey: ApiKey | null;
}

export interface RevokeApiData {
  error: string | ZodIssue[] | null;
  success: boolean;
}
