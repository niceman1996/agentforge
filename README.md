# AgentForge

AgentForge is an independent project for the custom AI agent and workflow automation studio site.

- Live site: <https://niceman1996.github.io/agentforge/>
- Source: this repository's `master` branch
- GitHub Pages output: `gh-pages` branch
- Marketing and Upwork copy: `docs/upwork-kit.md`

## Local setup

Install dependencies with pnpm, then run project commands through the local Node copy on this workstation:

```powershell
New-Item -ItemType Directory -Force .bin | Out-Null
Copy-Item G:\kit\node\node.exe .bin\node.exe
\.bin\node.exe G:\kit\node\node_modules\pnpm\bin\pnpm.mjs install
```

```powershell
.\.bin\node.exe scripts/next.mjs dev
.\.bin\node.exe scripts/run-tests.mjs
.\.bin\node.exe scripts/next.mjs build
.\.bin\node.exe scripts/smoke.mjs out
.\.bin\node.exe scripts/serve-static.mjs out 8080
```

The build wrapper sets the `/agentforge` GitHub Pages base path and canonical site URL. Deployment is a separate explicit command after a successful build:

```powershell
.\.bin\node.exe scripts/deploy-gh-pages.mjs
```

This project keeps its own dependencies, tests and deployment scripts. It does not use the YardCalc workspace or its site-selection environment variables.
