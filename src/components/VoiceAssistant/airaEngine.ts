/**
 * Aira Engine — Enterprise Conversational AI Consultant for ConverseAI
 * Provides:
 * 1. Clean, professional English responses & greetings
 * 2. Bilingual comprehension (understands both English & Hinglish/Hindi queries)
 * 3. Accurate enterprise knowledge retrieval (Voice AI latency, accents, compliance, ticketing, integrations)
 * 4. Single-sentence lead extraction & interactive booking summary cards
 */

export interface BookingLead {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

export interface NavigationAction {
  label: string;
  url: string;
  type: "link" | "route";
}

export interface AiraResponse {
  reply: string;
  navigation?: NavigationAction;
  bookingCard?: BookingLead;
  quickReplies?: string[];
}

// ── 1. Single-Sentence Lead Extraction Helper ──
export function extractLeadDetails(input: string): BookingLead | null {
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i;
  const phoneRegex = /(?:(?:\+91|0)?[ -]?)?([6-9]\d{9})/i;
  const nameRegex = /(?:my name is|i am|i'm|this is|naam hai|main)\s+([a-zA-Z]{2,20}(?:\s+[a-zA-Z]{2,20})?)/i;

  const emailMatch = input.match(emailRegex);
  const phoneMatch = input.match(phoneRegex);
  const nameMatch = input.match(nameRegex);

  // Detect service intent
  let service: string | undefined;
  const lower = input.toLowerCase();
  if (lower.includes("voice") || lower.includes("call") || lower.includes("calling")) {
    service = "AI Voice Agents";
  } else if (lower.includes("whatsapp") || lower.includes("wa")) {
    service = "WhatsApp AI Chatbot";
  } else if (lower.includes("audit") || lower.includes("strategy")) {
    service = "AI Strategy & Audit";
  } else if (lower.includes("integration") || lower.includes("crm") || lower.includes("erp") || lower.includes("mcp")) {
    service = "AI Integration";
  } else if (lower.includes("agentic") || lower.includes("workflow") || lower.includes("process")) {
    service = "Agentic Automation";
  } else if (lower.includes("custom")) {
    service = "Custom AI Agents";
  }

  if (emailMatch || phoneMatch || nameMatch) {
    return {
      name: nameMatch ? nameMatch[1].trim() : undefined,
      email: emailMatch ? emailMatch[1].trim() : undefined,
      phone: phoneMatch ? phoneMatch[1].trim() : undefined,
      service: service || "AI Voice Agents",
      message: input,
    };
  }

  return null;
}

// ── 2. Bilingual Route & Intent Mapping (Answers in English) ──
const NAVIGATION_INTENTS: Array<{
  triggers: string[];
  route: string;
  label: string;
  reply: string;
}> = [
  {
    triggers: [
      "case studies", "case study", "portfolio", "past work", "success stories", "client results",
      "case studies dikhao", "case study dikhao", "previous work", "clients dikhao", "results dikhao"
    ],
    route: "/case-studies",
    label: "Explore Case Studies",
    reply: "Here are verified case studies and ROI metrics from our enterprise client deployments — including StyleMart India (3× repeat revenue, 65% support cost savings) and EdTech lead qualification:",
  },
  {
    triggers: [
      "voice agent", "voice agents", "calling bot", "inbound outbound", "voice demo", "voice sample",
      "voice agents page pe le chalo", "voice call", "voice bot", "sarvam voice", "voice samples suno", "audio demo"
    ],
    route: "/services/ai-voice-agents",
    label: "View AI Voice Agents",
    reply: "We build and manage production-grade conversational AI Voice Agents with sub-800ms latency across US/UK English, Hindi, Hinglish, and regional dialects. Listen to interactive call recordings:",
  },
  {
    triggers: [
      "book a demo", "get a demo", "schedule demo", "meeting fix karo", "demo schedule karna hai",
      "call book karni hai", "talk to human", "schedule call", "demo chahiye", "book demo"
    ],
    route: "/book-demo",
    label: "Book a 1:1 Live Demo",
    reply: "You can schedule a personalized 1:1 platform walkthrough with our solutions team. We will configure an interactive demo tailored to your industry and telephony stack:",
  },
  {
    triggers: [
      "pricing", "cost", "plans", "rate", "kitna kharcha", "price", "kitne ka hai", "pricing kitna hai", "plans dikhao"
    ],
    route: "/pricing",
    label: "View Pricing & Plans",
    reply: "ConverseAI plans are transparent, flexible, and outcome-aligned — designed for growing businesses and high-volume enterprise operations. Review our tiers here:",
  },
  {
    triggers: [
      "whatsapp", "whatsapp bot", "whatsapp ai", "whatsapp shop", "wa bot", "whatsapp automation",
      "whatsapp marketing", "whatsapp chatbot"
    ],
    route: "/whatsapp-ai-chatbot",
    label: "WhatsApp AI Solutions",
    reply: "As an official Meta Tech Provider, ConverseAI builds intelligent WhatsApp AI bots, native catalog stores, automated lead qualification, and cart-recovery flows:",
  },
  {
    triggers: [
      "ai audit", "audit", "readiness audit", "strategy audit", "audit karwana hai", "ai assessment"
    ],
    route: "/services/ai-strategy-audit",
    label: "AI Strategy & Readiness Audit",
    reply: "Our 3-week fixed-fee AI Opportunity Audit maps the 5–10 highest-ROI automation workflows across your business, providing a clear architecture and build plan:",
  },
  {
    triggers: [
      "integration", "integrations", "crm sync", "mcp", "salesforce", "hubspot", "zoho", "tally", "erp", "snowflake", "bigquery"
    ],
    route: "/services/ai-integration",
    label: "AI Integration Services",
    reply: "We build bidirectional real-time AI integrations with Salesforce, HubSpot, Zoho CRM, SAP, Tally, Snowflake, and custom REST/GraphQL APIs via Model Context Protocol (MCP):",
  },
  {
    triggers: [
      "contact", "contact us", "support", "email", "phone number", "office", "jaipur office", "talk to sales", "call us"
    ],
    route: "/contact-us",
    label: "Contact ConverseAI",
    reply: "You can connect directly with our enterprise team via email at contact@theconverseai.com or by calling +91-9982323333. Our office is located in Jaipur, India:",
  },
  {
    triggers: [
      "sitemap", "directory", "all pages", "site map", "navigation list"
    ],
    route: "/sitemap",
    label: "View Website Directory",
    reply: "Explore our complete website directory and structured HTML sitemap covering all products, services, case studies, and resources:",
  },
];

// ── 3. Enterprise Knowledge Retrieval Engine (English Responses) ──
export function generateAiraReply(userInput: string, existingLead?: BookingLead): AiraResponse {
  const query = userInput.trim().toLowerCase();

  // Step 1: Check for single-sentence lead submission
  const extractedLead = extractLeadDetails(userInput);
  if (extractedLead && (extractedLead.email || extractedLead.phone)) {
    const combinedLead: BookingLead = {
      ...existingLead,
      ...extractedLead,
      service: extractedLead.service || existingLead?.service || "AI Voice Agents",
    };

    return {
      reply: `Thank you ${combinedLead.name || ""}! I have captured your consultation request. Please review your details below and confirm to book:`,
      bookingCard: combinedLead,
      quickReplies: ["Confirm Consultation", "Edit Details", "Ask a Question First"],
    };
  }

  // Step 2: Check for direct navigation intents
  for (const intent of NAVIGATION_INTENTS) {
    if (intent.triggers.some((trigger) => query.includes(trigger))) {
      return {
        reply: intent.reply,
        navigation: {
          label: intent.label,
          url: intent.route,
          type: "route",
        },
        quickReplies: ["Book a Live Demo", "View Pricing & ROI", "Talk to Sales"],
      };
    }
  }

  // Step 3: Specific Enterprise Knowledge Questions (English Responses)

  // Accent & Regional Cadence Comprehension
  if (
    query.includes("accent") || query.includes("hinglish") || query.includes("hindi") ||
    query.includes("language") || query.includes("regional") || query.includes("bhasha")
  ) {
    return {
      reply: "ConverseAI Voice Agents natively support authentic Indian regional cadences (North Indian, Mumbai, Chennai, Bangalore) along with fluid Hinglish code-switching. With sub-800ms streaming latency and Silero VAD, conversations feel natural and callers can interrupt the bot at any time (barge-in).",
      navigation: {
        label: "Listen to Voice Demos",
        url: "/services/ai-voice-agents",
        type: "route",
      },
      quickReplies: ["Book Voice Demo", "Supported Integrations", "Security & Compliance"],
    };
  }

  // Security & Compliance
  if (
    query.includes("security") || query.includes("compliance") || query.includes("gdpr") ||
    query.includes("soc2") || query.includes("hipaa") || query.includes("dpdp") || query.includes("privacy")
  ) {
    return {
      reply: "Enterprise security is foundational at ConverseAI. We deliver SOC2, GDPR, HIPAA, and DPDP India-compliant architectures. Highlights include end-to-end TLS 1.3/AES-256 encryption, zero data retention for sensitive customer workflows, and dedicated VPC / on-premise deployment options.",
      navigation: {
        label: "Schedule Security Review",
        url: "/book-demo",
        type: "route",
      },
      quickReplies: ["Book an AI Audit", "Explore Voice Agents", "Case Studies"],
    };
  }

  // L1/L2 Support & Ticketing
  if (
    query.includes("ticket") || query.includes("ticketing") || query.includes("l1") ||
    query.includes("l2") || query.includes("helpdesk") || query.includes("zendesk") || query.includes("freshdesk")
  ) {
    return {
      reply: "ConverseAI automates 80%+ of repetitive L1 & L2 customer support tickets. Our agents classify intent, query backend CRM/ERP data for instant resolutions, and seamlessly escalate complex issues with full conversational context to human agents.",
      navigation: {
        label: "See Omnichannel Support",
        url: "/omni-channel",
        type: "route",
      },
      quickReplies: ["WhatsApp AI Bot", "Book a Demo", "Pricing Details"],
    };
  }

  // Latency & Infrastructure
  if (query.includes("latency") || query.includes("speed") || query.includes("delay") || query.includes("fast")) {
    return {
      reply: "Our voice infrastructure delivers sub-800ms turn response times using streaming STT, Groq Whisper models, and low-latency LLMs. Coupled with direct SIP trunking into Exotel, Twilio, and PBX systems, interactions feel virtually indistinguishable from a human agent.",
      navigation: {
        label: "Test Voice Agents",
        url: "/services/ai-voice-agents",
        type: "route",
      },
      quickReplies: ["Book a Demo", "Case Studies", "Contact Sales"],
    };
  }

  // Default clean, friendly enterprise greeting in English
  return {
    reply: "Hello! I'm Aira, ConverseAI's Enterprise AI Consultant. I can help you evaluate AI Voice Agents, WhatsApp Automation, CRM/ERP integrations, or custom agentic workflows for your business. How can I assist you today?",
    quickReplies: [
      "Voice Agents Demo",
      "Case Studies & ROI",
      "Book a Consultation",
      "View Pricing & Plans",
    ],
  };
}
