# Upwork 获客包(AgentForge 冷启动)

> 配合 https://niceman1996.github.io/agentforge/ 使用。英文部分直接复制粘贴;`[方括号]` 是投标时替换的变量。
> 开号、身份验证、投标按钮这些动作必须本人完成;其余(资料、话术、策略)都在这里。

## 0. 开号清单(本人操作,约 30 分钟 + 等审核)

1. upwork.com → Sign up,用 **niceboyniu@gmail.com** 注册,选 Freelancer
2. 姓名用身份证/护照拼音(后续视频验证 ID 必须一致)
3. Get Started 引导里每一步都从本文档复制(标题 §1、介绍 §2、技能 §3、时薪 §4)
4. 收款:Settings → Get Paid → 绑 **Payoneer**(没有就顺手注册,可提现国内银行卡)
5. 提交后等审核(通常 24h 内)。通过后买 $15–20 的 Connects 备用(投标一次耗 10–16 个)
6. 个人资料 100% 完整度再开始投标(完整度影响搜索排名)

## 1. Profile Title(三选一,推荐 A)

- **A.** `Self-Hosted AI Agents & n8n Automation | Remote Setup | Fixed Price`
- B. `I build AI agents & automations that do real work | GPTs, n8n, Make`
- C. `Custom GPT & n8n Automation Developer — fixed price, no hourly surprises`

## 2. Profile Overview(直接粘贴;前两行决定客户点不点你)

```
I build AI assistants and n8n automations, with remote setup on your own
computer or server as the default. Your task, hardware and model requirements
are reviewed before I quote. Cloud Custom GPT or Make setups are optional.

How I work: send me your goal, current tools and hosting details. Once the
brief is complete, I aim to send a one-page scope and fixed quote within two
business days. Project builds include 14 days of bug fixes within the agreed
scope, plus documentation and a recorded handover.

I run my own agent production line, so I ship faster than the hourly crowd.
Proof you can inspect right now:
• YardCalc — a live 17-tool calculator network with 39 automated tests and
  verified pricing data: https://niceman1996.github.io/yardcalc/
• AgentForge — my studio site, specified, built, tested and deployed by the
  same production line in a single day: https://niceman1996.github.io/agentforge/

What I build most:
• Self-hosted AI assistant: one use case and one deployment host, from $1,500
• One self-hosted n8n workflow connecting up to two tools, from $999
• Optional cloud Custom GPT setup in your ChatGPT account, from $499
• Optional care plan, up to two maintenance hours/month, from $199/mo

Hardware, hosting, model APIs, licenses and subscriptions are paid through
your accounts. Local hosting may still call cloud APIs; fully offline models
require a hardware and task review before I commit to a solution.

Ask me for a fixed-price spec on your job — it's free to keep even if you
don't hire me.
```

## 3. Skills 标签(选满 15 个,前 5 个权重最高)

`AI Agent Development` · `Custom GPT` · `n8n` · `Make.com` · `Workflow Automation` ·
`OpenAI API` · `Chatbot Development` · `Zapier` · `API Integration` ·
`Retrieval Augmented Generation (RAG)` · `Python` · `TypeScript` ·
`Automation` · `Data Extraction` · `LLM Prompt Engineering`

## 4. 时薪与定价策略

| 阶段 | Hourly | 逻辑 |
|---|---|---|
| 前 3 单(攒评价) | **$30–35/hr**,小单也可接 $300–500 fixed | 评价 > 利润,快速进市场 |
| 3 个五星后 | 提到 $50–60/hr | 有 JSS 背书,中位区间 |
| 10 单+ / 有代表作 | $80–100/hr,大单只走 fixed | expert 区间($100–150 是天花板) |

官网起价按交付范围区分，不作为市场均价：本地 AI 助手 $1,500 起（一个用途、一个部署目标）；n8n 单工作流 $999 起（一个触发器、最多两个工具）；云端 Custom GPT $499 起；维护 $199/月起（最多两小时，不结转）。前期优先远程部署到客户自有电脑或服务器。硬件、模型 API、托管、软件许可和订阅另付；完全离线需求先核硬件。超范围先报价，不能将完整定制 AI 系统按 $499 GPT 套餐出售。

## 5. Portfolio 三件(Project Catalog 同样内容)

1. **YardCalc — 17-tool DIY calculator network** · Link: https://niceman1996.github.io/yardcalc/
   描述:`Live production site: 17 material calculators with verified 2026 US pricing, 39 automated tests, automated deploy pipeline. Built end-to-end (research → data verification → implementation → tests → deployment) by my agent production line.`
2. **AgentForge — AI agent studio site** · Link: https://niceman1996.github.io/agentforge/
   描述:`My studio's own site: specified, written, built, tested and deployed in one working day by the same production line. Ships content-contract tests, sitemap, structured data.`
3. **Agent production line (internal)** · 无公开链接
   描述:`Spec-driven internal factory: every deliverable starts as a written spec, passes automated gates (unit tests, rendered-page smoke tests, live-deployment verification), then human review. This is why I quote fixed prices and deliver in days.`

## 6. 十个投标模板

> 通用规则:**第一句必须证明你读过帖**(用客户的原词复述他的目标);总长 ≤150 词;结尾带两个具体问题(问题=证明你懂行+制造回复理由);**欧洲客户在你的下午投**(他们的上午,回复率最高)。

