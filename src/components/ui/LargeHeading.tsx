import { HTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// 自定义段落 UI LargeHeading

// 控制 css 变体方法的类库 原子化思想去编写 css 封装组件
const LargeHeadingVariants = cva(
  "text-black dark:text-white text-center lg:text-left font-extrabold leading-tight tracking-tighter",
  {
    variants: {
      size: {
        default: "text-4xl md:text-5xl lg:text-6xl",
        lg: "text-5xl md:text-6xl lg:text-7xl",
        sm: "text-2xl md:text-3xl lg:text-4xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

//  ui 组件 传入的 props 应该是 HTML 的元素 加上自定义的属性
interface LargeHeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof LargeHeadingVariants> {}
// forwardRef 向父组件传递 Dom 引用
const LargeHeading = forwardRef<HTMLHeadingElement, LargeHeadingProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        {...props}
        className={cn(LargeHeadingVariants({ size, className }))}
      >
        {children}
      </h1>
    );
  }
);

// 调试组件的名称
LargeHeading.displayName = "LargeHeading";

export default LargeHeading;
