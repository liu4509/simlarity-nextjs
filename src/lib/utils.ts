import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// 接收一堆类型的输入
export function cn(...inputs: ClassValue[]) {
  // twMerge() 可在 JS 中有效地合并 Tailwind CSS 类，而不会发生样式冲突
  // 更好的可读性和可维护性
  return twMerge(clsx(inputs));
}
