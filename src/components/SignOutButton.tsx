"use client";

import { signOut } from "next-auth/react";
import { FC, useState } from "react";
import Button from "@/components/ui/Button";
import { toast } from "@/components/ui/toast";

interface SignOutButtonProps {}

const SignOutButton: FC<SignOutButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const SignOutWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signOut();
    } catch (error) {
      // 弹窗提示错误
      toast({
        title: "Error signing out",
        message: "Please try again later",
        type: "error",
      });
    }
  };
  return (
    <Button onClick={SignOutWithGoogle} isLoading={isLoading}>
      Sign out
    </Button>
  );
};

export default SignOutButton;
