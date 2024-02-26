"use client";

import { FC, useEffect, useState } from "react";
import Highlight, { defaultProps, type Language } from "prism-react-renderer";
import { useTheme } from "next-themes";
import lightTheme from "prism-react-renderer/themes/nightOwlLight";
import darkTheme from "prism-react-renderer/themes/nightOwl";

interface CodeProps {
  code: string;
  show: boolean;
  language: Language;
  animationDelay?: number;
  animation?: boolean;
}

const Code: FC<CodeProps> = ({
  code,
  show,
  language,
  animationDelay,
  animation,
}) => {
  const { theme: applicationTheme } = useTheme();
  // 如果有动画清空内容 配合动画效果
  const [text, steText] = useState(animation ? "" : code);
  useEffect(() => {
    if (show && animation) {
      let i = 0;
      setTimeout(() => {
        const IntervalId = setInterval(() => {
          steText(code.slice(0, i));
          i++;
          if (i > code.length) {
            clearInterval(IntervalId);
          }
        }, 15);

        return () => clearInterval(IntervalId);
      }, animationDelay || 150);
    }
  }, [code, show, animation, animationDelay]);

  // 确定 code 行数
  const lines = text.split(/\r\n|\r|\n/).length;

  const theme = applicationTheme === "light" ? lightTheme : darkTheme;

  return (
    <Highlight {...defaultProps} language={language} code={text} theme={theme}>
      {({ className, tokens, getLineProps, getTokenProps }) => {
        return (
          <pre
            className={
              className +
              "transition-all w-fit bg-transparent duration-100 py-0 no-scrollbar"
            }
            style={{ maxHeight: show ? lines * 24 : 0, opacity: show ? 1 : 0 }}
          >
            {tokens.map((line, i) => {
              const { key, ...rest } = getLineProps({ line, key: i });

              return (
                <div
                  key={`line-${i}`}
                  style={{ position: "relative" }}
                  {...rest}
                >
                  {line.map((token, index) => {
                    const { key, ...props } = getTokenProps({ token, i });
                    return <span key={index} {...props}></span>;
                  })}
                </div>
              );
            })}
          </pre>
        );
      }}
    </Highlight>
  );
};

export default Code;
