# ADR-0002：技术栈 —— Next.js 静态导出，砍 DB/认证/缓存，Vercel 换 Cloudflare Pages

- 状态：已接受（2026-10-25，锤大哥确认「前端留、后端砍、Vercel 换」）
- 提案人：锤大哥（Next.js + Tailwind + shadcn + Postgres/Prisma + NextAuth/Clerk + Redis + Vercel）
- 修订：ZCode（砍掉服务端组件，部署商更换）

## 决策

```
Next.js 15 (App Router, TypeScript, output:'export' 静态导出)
+ Tailwind CSS v4 + 自建轻量组件（shadcn 风格，按需手写，不引 shadcn CLI）
数据 = 仓库内 TS 模块（材料密度/覆盖率/价格，构建时编入页面）
UI 组件 = packages/shared 共享包（跨站复用）
部署 = 海外免费静态托管（首选 Cloudflare Pages）
```

## 理由

1. **所有计算器是客户端纯数学**，无服务端计算/数据/用户，API Routes + Prisma + Redis + 认证是零收益死重
2. **Vercel Hobby 免费版条款仅限非商用**，挂 AdSense 属商用违规；Cloudflare Pages 免费版允许商用且静态带宽无限
3. 静态导出 = 最优 Core Web Vitals（SEO 硬指标），CDN 边缘直出
4. shadcn/ui 换为等价手写组件：工具页以表单为主，避免整包组件库的 JS 体积拖累移动端速度分

## 何时回补完整栈

若站 3（创作者计算器）将来长成需登录/保存历史的 SaaS：届时上 Clerk + Neon 免费 Postgres，且站点已有收入可覆盖 Vercel Pro（$20/月）。

## 后果

- 优点：零运行时成本、构建即部署、一套 shared 包生三站
- 代价：无动态能力（表单提交、评论等后续需求需重新评估方案）
