This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

通过 yarn 启动 app

```bash
yarn dev
```

## idea
  ui 重用组件 - radix 无头组件

  1. 自定义 UI 个性话的 自封装的 
  2. Paragraph 段落
  3. LargeHeading 标题
  4. tsconfig 中对特殊路径配置路径别名
  4. layout 重写布局
  5. Providers 将布局提取单独写
  6. typescriptreact.json 代码片段 fc 
  7. Navbar 导航栏的布局
  8. SignInButton SignOutButton 登录登出按钮
  9. ThemeToggle 明暗按钮 
  10. 消息提醒弹窗
  11. page 主页的布局
  12. DocumentationTabs 代码片段切换 Tabs
  13. Tabs基础组件 在radix-ui tabs 基础上自定义样式
  14. Code 代码显示组件 放置 TabsContent 中切换
  15. 前端页面完成
  16. [...nextauth] 身份验证组件
  17. lib/db 数据库配置文件
  18. lib/auth nextauth 配置文件
  19. env 环境变量
  20. type/next-env.d.ts 对session JWT 添加 id 属性 ts支持、
  21. schema.prisma prisma 数据库 添加数据模型
  22. https://auth.planetscale.com/ 云数据库
  23. 本地是mysql5 选择服务器搭建mysql8.0 打开安全组 数据库设置远程连接 similarity 
  24. orm 操作脚本 dbpush gen 初始化数据库
  25. google Oauth 没办法跳转正确页面 选用 Github 的
  26. dashboard 仪表盘页面
  27. ApiDashboard key 展示页面
  28. RequestApiKey 请求 key 页面
  29. CopyButton 复制组件
  30. Input API key 输入组件
  31. /api-key/create.ts 创建 apikey
  32. ApiDashboard apikey 仪表盘 展示历史和当前 apikey
  33. Table 表格组件 存放历史 apikey
  34. ApiKeyOptions apikey 选项下拉组件
  35. helpers/revoke-api-key 发起请求 作废 apikey
  36. api-key/revoke 处理请求 写入数据库 作废 apikey
  37. v1/similarity 处理文本相似度 有查询请求头部 apikey 是否合法 拿取合法 apikey 才能调用相似度 方法
  38. lib/openai openai 配置文件
  39. 获取 openai apikey 添加进 env
  40. middleware 全局中间件 处理速率限制 权限路由
  41. login/page 登录页
  42. UserAuthForm 登录点击按钮