### 通用骨架

```
Hi [NAME],

[复述他目标的一句话,用他的原词] — that's exactly the kind of build I do.

My offer: once your brief and hosting details are complete, I aim to send
a one-page scope and fixed quote within two business days. Remote setup on
your computer or server is my default. Keep the initial scope and quote free
even if you don't hire me.

Proof you can check right now: [一条最相关的作品链接 + 一句话].

Two questions so the spec is accurate:
1. [关于他现有工具/数据的问题]
2. [关于范围边界的问题]

Happy to start today.

[签名:Long Zhang]
```

### T1 · Custom GPT / 内部助手

Hook: `A GPT that answers from your own docs (not generic internet answers) — grounding it in [HIS DOCS/KB] so staff stop asking each other the same questions is exactly my core build.`
Q1: `Where does the knowledge live today — Notion, PDFs, a help desk, or scattered inboxes?`
Q2: `Roughly how many documents/pages, and how often do they change?`

### T2 · n8n 工作流自动化

Hook: `Wiring [TOOL A] to [TOOL B] so [THE OUTCOME] happens without anyone touching it — that's the bulk of what I ship.`
Q1: `Which tools are already non-negotiable in this workflow (CRM, email, sheets)?`
Q2: `What happens today when the step fails — who notices, and how fast?`

### T3 · Make.com 自动化

Hook: `Same story on Make: [SCENARIO] running on a schedule instead of manual copy-paste.`
Q1: `Do you already have a Make subscription, or should the spec price one in?`
Q2: `Which of these steps need a human approval before firing?`

### T4 · 客服 Chatbot

Hook: `A support bot that deflects the repetitive [X]% of tickets but hands off cleanly to a human — the handoff is where most builds fail, and where I spend the most test time.`
Q1: `Where do support conversations live today (Intercom, Zendesk, Crisp, email)?`
Q2: `Do you have (or can you export) your top 50 real tickets for testing the bot against?`

### T5 · RAG 知识库 / 内部 copilot

Hook: `A private copilot over [HIS CORPUS] with source citations, so answers are checkable instead of vibes.`
Q1: `Should the assistant use a cloud model API, or do you require fully offline inference? What computer or server hardware is available?`
Q2: `Who are the first 5 users — support, sales, engineering?`

### T6 · 线索挖掘 / enrichment

Hook: `A pipeline that finds [ICP], enriches with [DATA], and drops ranked rows into [CRM/SHEET] — with AI only where it beats a regex.`
Q1: `What's your definition of a qualified lead — which 2–3 fields decide it?`
Q2: `Target volume per week, and which data sources are you already paying for?`

### T7 · AI SDR / 外联 agent

Hook: `Personalized outreach that references something real about each prospect — not `{{first_name}}` with an LLM accent.`
Q1: `Which sending tool (Instantly, Smartlead, native), and what daily volume cap?`
Q2: `Can you share 2–3 past emails that actually booked meetings? (That's the voice I match.)`

### T8 · 内容流水线

Hook: `Turning [PODCAST/WEBINAR/TRANSCRIPTS] into [BLOG + NEWSLETTER + SOCIAL] on autopilot, with your voice locked in by example passages.`
Q1: `Who has final approval before anything publishes — can the pipeline post drafts automatically?`
Q2: `Link me 2–3 pieces that sound exactly like you.`
Q1: (备选)`Where do drafts land today — CMS, Docs, Notion?`

### T9 · CRM 清洗 / 数据迁移自动化

Hook: `Deduplicating and normalizing [CRM] without freezing your team's workflow — done as a repeatable pipeline, not a one-off manual scrub.`
Q1: `Which CRM, and roughly how many records?`
Q2: `What's the match key you trust — email, domain, or something messier?`

### T10 · OpenAI/LLM API 集成进现有应用

Hook: `Adding an AI step inside [HIS APP] where it earns its keep — feature-scoped, cost-capped, with fallbacks when the API misbehaves.`
Q1: `What's the stack (language/framework), and where would the AI step sit in the current flow?`
Q2: `What's your monthly API budget ceiling — I design prompts and models around it.`

## 7. 投标策略(中文,照做)

- **节奏**:每天投 3–5 单,只投 **24h 内发布、proposal 数 <15** 的(竞标窗口最优);坚持 2–4 周出首单是正常预期
- **前 3 单的目标是五星评价**,不是利润——$300–500 的小单快速闭合并要评价
- **红旗单不投**:预算 <$50 还要 "full AI assistant"、要 free sample 先做、"simple job anyone can do"、客户未验证付款
- **时区**:你的下午 2–6 点 = 欧洲上午,投标+回复双高峰;美国客户的单晚上投,他上班时你排前面
- **中标后**按官网 Process 走：先核需求和客户部署硬件，资料齐备后以两个工作日为目标给出一页范围和固定报价；约定远程安装、验收、临时权限撤销与运行费用。每单结束，经客户同意再加案例到 AgentForge /work。
- **每周复盘**:记录每个模板的回复率,回复率 <10% 的开头改掉重测

## 8. 与站群的配合

每交付一单 → 在 agentforge 加一个案例页(程序化,半小时)→ 案例页长尾词("custom GPT for real estate agents" 等)慢慢吃 SEO → 反过来给 Upwork 资料供弹药。**Upwork 是现金流,站群是复利,两条腿别断。**
