/**
 * Single source of truth for site-wide identity.
 * Swap CONTACT_EMAIL for a branded mailbox when one exists — tests assert the
 * shape so a typo cannot ship.
 */
export const site = {
  name: "AgentForge",
  title: "AgentForge — Custom AI Agents & Workflow Automation",
  description:
    "We design and ship production AI agents and workflow automations for small teams. Fixed price, written spec in 48 hours, delivery in days. Custom GPTs from $499, n8n / Make automations from $999.",
  email: "niceboyniu@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://agentforge.pages.dev",
  timezone: "UTC+8",
} as const;
