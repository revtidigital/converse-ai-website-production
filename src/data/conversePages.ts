export interface ConversePageItem {
  id: string;
  title: string;
  url: string;
  description: string;
  iconType: string;
  isCustom?: boolean;
}

export const CONVERSE_PAGES_CATALOG: ConversePageItem[] = [
  {
    id: "ai-voice-agents",
    title: "AI Voice Agent",
    url: "/services/ai-voice-agents",
    description: "Natural, human-like voice agents for your inbound & outbound customer calls.",
    iconType: "voice",
  },
  {
    id: "ai-strategy-audit",
    title: "AI Strategy Audit",
    url: "/services/ai-strategy-audit",
    description: "Evaluate workflows & identify high-ROI AI automation opportunities across teams.",
    iconType: "audit",
  },
  {
    id: "sales-ai",
    title: "Sales Agent",
    url: "/services/sales-ai",
    description: "Automate lead follow-ups, qualification & book more sales meetings effortlessly.",
    iconType: "sales",
  },
  {
    id: "chatbot",
    title: "Customer Support Chatbot",
    url: "/chatbot",
    description: "Deflect 40-60% of support queries instantly without losing CSAT scores.",
    iconType: "chatbot",
  },
  {
    id: "custom-ai-agents",
    title: "Custom AI Agents",
    url: "/services/custom-ai-agents",
    description: "Tailor-made AI agents built specifically for your enterprise workflows.",
    iconType: "custom",
  },
  {
    id: "knowledge-intelligence",
    title: "Knowledge Intelligence",
    url: "/services/knowledge-intelligence",
    description: "Transform complex company documentation into active conversational answers.",
    iconType: "brain",
  },
  {
    id: "agentic-automation",
    title: "Agentic Automation",
    url: "/services/agentic-automation",
    description: "Autonomous multi-step workflows that execute complex business tasks.",
    iconType: "automation",
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    url: "/services/ai-integration",
    description: "Seamlessly integrate AI agents into your CRM and existing tech stack.",
    iconType: "integration",
  },
  {
    id: "whatsapp-ai-chatbot",
    title: "WhatsApp AI Chatbot",
    url: "/whatsapp-ai-chatbot",
    description: "Engage and support your customers 24/7 on WhatsApp with AI.",
    iconType: "whatsapp",
  },
  {
    id: "whatsapp-shop",
    title: "WhatsApp Shop",
    url: "/whatsapp-shop",
    description: "Turn WhatsApp conversations into automated product catalog & checkout.",
    iconType: "shop",
  },
  {
    id: "whatsapp-marketing",
    title: "WhatsApp Marketing",
    url: "/whatsapp-marketing",
    description: "Run high-converting broadcast campaigns & automated drip sequences.",
    iconType: "marketing",
  },
  {
    id: "live-chat",
    title: "Live Chat",
    url: "/live-chat",
    description: "Real-time web chat widget with seamless human agent escalation.",
    iconType: "chat",
  },
  {
    id: "omni-channel",
    title: "Omni Channel",
    url: "/omni-channel",
    description: "Unified inbox across WhatsApp, Web Chat, Email, and Voice channels.",
    iconType: "omni",
  },
  {
    id: "pre-chat-forms",
    title: "Pre-Chat Forms",
    url: "/pre-chat-forms",
    description: "Collect upfront lead context before starting live or automated chat sessions.",
    iconType: "forms",
  },
  {
    id: "agent-capacity",
    title: "Agent Capacity Management",
    url: "/agent-capacity",
    description: "Optimize workload distribution and live agent routing parameters.",
    iconType: "capacity",
  },
  {
    id: "private-notes",
    title: "Private Team Notes",
    url: "/private-notes",
    description: "Internal team collaboration and agent note-taking on active tickets.",
    iconType: "notes",
  },
  {
    id: "live-view",
    title: "Live Activity Monitor",
    url: "/live-view",
    description: "Real-time stream monitoring live customer interactions and AI responses.",
    iconType: "live",
  },
  {
    id: "teams",
    title: "Teams Management",
    url: "/teams",
    description: "Organize support agents into department squads and skill groups.",
    iconType: "teams",
  },
  {
    id: "ai-for-smb",
    title: "AI Solutions for SMB",
    url: "/solutions/ai-for-smb",
    description: "Tailored, cost-effective conversational AI automation packages for SMBs.",
    iconType: "smb",
  },
  {
    id: "case-studies",
    title: "Case Studies",
    url: "/case-studies",
    description: "Explore real success stories & measured ROI from enterprise deployments.",
    iconType: "case_studies",
  },
  {
    id: "book-demo",
    title: "Book a Demo",
    url: "/book-demo",
    description: "Schedule a personalized 1-on-1 walkthrough with our AI automation team.",
    iconType: "demo",
  },
];

export const DEFAULT_CONVERSE_PAGES: ConversePageItem[] = [
  CONVERSE_PAGES_CATALOG[0], // AI Voice Agent
  CONVERSE_PAGES_CATALOG[1], // AI Strategy Audit
  CONVERSE_PAGES_CATALOG[2], // Sales Agent
  CONVERSE_PAGES_CATALOG[3], // Customer Support Chatbot
  CONVERSE_PAGES_CATALOG[4], // Custom AI Agents
];

/** Helper to derive page title automatically from custom URL path if not specified */
export function deriveTitleFromUrl(url: string): string {
  if (!url) return "Converse Page";
  const clean = url.trim().replace(/\/$/, "");
  const lastPart = clean.split("/").pop() || "";
  if (!lastPart) return "Converse Page";
  return lastPart
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
