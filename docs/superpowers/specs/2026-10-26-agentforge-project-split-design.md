# AgentForge 独立项目拆分设计

## 意图

把 AgentForge 从 `seo-tool-sites` 本地源码仓库拆为单独的 Git 项目，避免它与 YardCalc 共用默认站点配置、构建/发布脚本和工作区状态。YardCalc 留在 `seo-tool-sites`。

## 目标

- AgentForge 有独立源码根目录、Git 工作树、依赖清单、测试、构建和部署入口；GitHub `niceman1996/agentforge` 的源码分支也只保留 AgentForge 项目。
- 保持现有公开地址 `https://niceman1996.github.io/agentforge/` 和 `agentforge` GitHub Pages 仓库；迁移期间不改 URL。
- AgentForge 不再依赖 `seo-tool-sites` 的 `pnpm-workspace.yaml`、`packages/shared` 或根级 `SOE_SITE` 选择器。
- YardCalc 的源码、域名和部署配置留在原项目，AgentForge 拆分不改变其线上状态。
- AgentForge 的 `docs/upwork-kit.md` 等专属获客资料随项目迁移；混合日志和 next-steps 文档按职责留在 YardCalc/原仓库或拆分出 AgentForge 专属说明。
- 保留尚未跟踪的 `scripts/pages-info.mjs`，不将其误迁入 AgentForge。

## 非目标

- 不更改 AgentForge 页面文案、设计、SEO 元数据或 `github.io/agentforge/` URL。
- 不改 YardCalc 的自定义域名、DNS、GitHub Pages 配置。
- 不强制 HTTPS、不操作 GSC 或 Upwork 账号。
- 不删除或重写现有 GitHub `agentforge` 仓库历史，也不强推覆盖 `gh-pages`。

## 当前约束与发现

- 当前本地 Git 根是 `seo-tool-sites`；它同时含 `sites/agentforge`、`sites/yardcalc`、共享包和多站发布脚本。
- `scripts/build-pages.mjs` 与 `scripts/deploy-gh-pages.mjs` 默认 `SOE_SITE=yardcalc`，通过环境变量切换 AgentForge。
- AgentForge 目前通过 `@soe/shared` workspace 依赖共享 UI；脱离 workspace 前要将实际使用的共享代码（导航/页脚/JSON-LD 及其类型）移到 AgentForge 本地，不能留下 `../../packages/shared` 路径。
- 本机工具链约束要求使用项目内 `.bin/node.exe` 直调脚本，避免 pnpm/node shim 回落到受拦截的解释器。
- GitHub 上 `niceman1996/agentforge` 仓库存在 `master` 与 `gh-pages` 分支；本地 `seo-tool-sites` 没有配置 remote。拆分不能假设本地 master 与远端 master 同步。
- 当前工作树有未跟踪的 `scripts/pages-info.mjs`，必须原样保留。

## 做法比较

1. **独立 AgentForge Git 项目（推荐）**：在 `G:\ai\projects\agentforge` 建立单独工作树，将站点、所需 UI 组件、获客资料和独立工具链放入其中；保留 `agentforge` 远端及其 `gh-pages` 发布分支。优点是开发、测试和部署的 cwd 与仓库均隔离，直接解决本次串线原因。代价是少量共享 UI 代码在两个项目各自维护。
2. **继续使用单仓库但加边界**：保留 monorepo，分站点配置文件和显式命令。改动少，但本地 Git 状态和根级脚本仍共用，不能彻底消除工作区混淆。
3. **单仓库中的 Git 子模块**：将 AgentForge 改为子模块。虽然有独立 Git 历史，但调用者仍需理解父仓库/子模块状态、递归克隆及提交指针，Windows 本地工作流更容易出现新的状态混淆，不建议。

## 推荐方案的实施边界

- AgentForge 目录使用独立 Git 仓库，项目根直接包含 Next.js 应用与其本地共享组件，不保留 workspace:* 依赖。
- 生成仅属于 AgentForge 的锁文件和命令（install/test/build/deploy），部署脚本固定目标仓库 `niceman1996/agentforge`，不读取 `SOE_SITE`，并显式设置 Pages `/agentforge` base path 与 canonical URL。
- YardCalc 从原仓库继续使用现有共享包与 YardCalc 专属默认部署脚本；删除其测试/构建入口中对 AgentForge 的枚举，并更新混合文档引用。
- 先基于 GitHub `agentforge` 当前源码分支创建本地独立工作树，再以普通提交将 AgentForge 独立项目放到仓库根目录；这样保留远端已有提交历史、不强推，也不触碰 `gh-pages`。其后的工作只在 AgentForge 仓库进行。
- 原 `seo-tool-sites` 清理 AgentForge 源码、测试枚举和多站构建/发布分支，并将 AgentForge 专属文档移出。若需要外部 GitHub 设置变更才可完成，则停下并呈现具体影响后再做。
- 成功判据：两个本地项目各自独立安装、测试、构建；AgentForge 输出含 `/agentforge/` 路径且深层链接资源正确；YardCalc 原项目不再含 AgentForge 构建/测试/部署开关；公网 URL 与 Pages `gh-pages` 内容保持不变，除非之后单独批准新的发布。

## 留给实现者的决定

- 确认 `G:\ai\projects\agentforge` 不存在或为空后再克隆；已有文件必须原样保留并选择另一路径。
- 先验证 AgentForge 组件只需从共享包中独立出哪些符号，避免复制材料数据/计算器逻辑。
- 将 `docs/upwork-kit.md` 迁入 AgentForge；从原仓库拆出一份 AgentForge 专属 README/操作指南，原 `next-steps.md` 继续保留 YardCalc 步骤。
- 只在远端状态可证明不会破坏 Pages 发布分支后执行源代码迁移；AgentForge 源码分支通过保留历史的普通提交变为独立项目，不强推；`gh-pages` 不变。
