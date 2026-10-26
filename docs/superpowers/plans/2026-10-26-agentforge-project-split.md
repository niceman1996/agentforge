# AgentForge Project Split Implementation Plan

> **For agentic workers:** Implement inline using superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make AgentForge an independent local and GitHub source project while keeping YardCalc in `seo-tool-sites` and preserving the existing GitHub Pages URL and `gh-pages` branch.

**Architecture:** Clone the existing `niceman1996/agentforge` repository into `G:\ai\projects\agentforge`, retain its source history, and add a standalone AgentForge project at the repository root. Move only its used shared UI into the new project. Then remove AgentForge-specific files and multi-site selectors from the YardCalc workspace.

**Tech Stack:** Next.js 15 static export, React 19, TypeScript, pnpm, Vitest, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-10-26-agentforge-project-split-design.md`

## Global Constraints

- Keep `https://niceman1996.github.io/agentforge/` and the existing `gh-pages` deployment branch unchanged.
- Do not force-push or rewrite existing AgentForge source history.
- Do not change YardCalc's custom domain, DNS, or GitHub Pages configuration.
- Preserve the untracked `scripts/pages-info.mjs` in the YardCalc workspace.
- Use project-local `.bin/node.exe` for node-based scripts on this machine.
- AgentForge must not depend on the YardCalc workspace or `@soe/shared`.

## Review Focus

- Existing `/agentforge` subpath: build output must retain the correct base path for Next.js assets, canonical URLs and the sitemap.
- Pages branch safety: source commits target `master`; static deployment artifacts remain on `gh-pages`.
- Dependency independence: no `workspace:*` packages or paths escaping the AgentForge repository.
- YardCalc isolation: removing AgentForge must not alter YardCalc custom-domain build or deployment behavior.
- Local user state: no cleanup step may remove the untracked `scripts/pages-info.mjs`.

---

### Task 1: Create standalone AgentForge project

**Files:**
- Create: root Next.js app files, local UI components/types, `package.json`, lockfile, configs, tests, and README in `G:\ai\projects\agentforge`
- Source: `sites/agentforge/**`, `packages/shared/src/components.tsx`, `packages/shared/src/types.ts`, and `docs/upwork-kit.md`

**Interfaces:**
- Consumes: existing AgentForge page/data contracts and only `SiteHeader`, `SiteFooter`, `JsonLd`, and their shared type definitions.
- Produces: root-level standalone app commands `dev`, `build`, `test`, and `deploy`; `NEXT_PUBLIC_BASE_PATH=/agentforge` and `NEXT_PUBLIC_SITE_URL=https://niceman1996.github.io/agentforge`.

- [ ] Confirm the destination is absent/empty and clone the existing `agentforge` remote without changing remote refs.
- [ ] Add standalone local shared UI; remove workspace dependency and all paths resolving outside this repository.
- [ ] Add independent build/test/smoke/deploy commands with the Pages repo fixed to `niceman1996/agentforge`.
- [ ] Generate the standalone lockfile and copy only the local ignored `.bin/node.exe` needed by this machine.
- [ ] Build AgentForge and inspect generated asset URLs, canonical URLs, sitemap and deep-page output for `/agentforge/`.
- [ ] Commit the standalone source as a normal commit on top of the existing source branch; do not alter `gh-pages`.

### Task 2: Remove AgentForge from YardCalc workspace

**Files:**
- Modify: `package.json`, `pnpm-workspace.yaml`, `scripts/build-pages.mjs`, `scripts/deploy-gh-pages.mjs`, `scripts/run-tests.mjs`, `docs/next-steps.md`, `docs/log.md`
- Delete/move: `sites/agentforge/**`, `docs/upwork-kit.md` (moved to AgentForge project)
- Preserve: `scripts/pages-info.mjs`

**Interfaces:**
- Consumes: the standalone AgentForge repo from Task 1.
- Produces: YardCalc-only build, test, preview and deploy commands with no `SOE_SITE=agentforge` mode.

- [ ] Remove AgentForge from YardCalc's test list and workspace package list.
- [ ] Simplify root build/deploy entry points to YardCalc only while retaining `SOE_DOMAIN` behavior.
- [ ] Remove AgentForge's site tree and Upwork kit from this repository; update remaining docs to point to the standalone project and existing public URL.
- [ ] Review the diff to confirm the untracked `scripts/pages-info.mjs` remains untouched and present.
- [ ] Build YardCalc and inspect static output plus custom-domain path handling.
- [ ] Commit the YardCalc workspace cleanup without touching any Pages remote branch.

### Task 3: Final isolation and remote-state verification

**Files:**
- Verify: both project manifests, lockfiles, deployment scripts, git refs, generated outputs and working-tree status.

**Interfaces:**
- Consumes: Task 1 standalone AgentForge project and Task 2 YardCalc-only workspace.
- Produces: evidence that each project builds independently and Pages deployment state is preserved.

- [ ] Confirm AgentForge Git history includes the prior source history and its new standalone commit, with no force-push.
- [ ] Confirm `niceman1996/agentforge` `gh-pages` ref is unchanged.
- [ ] Confirm AgentForge source/config contains no workspace dependency or cross-repository paths.
- [ ] Confirm YardCalc has no AgentForge build/test/deploy switch and the untracked pages-info script is still present.
- [ ] Review final diffs in both directories and report build outcomes, remaining external steps, and exact local project paths.
