# YardCalc 产品规格（Spec v1.0）

> 项目：SOE 批量工具站计划 · 站 1
> 日期：2026-10-25 · 作者：ZCode（单 agent 开发，锤大哥授权）
> 状态：已批准开工（锤大哥 2026-10-25 完全授权：建项目 → spec/ADR → 子 agent 派发 → 开发/测试/部署）

## 1. 一句话定位

面向美国 DIY 房主与庭院爱好者的**家居/园艺材料计算器站**：输入项目尺寸 → 得到材料用量（立方码/袋数/加仑/块数）+ 2026 年真实成本估算，靠 Google 自然搜索流量变现（展示广告 + 联盟）。

## 2. 为什么是这个方向（调研依据）

- 显示广告 RPM：home & garden 利基 ~$39/千次，为财务类（$8-15）3 倍以上（NicheSafari/Fat Stacks 实测数据）
- SERP 实测：DIY 材料计算器词前排全是 CalcSummit / SimplifyCalc / CalcHub 等独立小站，Home Depot / Lowe's 缺位——「同体量小站能排」已被证实
- 工具型查询（输入尺寸→算结果）不被 AI Overviews 吸走，用户必须点击进站
- 差异位：不做通用计算器大杂烩（SimplifyCalc 已有 836 个），打「**材料垂直 × 真实成本数据**」纵深
- 目标用户：美国郊区房主（diy 装修、庭院美化），英语内容

## 3. 范围（v1 = 本期）

### 3.1 计算器工具页（17 个，分 6 类）

| 类目 | 计算器 |
|---|---|
| Concrete（混凝土） | slab（板）、footing/column（基础/柱） |
| Landscaping（园艺） | mulch（覆盖物）、gravel（砾石）、topsoil（表土）、sod（草皮）、grass seed（草籽）、retaining wall（挡土墙块） |
| Painting（涂装） | interior paint（内墙漆） |
| Flooring（地面） | tile（瓷砖）、paver（铺路石） |
| Outdoor（户外结构） | deck boards（露台板）、fence（栅栏） |
| Interior/Other（室内/其他） | drywall（石膏板）、blown-in insulation（吹填保温）、roof shingles（屋面瓦）、board feet（木材板英尺） |

每页统一结构：输入区（尺寸/材料/单价可选）→ 即时结果卡（用量 + 袋/桶/块数 + 成本区间）→「How it works」公式说明 → 3-5 条 FAQ（带 FAQPage JSON-LD）→ 相关工具内链 → WebApplication JSON-LD。

### 3.2 内容/信任页

- 首页：品牌定位 + 全部工具分类导航（内链枢纽）
- 6 个类目 hub 页（每类一个，聚合该类工具 + 选材指南摘要）
- About / Privacy Policy / Contact（AdSense 审批硬要求）
- sitemap.xml（构建自动生成）+ robots.txt

### 3.3 明确不做（v1）

- 用户注册/登录（无 NextAuth/Clerk）
- 服务端 API / 数据库 / 缓存（纯静态导出）
- 州级成本页（v1.1，需 50 州价格数据编译）
- 站 2（工资计算）/站 3（创作者计算器）——验证站 1 流程后复制模板

## 4. 技术要求

1. **纯静态导出**（Next.js `output: 'export'`），所有计算客户端完成，页面 LCP 目标 < 1.5s（静态 CDN）
2. 每页独立 `<title>`（含关键词，<60 字符）/ meta description（<160）/ canonical / OG 标签
3. JSON-LD：WebApplication（工具页）+ FAQPage（FAQ 区）+ BreadcrumbList（类目页以下）
4. 移动端优先（美国 DIY 流量 ~70% 移动端），无 Cookie 弹窗（不采集个人数据；统计后续用 Cloudflare Web Analytics）
5. 无外部运行时依赖（无 CDN JS、无字体下载阻塞——系统字体栈）
6. 广告位：预留 `<AdSlot>` 占位组件（props 控制显隐），本期不接 AdSense 代码
7. 数学正确性：每个计算器公式有单元测试；数值取整规则与行业惯例一致（袋数向上取整等）

## 5. 数据要求（子 agent 编译，须带来源）

- 材料密度/覆盖率：如 mulch 建议深度 2-4"、混凝土 80lb 袋 ≈ 0.60 ft³、油漆 1 加仑覆盖 350-400 ft²
- 袋装规格与 2026 年美国全国均价区间（ Lowe's/Home Depot/供应商公开报价）
- 所有数据写入 `packages/shared/src/data/materials.ts`，注释标来源 URL 与采集日期

## 6. 质量门槛（Definition of Done）

1. `pnpm test` 全绿（17 个计算器公式单测 + 工具函数）
2. `pnpm build` 成功产出 `out/` 静态文件
3. 冒烟测试：构建后逐页 curl 校验 200 / title / h1 / JSON-LD 存在
4. 部署到海外免费托管并可公网访问（子域名或 IP 均可，锤大哥拍板不需要域名）
5. git 全量提交

## 7. 成功指标（上线后）

- 30 天：GSC 索引率 > 60%，首批 impressions
- 90 天：日均 impressions 趋势上行 → 申请 AdSense + 启动站 2
- 若 90 天 impressions 趋势平坦 → 复盘关键词定位，必要时调整内容策略

## 8. 变更记录

- v1.0（2026-10-25）：首版，锤大哥批准技术栈调整版（Next.js 静态导出，砍 DB/认证/Redis，Vercel→Cloudflare Pages，见 ADR-002）
