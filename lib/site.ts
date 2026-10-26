/**
 * Single source of truth for site-wide identity.
 * Swap CONTACT_EMAIL for a branded mailbox when one exists — tests assert the
 * shape so a typo cannot ship.
 */
export const site = {
  name: "AgentForge",
  title: "AgentForge — Self-Hosted AI Agents & Workflow Automation",
  description:
    "Remote setup on your computer or server: workflow automation from $999, self-hosted AI agents from $1,500. Optional cloud Custom GPT setup from $499. Fixed scope and price.",
  email: "niceboyniu@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://niceman1996.github.io/agentforge",
  timezone: "UTC+8",
} as const;
