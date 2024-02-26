import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export function withMethods(methods: string[], handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    // req.method 是当前的处理方法 POST 判断传入参数里是否有 当前的处理方法
    if (!req.method || !methods.includes(req.method)) {
      return res.status(405).end();
    }
    return handler(req, res);
  };
}
