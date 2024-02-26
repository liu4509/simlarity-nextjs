import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { formatDistance } from "date-fns";
import LargeHeading from "@/ui/LargeHeading";
import Paragraph from "@/ui/Paragraph";
import { Input } from "@/ui/Input";
import Table from "@/ui/Table";
import ApiKeyOptions from "@/components/ApiKeyOptions";

const ApiDashboard = async () => {
  const user = await getServerSession(authOptions);
  if (!user) notFound();

  const apiKey = await db.apiKey.findMany({
    where: { userId: user.user.id },
  });
  // 查询有效的 apikey
  const activeApiKey = apiKey.find((apikeyMap) => apikeyMap.enabled);
  if (!activeApiKey) notFound();
  // 获取历史 apikey
  const userRequests = await db.apiRequest.findMany({
    where: {
      apiKeyId: {
        in: apiKey.map((key) => key.id),
      },
    },
  });

  // 转换时间格式
  const serializableRequests = userRequests.map((req) => ({
    ...req,
    timestamp: formatDistance(new Date(req.timestamp), new Date()),
  }));

  return (
    <div className="container flex flex-col gap-6">
      <LargeHeading>Welcome back, {user.user.name}</LargeHeading>
      <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
        <Paragraph>Your API key:</Paragraph>
        <Input className="w-fit truncate" readOnly value={activeApiKey.key} />
        {/* 添加创建新的/取消按钮 */}
        <ApiKeyOptions
          apikeyId={activeApiKey.id}
          apiKeyKey={activeApiKey.key}
        />
      </div>
      <Paragraph className="text-center md:text-left mt-4 md-4">
        Your API history:
      </Paragraph>
      {/* Table  */}
      <Table userRequests={serializableRequests} />
    </div>
  );
};

export default ApiDashboard;
