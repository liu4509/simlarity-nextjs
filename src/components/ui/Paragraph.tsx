import { HTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// 自定义段落 UI Paragraph

// 控制 css 变体方法的类库 原子化思想去编写 css 封装组件
const paragraphVariants = cva(
  "max-w-prose text-slate-700 dark:text-slate-300 md-2 text-center",
  {
    variants: {
      size: {
        default: "text-base sm:text-lg",
        sm: "text-sm sm:text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

//  ui 组件 传入的 props 应该是 HTML 的元素 加上自定义的属性
interface ParagraphProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {}
// forwardRef 向父组件传递 Dom 引用
const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        {...props}
        className={cn(paragraphVariants({ size, className }))}
      >
        {children}
      </p>
    );
  }
);

// 调试组件的名称
Paragraph.displayName = "Paragraph";

export default Paragraph;
