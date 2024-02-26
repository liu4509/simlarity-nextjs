"use client";
import { FC, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import Button from "@/ui/Button";
import { Loader2 } from "lucide-react";
import { toast } from "@/ui/toast";
import { createApiKey } from "@/helpers/create-api-key";
import { useRouter } from "next/navigation";
import { revokeApiKey } from "@/helpers/revoke-api-key";

interface ApiKeyOptionsProps {
  apikeyId: string;
  apiKeyKey: string;
}

const ApiKeyOptions: FC<ApiKeyOptionsProps> = ({ apikeyId, apiKeyKey }) => {
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [isRevoking, setIsRevoking] = useState<boolean>(false);
  const router = useRouter();
  // 获取新 apikey
  const createNewApiKey = async () => {
    setIsCreatingNew(true);

    try {
      await revokeApiKey({ keyId: apikeyId });
      await createApiKey();
      // 刷新网页
      router.refresh();
    } catch (error) {
      toast({
        title: "Error creating API Key",
        message: "Please try again later",
        type: "error",
      });
    } finally {
      setIsCreatingNew(false);
    }
  };

  const revokeCurrentApiKey = async () => {
    setIsRevoking(true);

    try {
      await revokeApiKey({ keyId: apikeyId });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error revoke API Key",
        message: "Please try again later",
        type: "error",
      });
    } finally {
      setIsRevoking(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isCreatingNew || isRevoking} asChild>
        <Button variant="ghost" className="flex gap-2 items-center">
          <p>
            {isCreatingNew
              ? "Creating new key"
              : isRevoking
                ? "Revoking key"
                : "Option"}
          </p>
          {isCreatingNew || isRevoking ? (
            <Loader2 className="animate-spin h-4 w-4" />
          ) : null}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            // 复制到剪切板
            navigator.clipboard.writeText(apiKeyKey);

            toast({
              title: "Copied",
              message: "API key copied to chipboard",
              type: "success",
            });
          }}
        >
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem onClick={createNewApiKey}>
          Create new key
        </DropdownMenuItem>
        <DropdownMenuItem onClick={revokeCurrentApiKey}>
          Revoke key
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApiKeyOptions;
