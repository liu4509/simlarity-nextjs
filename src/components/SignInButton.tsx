"use client";

import { signIn } from "next-auth/react";
import { FC, useState } from "react";
import Button from "@/components/ui/Button";
import { toast } from "@/components/ui/toast";

interface SignInButtonProps {}

const SignlnButton: FC<SignInButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const signInWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("github");
    } catch (error) {
      // 弹窗提示错误
      toast({
        title: "Error signing in",
        message: "Please try again later",
        type: "error",
      });
    }
  };
  return (
    <Button onClick={signInWithGoogle} isLoading={isLoading}>
      Sign in
    </Button>
  );
};

export default SignlnButton;
