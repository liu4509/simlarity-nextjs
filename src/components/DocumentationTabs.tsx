"use client";
import { TabsContent } from "@radix-ui/react-tabs";
import Code from "@/components/Code";
import { FC } from "react";
import { Tabs, TabsTrigger, TabsList } from "@/ui/Tabs";
import { nodejs, python } from "@/helpers/documentation-code";
import SimpleBar from "simplebar-react";

const DocumentationTabs: FC = ({}) => {
  return (
    <Tabs defaultValue="nodejs" className="max-w-2xl w-full">
      <TabsList>
        <TabsTrigger value="nodejs">NodeJs</TabsTrigger>
        <TabsTrigger value="python">Python</TabsTrigger>
      </TabsList>
      <TabsContent value="nodejs">
        <SimpleBar>
          <Code language="javascript" show code={nodejs} animation />
        </SimpleBar>
      </TabsContent>
      <TabsContent value="python">
        <SimpleBar>
          <Code language="python" show code={python} animation />
        </SimpleBar>
      </TabsContent>
    </Tabs>
  );
};

export default DocumentationTabs;
