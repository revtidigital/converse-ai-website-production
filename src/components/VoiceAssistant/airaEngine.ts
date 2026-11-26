/**
 * Converse AI Conversational Knowledge Base & Scheduling Engine
 * Provides:
 * 1. Comprehensive knowledge retrieval covering all products, services, differences from traditional chatbots,
 *    industries, team location, security, pricing, and architecture.
 * 2. Bilingual natural language understanding (English, Hindi, and Hinglish queries).
 * 3. Step-by-step interactive conversational form-filling & call scheduling.
 * 4. Single-sentence / multi-entity extraction with booking cards.
 */

export interface BookingLead {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  preferredTime?: string;
  step?: "awaiting_name" | "awaiting_email" | "awaiting_phone" | "awaiting_service" | "awaiting_time" | "ready" | "idle";
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

// ── 1. Comprehensive ConverseAI Knowledge Base ──

interface KnowledgeTopic {
  id: string;
  triggers: string[];
  reply: string;
  navigation?: NavigationAction;
  quickReplies?: string[];
}

const KNOWLEDGE_BASE: KnowledgeTopic[] = [
  // 1. Comparison: ConverseAI vs Traditional Chatbots (Tidio, Intercom, Drift, Botpress)
  {
    id: "vs_traditional_chatbots",
    triggers: [
      "how is it different from", "how is it different", "how is converseai different",
      "different from a normal chatbot", "different from a normal", "different from traditional",
      "different from tidio", "different from intercom", "why converseai over", "tidio or intercom",
      "tidio", "intercom", "botpress", "drift", "zendesk", "freshdesk", "normal chatbot",
      "traditional chatbot", "different from", "alag kaise", "difference", "kyu choose kare",
      "why converseai", "simple chatbot", "traditional bot", "chatbot vs agent", "versus", "vs"
    ],
    reply: `Traditional chatbots (such as Tidio, Intercom, or basic widget bots) rely on rigid rule-based decision trees, static FAQ matches, and pre-scripted buttons that often frustrate users and cannot take real-world actions.

ConverseAI is fundamentally different:
1. Autonomous Action Execution: Our agents don't just chat — they query live databases, book calendar consultation slots, process refunds, verify KYC, dispatch UPI payment links, and write directly into your CRM (Salesforce, HubSpot, Zoho, SAP).
2. Human-Parity Voice AI (<800ms): We build live telephony voice agents with sub-800ms response times, authentic Indian & international accents (Hindi, Hinglish, US/UK English), and natural barge-in (callers can interrupt the bot naturally at any time).
3. Fully Built & Operated by Us: You don't need to hire an internal AI team. We scope your business problem, build the custom agent, integrate your telephony & APIs, and run it in production with guaranteed SLAs.
4. Warm Human Handoff: Complex edge cases are transferred seamlessly to human agents with full conversational transcripts, sentiment scores, and CRM context so customers never re-explain themselves.`,
    navigation: {
      label: "Why ConverseAI Over Chatbots",
      url: "/about-us",
      type: "route",
    },
    quickReplies: ["Voice Agents Demo", "WhatsApp AI Solutions", "Book a Consultation", "Pricing & ROI"],
  },

  // 2. What ConverseAI Does & Industries We Help
  {
    id: "what_we_do_and_industries",
    triggers: [
      "kya karta hai", "kya karte ho", "what is converseai", "what does converseai do",
      "what do you do", "kin businesses", "who do you help", "industries", "clients",
      "kaise help karte ho", "target audience", "about converseai", "converse ai kya hai",
      "tell me about converse", "overview", "what are your services", "tum kya karte ho", "use case"
    ],
    reply: `ConverseAI builds, integrates, and operates custom enterprise AI agents in production — focusing on ultra-low latency Voice Agents, intelligent WhatsApp automation, and autonomous agentic workflows.

We do not just sell DIY software; we scope your problem, build the custom agent, connect your telephony/APIs, and run it in production with guaranteed SLAs. No in-house AI team is needed on your end.

Key Industries We Serve:
• Healthcare & Clinics: Patient symptom triage, doctor availability checks, appointment booking, and SMS confirmation.
• BFSI & NBFC Lending: DLT-compliant early-bucket EMI payment reminders, instant UPI payment links, and customer KYC verification.
• E-Commerce & D2C Brands: WhatsApp Shop catalogs, instant order tracking (ETA), returns, and automated cart recovery.
• B2B SaaS & High-Ticket: Autonomous SDR lead qualification (BANT/MEDDIC), demo booking, and calendar invites.
• Real Estate: High-intent buyer qualification (budget, 2BHK/3BHK), property viewing and site visit scheduling.
• Logistics & Automotive: Consignment tracking, Frankfurt/India customs clearance updates, and showroom test drive booking.`,
    navigation: {
      label: "Explore All AI Services",
      url: "/services",
      type: "route",
    },
    quickReplies: ["Voice Agents Demo", "Case Studies & ROI", "Book a Consultation", "View Pricing & Plans"],
  },

  // 3. Team Location, Office Address & Company Background
  {
    id: "team_and_location",
    triggers: [
      "team based", "where is your team", "office kahan hai", "kahan based ho", "location",
      "headquarters", "jaipur", "address", "where are you located", "office address",
      "company address", "who founded", "revti digital", "where are you from", "office"
    ],
    reply: `ConverseAI is headquartered in Jaipur, Rajasthan, India:
📍 Office Address: F-21, Madhuban Colony, Barkat Nagar, Tonk Phatak, Jaipur, Rajasthan 302015.

We are an enterprise AI engineering brand operated by Revti Digital. Our engineering team operates globally, delivering production deployments for growing mid-market and enterprise businesses across India, North America, the UK, Europe, and the Middle East.

Contact & Communication:
• Official Email: contact@theconverseai.com
• Phone: +91-7891331221 / +91-7023084065
• Business Hours: Monday – Saturday: 10:00 AM – 7:00 PM IST
• Consultation: You can schedule a 1:1 consultation directly in this chat!`,
    navigation: {
      label: "Contact ConverseAI Team",
      url: "/contact-us",
      type: "route",
    },
    quickReplies: ["Book a Consultation", "Explore Services", "View Case Studies"],
  },

  // 4. Case Studies & Proven Results
  {
    id: "case_studies",
    triggers: [
      "case studies", "case study", "portfolio", "past work", "success stories", "client results",
      "case studies dikhao", "examples of what you have built", "results dikhao", "examples", "proof", "clients"
    ],
    reply: `Here are verified enterprise client results achieved with ConverseAI agents in production:
• StyleMart India (E-Commerce / D2C): 3× repeat revenue growth and 65% customer support cost savings via WhatsApp automation.
• EdTech Global: 4.2× increase in qualified demo bookings and 92% reduction in lead response time with Voice AI qualification.
• CareFirst Healthcare: 400+ weekly clinic appointments booked autonomously, eliminating phone queue hold times.
• NBFC Lending: 38% improvement in early-stage EMI collections with respectful, DLT-compliant voice reminders.`,
    navigation: {
      label: "Explore Case Studies",
      url: "/case-studies",
      type: "route",
    },
    quickReplies: ["Book a Live Demo", "View Pricing & ROI", "Talk to Sales"],
  },

  // 5. AI Voice Agents & Calling Technology
  {
    id: "voice_agents",
    triggers: [
      "voice agent", "voice agents", "calling bot", "inbound outbound", "voice demo", "voice sample",
      "voice call", "voice bot", "sarvam voice", "audio demo", "phone agent", "calling ai", "voice samples"
    ],
    reply: `ConverseAI Voice Agents deliver human-like phone conversations with sub-800ms streaming latency.

Key Capabilities:
• Authentic Regional Dialects: Fluent in Hindi, natural conversational Hinglish, US & UK English, Tamil, German, French, and Spanish.
• Natural Barge-In: Powered by Silero VAD, callers can interrupt the AI naturally at any point in the conversation.
• Telephony Ready: Plugs directly into Exotel, Twilio, Plivo, FreePBX, Asterisk, and cloud contact centers via SIP trunks.
• Full Workflows: 24/7 inbound reception, B2B lead qualification, clinic bookings, payment reminders, and warm transfer to human agents.`,
    navigation: {
      label: "Listen to Voice Demos",
      url: "/services/ai-voice-agents",
      type: "route",
    },
    quickReplies: ["Listen to Voice Demos", "Book Voice Demo", "Pricing Details"],
  },

  // 6. WhatsApp AI Chatbot & WhatsApp Shop
  {
    id: "whatsapp_solutions",
    triggers: [
      "whatsapp", "whatsapp bot", "whatsapp ai", "whatsapp shop", "wa bot", "whatsapp automation",
      "whatsapp marketing", "meta tech provider", "catalog"
    ],
    reply: `As an official Meta Tech Provider, ConverseAI delivers end-to-end WhatsApp automation:
• WhatsApp Shop & Catalogs: In-chat product browsing, cart checkout, and instant UPI/NetBanking payment link dispatch.
• 24/7 Customer Care: Automated order tracking (ETA), returns/refunds, and 80%+ FAQ deflection.
• Automated Lead Qualification: Interactive qualification flows, lead scoring, and instant CRM sync.
• Marketing & Abandoned Cart Recovery: DLT and Meta policy-compliant promotional broadcasts with high conversion rates.`,
    navigation: {
      label: "WhatsApp AI Solutions",
      url: "/whatsapp-ai-chatbot",
      type: "route",
    },
    quickReplies: ["WhatsApp Shop Demo", "CRM Integrations", "Book a Consultation"],
  },

  // 7. Agentic Automation & Custom Workflows
  {
    id: "agentic_automation",
    triggers: [
      "agentic", "workflow", "workflows", "process automation", "document processing",
      "invoice", "ocr", "autonomous agents", "agent sprint"
    ],
    reply: `Our Agentic Automation services build autonomous AI systems that execute complex, multi-step business operations:
• Intelligent Document Processing: Extracts structured data from invoices, purchase orders, medical records, and scanned PDFs.
• Cross-System Reconciliation: Matches bank statements with ERP entries (SAP, Tally, Zoho Books).
• Human-in-the-Loop Controls: Flags anomalies for human review while automating 85%+ of repetitive workflows.
• 4-Week Agent Sprint: We deploy your first production agent in 30 days.`,
    navigation: {
      label: "Agentic Automation",
      url: "/services/agentic-automation",
      type: "route",
    },
    quickReplies: ["Book an Agent Sprint", "See Integrations", "Case Studies"],
  },

  // 8. AI Strategy & Readiness Audit
  {
    id: "ai_strategy_audit",
    triggers: [
      "ai audit", "audit", "readiness audit", "strategy audit", "audit karwana hai",
      "ai assessment", "90-day roadmap", "roadmap"
    ],
    reply: `The ConverseAI AI Readiness Audit is a 3-week fixed-fee strategic engagement designed to cut through AI hype:
1. We analyze your tech stack, databases, workflows, and unit economics.
2. We identify and prioritize your 5–10 highest-ROI AI use cases based on feasibility and impact.
3. We deliver a complete architecture blueprint, vendor selection, and an actionable 90-day execution roadmap.

Best part: 100% of the audit fee is credited toward your first custom build with us.`,
    navigation: {
      label: "AI Strategy & Readiness Audit",
      url: "/services/ai-strategy-audit",
      type: "route",
    },
    quickReplies: ["Book Free Fit Call", "Audit Pricing", "Case Studies"],
  },

  // 9. Integrations & Model Context Protocol (MCP)
  {
    id: "integrations",
    triggers: [
      "integration", "integrations", "crm sync", "mcp", "salesforce", "hubspot", "zoho",
      "tally", "erp", "sap", "snowflake", "bigquery", "telephony", "api connect", "database"
    ],
    reply: `ConverseAI integrates seamlessly with your existing tech stack without requiring you to replace your software:
• CRMs: Salesforce, HubSpot, Zoho CRM, LeadSquared, Pipedrive.
• ERP & Accounting: SAP, Tally Prime, Zoho Books, NetSuite.
• Telephony: Exotel, Twilio, Plivo, FreePBX, Asterisk, Genesys.
• Helpdesks: Zendesk, Freshdesk, Intercom.
• Databases & AI Protocols: Model Context Protocol (MCP), Snowflake, BigQuery, PostgreSQL, and custom REST/GraphQL APIs.`,
    navigation: {
      label: "AI Integration Services",
      url: "/services/ai-integration",
      type: "route",
    },
    quickReplies: ["Book a Consultation", "Voice Agents", "Security & Compliance"],
  },

  // 10. Pricing & Plans
  {
    id: "pricing",
    triggers: [
      "pricing", "cost", "plans", "rate", "kitna kharcha", "price", "kitne ka hai",
      "pricing kitna hai", "plans dikhao", "charges", "subscription"
    ],
    reply: `ConverseAI offers transparent, outcome-aligned pricing tailored to your scale:
• Starter & Growth Tiers: Designed for SMBs scaling customer support and lead qualification.
• Enterprise Custom Tiers: High-volume concurrent voice channels, custom fine-tuned LLMs, dedicated telephony SIP trunks, and 24/7 dedicated engineering support.
• AI Strategy Audit: Fixed-fee 3-week engagement where 100% of the audit cost is credited toward your first build.

We provide clear ROI estimations before kicking off any engagement.`,
    navigation: {
      label: "View Pricing & Plans",
      url: "/pricing",
      type: "route",
    },
    quickReplies: ["Book a Demo", "Calculate ROI", "AI Audit Details"],
  },

  // 11. Security, Compliance & Data Privacy
  {
    id: "security_and_compliance",
    triggers: [
      "security", "compliance", "gdpr", "soc2", "hipaa", "dpdp", "privacy", "data safe", "encryption"
    ],
    reply: `Enterprise security and data privacy are core to ConverseAI:
• Certifications & Standards: Built for GDPR, CCPA, HIPAA, and India DPDP Act 2023 compliance.
• Encryption: Strict TLS 1.3 in transit and AES-256 at rest.
• Zero Data Retention: Sensitive customer PII and voice recordings can be wiped immediately post-call or tokenized.
• Private Cloud / VPC: Option to deploy on your own AWS/GCP virtual private cloud or on-premise infrastructure.`,
    navigation: {
      label: "Schedule Security Review",
      url: "/book-demo",
      type: "route",
    },
    quickReplies: ["Schedule Security Review", "Book a Consultation", "Privacy Policy"],
  },

  // 12. Human Transfer & Escalation
  {
    id: "human_handoff",
    triggers: [
      "human", "agent transfer", "warm transfer", "talk to human", "escalation", "customer care", "human handoff"
    ],
    reply: `Our AI agents feature intelligent Warm Human Transfer. Whenever a caller requests a human, gets frustrated, or presents an edge case outside the AI's guardrails, the agent transfers the call or chat instantly to your human team — passing full conversation transcripts, caller intent, and CRM history so the customer never repeats themselves.`,
    navigation: {
      label: "See Omnichannel Support",
      url: "/omni-channel",
      type: "route",
    },
    quickReplies: ["Book a Demo", "Voice Agents Demo", "Contact Sales"],
  },

  // 13. Latency & Audio Infrastructure
  {
    id: "latency_and_speed",
    triggers: ["latency", "speed", "delay", "fast", "kitni der", "response time"],
    reply: `Our voice infrastructure delivers sub-800ms turn response times using streaming STT, low-latency Groq LLM pipelines, and neural TTS models. Coupled with direct SIP trunking into Exotel, Twilio, and PBX systems, interactions feel natural, instant, and virtually indistinguishable from a human agent.`,
    navigation: {
      label: "Test Voice Agents",
      url: "/services/ai-voice-agents",
      type: "route",
    },
    quickReplies: ["Book a Demo", "Case Studies", "Contact Sales"],
  },

  // 14. Website Sitemap & Directory
  {
    id: "sitemap_directory",
    triggers: ["sitemap", "directory", "all pages", "site map", "navigation list"],
    reply: `Explore our complete website directory and structured HTML sitemap covering all products, services, case studies, and resources:`,
    navigation: {
      label: "View Website Directory",
      url: "/sitemap",
      type: "route",
    },
    quickReplies: ["Explore Services", "Case Studies", "Book a Demo"],
  },

  // 15. Greetings & Polite Salutations
  {
    id: "greetings",
    triggers: [
      "hi", "hello", "hey", "namaste", "good morning", "good evening", "good afternoon",
      "kaise ho", "kya haal hai", "start chat", "salaam", "kem cho"
    ],
    reply: `Hello! Welcome to ConverseAI. I'm your Enterprise AI Consultant. How can I help you automate and scale your business today?

You can ask me about our ultra-low latency Voice Agents, WhatsApp automation, enterprise CRM integrations, or schedule a 1:1 consultation directly here!`,
    quickReplies: [
      "Voice Agents Demo",
      "WhatsApp AI Solutions",
      "What is ConverseAI?",
      "Book a Consultation",
    ],
  },

  // 16. Gratitude & Closing
  {
    id: "gratitude_and_closing",
    triggers: [
      "thank you", "thanks", "dhanyawad", "shukriya", "great thanks", "bye", "goodbye",
      "alvida", "see you", "thank u", "thx"
    ],
    reply: `You're very welcome! If you'd like to explore how ConverseAI can help automate customer engagement or schedule a 1:1 call with our solutions engineering team, I'm always available 24/7. Have a great day!`,
    quickReplies: [
      "Book a Consultation",
      "Explore Services",
      "View Pricing & Plans",
    ],
  },

  // 17. Languages & Accent Support
  {
    id: "languages_supported",
    triggers: [
      "which languages", "what languages", "languages do you support", "language support",
      "languages supported", "regional languages", "language", "languages", "hindi and hinglish",
      "hindi support", "bhasha", "multilingual", "regional accents", "accent", "accents",
      "bilingual", "telugu", "tamil language"
    ],
    reply: `ConverseAI Voice and WhatsApp Agents are built for true multilingual enterprise fluency:
• Indian Regional Languages: Fluent in Hindi (pure & conversational), natural everyday Hinglish, Tamil, Telugu, Kannada, Bengali, and Marathi.
• International Languages: US, UK, and Australian English, German, French, Spanish, and Arabic.
• Regional Dialects & Barge-in: Trained on real-world conversational cadence with natural barge-in (interruption) without breaking context.`,
    navigation: {
      label: "Listen to Multilingual Demos",
      url: "/services/ai-voice-agents",
      type: "route",
    },
    quickReplies: ["Listen to Voice Demos", "Book a Live Demo", "Talk to Sales"],
  },

  // 18. Sales AI & Autonomous Outbound Calling
  {
    id: "sales_ai",
    triggers: [
      "sales ai", "sales outreach", "cold calling", "outbound", "outbound calling",
      "sdr", "lead qualification", "prospecting", "cold call", "sales bot"
    ],
    reply: `ConverseAI Sales AI acts as an autonomous 24/7 SDR for inbound and outbound pipeline generation:
• Speed-to-Lead (<30s): Instantly calls inbound form leads within 30 seconds to qualify intent while prospects are hot.
• BANT / MEDDIC Qualification: Engages prospects in natural dialogue to verify budget, authority, need, and timeline.
• Live Calendar Booking: Directly books high-intent prospects onto your sales reps' Google or Outlook calendars.
• Zero Burned Numbers: Fully compliant with telecom regulations and DLT norms.`,
    navigation: {
      label: "Explore Sales AI",
      url: "/services/sales-ai",
      type: "route",
    },
    quickReplies: ["Book a Sales AI Demo", "Pricing Details", "Case Studies"],
  },

  // 19. Custom AI Agents & Fine-Tuned Models
  {
    id: "custom_ai_agents",
    triggers: [
      "custom ai", "custom agent", "custom agents", "bespoke", "custom model",
      "fine-tuning", "fine tuning", "private llm", "on-premise", "on premise"
    ],
    reply: `We build bespoke, production-grade AI agents tailored to your exact schemas, workflows, and brand voice:
• Tailored Architecture: Customized system prompts, deterministic guardrails, and proprietary knowledge bases.
• Fine-Tuned Domain Models: Optimized on your historical tickets, transcripts, and industry terminology.
• Enterprise Deployment Options: Run securely on ConverseAI cloud, in your private AWS/GCP VPC, or on-premise for regulated banking and healthcare environments.`,
    navigation: {
      label: "Custom AI Agents",
      url: "/services/custom-ai-agents",
      type: "route",
    },
    quickReplies: ["Book a Consultation", "Security Architecture", "Case Studies"],
  },

  // 20. Omnichannel Support
  {
    id: "omnichannel",
    triggers: [
      "omnichannel", "omni-channel", "channels", "unified inbox", "all channels",
      "sms and whatsapp", "multi-channel", "multichannel"
    ],
    reply: `ConverseAI unites all your customer communication touchpoints into a unified intelligence layer:
• Live Telephony (Inbound & Outbound Voice)
• WhatsApp Business API & WhatsApp Shop
• Webchat & In-App Widgets
• Email & SMS Notifications
Customer profile, intent, and conversational history persist seamlessly across channels so customers never repeat themselves.`,
    navigation: {
      label: "Omnichannel Solutions",
      url: "/omni-channel",
      type: "route",
    },
    quickReplies: ["Book a Demo", "Explore WhatsApp Solutions", "View Pricing"],
  },
];

// ── 2. Entity Extraction Helpers ──

export function extractLeadDetails(input: string): Partial<BookingLead> {
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i;
  const phoneRegex = /(?:(?:\+91|0)?[ -]?)?([6-9]\d{9})/i;
  const nameRegex = /(?:my name is|i am|i'm|this is|naam hai|main|myself)\s+([a-zA-Z]{2,20}(?:\s+[a-zA-Z]{2,20})?)/i;
  const timeRegex = /(?:tomorrow|today|monday|tuesday|wednesday|thursday|friday|saturday|sunday|\b\d{1,2}(?:st|nd|rd|th)?\s+(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)?)\s*(?:at|@)?\s*(?:\d{1,2}(?::\d{2})?\s*(?:am|pm)?|morning|afternoon|evening)?|\b\d{1,2}(?::\d{2})?\s*(?:am|pm)\b/i;

  const emailMatch = input.match(emailRegex);
  const phoneMatch = input.match(phoneRegex);
  const nameMatch = input.match(nameRegex);
  const timeMatch = input.match(timeRegex);

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

  return {
    name: nameMatch ? nameMatch[1].trim() : undefined,
    email: emailMatch ? emailMatch[1].trim() : undefined,
    phone: phoneMatch ? phoneMatch[1].trim() : undefined,
    preferredTime: timeMatch ? timeMatch[0].trim() : undefined,
    service: service,
    message: input,
  };
}

// ── 3. Conversational Multi-Step Scheduling & Knowledge Engine ──

const BOOKING_INTENT_TRIGGERS = [
  "book consultation", "book a consultation", "schedule demo", "book demo", "schedule a demo",
  "book a demo", "call book karni hai", "meeting fix karo", "talk to human", "schedule call",
  "demo schedule karna hai", "consultation chahiye", "book call", "want to book", "need a demo",
  "consultation booking", "schedule consultation"
];

const OUT_OF_CONTEXT_TRIGGERS = [
  // General knowledge, trivia, politics, sports
  "capital of", "who is the prime minister", "who is the president", "who won", "world cup",
  "cricket match", "football", "nba", "ipl", "population of", "distance between", "how far is",
  "history of", "who invented", "when was", "who discovered", "currency of", "flag of",
  "prime minister", "president of",

  // Food, cooking, recipes
  "recipe", "how to cook", "how to make", "ingredients for", "bake cake", "make biryani", "recipe for",
  "cooking", "dinner recipe", "breakfast recipe",

  // Weather & environment
  "weather", "forecast", "temperature in", "is it raining", "climate in", "weather today",

  // Entertainment / movies / music / celebrity
  "movie", "cinema", "song", "lyrics", "celebrity", "actor", "actress", "box office", "netflix",

  // Casual chitchat / jokes / poetry / personal
  "tell me a joke", "joke sunao", "tell a joke", "say a joke", "sing a song", "sing song",
  "write a poem", "write poem", "shayari", "tell me a story", "kahani sunao", "tell a story",
  "are you single", "do you love me", "who is your girlfriend", "who is your boyfriend",
  "marry me", "how old are you", "what is your age", "what are you wearing", "joke", "shayari sunao",

  // General coding / academic homework / math
  "write a python script", "write code for", "binary search", "leetcode", "write java code",
  "write c++", "solve equation", "calculate ", "integral of", "derivative of", "write an essay",
  "do my homework", "solve this math",

  // Crypto / stock market tips
  "crypto", "bitcoin", "ethereum", "stock tip", "share market tip"
];

export function generateAiraReply(userInput: string, existingLead?: BookingLead): AiraResponse {
  const query = userInput.trim().toLowerCase();
  const trimmed = userInput.trim();

  // ── A. Check if user is in an active conversational form-filling flow ──
  if (existingLead && existingLead.step && existingLead.step !== "idle" && existingLead.step !== "ready") {
    const updatedLead: BookingLead = { ...existingLead };

    // Case 1: Waiting for Name
    if (existingLead.step === "awaiting_name") {
      const extracted = extractLeadDetails(userInput);
      let nameCandidate = extracted.name;
      if (!nameCandidate && !trimmed.includes("@") && !/\d/.test(trimmed) && trimmed.split(/\s+/).length <= 4) {
        // Direct name given (e.g., "Rahul Sharma")
        nameCandidate = trimmed.replace(/^(my name is|i am|i'm|this is|naam hai)\s+/i, "").trim();
      }

      if (nameCandidate) {
        updatedLead.name = nameCandidate;
        updatedLead.step = "awaiting_email";
        return {
          reply: `Pleasure to meet you, ${nameCandidate}! What is your **Work Email address** so we can send you the calendar invite and meeting link?`,
          bookingCard: updatedLead,
          quickReplies: ["rahul@example.com", "Skip Email (Use Phone)"],
        };
      }
    }

    // Case 2: Waiting for Email
    if (existingLead.step === "awaiting_email") {
      const extracted = extractLeadDetails(userInput);
      if (extracted.email) {
        updatedLead.email = extracted.email;
        updatedLead.step = "awaiting_phone";
        return {
          reply: `Thank you! Could you also share your **Phone or WhatsApp number** for meeting confirmation and SMS reminder?`,
          bookingCard: updatedLead,
          quickReplies: ["9876543210", "Skip Phone"],
        };
      } else if (trimmed.toLowerCase().includes("skip") || trimmed.toLowerCase().includes("nahi")) {
        updatedLead.step = "awaiting_phone";
        return {
          reply: `No problem! Could you share your **Phone or WhatsApp number** instead?`,
          bookingCard: updatedLead,
          quickReplies: ["9876543210"],
        };
      }
    }

    // Case 3: Waiting for Phone
    if (existingLead.step === "awaiting_phone") {
      const extracted = extractLeadDetails(userInput);
      if (extracted.phone) {
        updatedLead.phone = extracted.phone;
      }
      if (!updatedLead.service) {
        updatedLead.step = "awaiting_service";
        return {
          reply: `Got it! Which **ConverseAI solution** are you most interested in automating for your business?`,
          bookingCard: updatedLead,
          quickReplies: ["AI Voice Agents", "WhatsApp AI Chatbot", "Agentic Automation", "AI Readiness Audit"],
        };
      } else {
        updatedLead.step = "awaiting_time";
        return {
          reply: `Great! What **date and time** works best for your schedule? (For example: Tomorrow at 3 PM, Thursday morning, or any preferred time)`,
          bookingCard: updatedLead,
          quickReplies: ["Tomorrow at 3 PM", "Tomorrow at 11 AM", "Friday at 2 PM", "As soon as possible"],
        };
      }
    }

    // Case 4: Waiting for Service
    if (existingLead.step === "awaiting_service") {
      const extracted = extractLeadDetails(userInput);
      updatedLead.service = extracted.service || trimmed;
      updatedLead.step = "awaiting_time";
      return {
        reply: `Awesome! What **date and time** works best for your consultation? (For example: Tomorrow at 3 PM, Friday 11 AM, or any preferred slot)`,
        bookingCard: updatedLead,
        quickReplies: ["Tomorrow at 3 PM", "Tomorrow at 11 AM", "Friday at 2 PM", "As soon as possible"],
      };
    }

    // Case 5: Waiting for Preferred Date/Time
    if (existingLead.step === "awaiting_time") {
      const extracted = extractLeadDetails(userInput);
      updatedLead.preferredTime = extracted.preferredTime || trimmed;
      updatedLead.step = "ready";

      return {
        reply: `Thank you ${updatedLead.name || ""}! I have captured all your consultation details. Please review your booking summary below and click **Confirm** to lock in your slot:`,
        bookingCard: updatedLead,
        quickReplies: ["Confirm Consultation", "Edit Details", "Ask a Question First"],
      };
    }
  }

  // ── B. Check for single-sentence lead submission with multiple entities ──
  const singleShot = extractLeadDetails(userInput);
  if (singleShot && (singleShot.email || singleShot.phone) && singleShot.name) {
    const isNewContact =
      existingLead &&
      ((singleShot.email && existingLead.email && singleShot.email !== existingLead.email) ||
        (singleShot.phone && existingLead.phone && singleShot.phone !== existingLead.phone) ||
        (singleShot.name && existingLead.name && singleShot.name.toLowerCase() !== existingLead.name.toLowerCase()));

    const baseLead = isNewContact ? {} : (existingLead || {});
    const combinedLead: BookingLead = {
      ...baseLead,
      ...singleShot,
      service: singleShot.service || baseLead.service || "AI Voice Agents",
      preferredTime: singleShot.preferredTime || baseLead.preferredTime || "Tomorrow at 3:00 PM",
      step: "ready",
    };

    return {
      reply: `Thank you ${combinedLead.name}! I have captured your consultation request. Please review your details below and confirm to schedule:`,
      bookingCard: combinedLead,
      quickReplies: ["Confirm Consultation", "Edit Details", "Ask a Question First"],
    };
  }

  // ── C. Check if user explicitly requests to book a consultation / demo ──
  if (BOOKING_INTENT_TRIGGERS.some((tr) => query.includes(tr))) {
    const baseLead: BookingLead = existingLead ? { ...existingLead } : {};

    if (!baseLead.name) {
      baseLead.step = "awaiting_name";
      return {
        reply: `I'd be glad to schedule a 1:1 consultation with our solutions engineering team! To get started, what is your **Full Name**?`,
        bookingCard: baseLead,
        quickReplies: ["I'm Rahul", "I'm Priya", "Schedule on Form Page"],
      };
    } else if (!baseLead.email) {
      baseLead.step = "awaiting_email";
      return {
        reply: `Great to connect, ${baseLead.name}! What is your **Work Email** so we can send you the calendar invite?`,
        bookingCard: baseLead,
        quickReplies: ["name@company.com"],
      };
    } else if (!baseLead.phone) {
      baseLead.step = "awaiting_phone";
      return {
        reply: `Got it! What is your **Phone or WhatsApp number** for meeting confirmation?`,
        bookingCard: baseLead,
        quickReplies: ["9876543210"],
      };
    } else {
      baseLead.step = "awaiting_time";
      return {
        reply: `What **date and time** would you prefer for the consultation? (e.g. Tomorrow at 3 PM, Friday 11 AM)`,
        bookingCard: baseLead,
        quickReplies: ["Tomorrow at 3 PM", "Tomorrow at 11 AM", "Friday at 2 PM", "As soon as possible"],
      };
    }
  }

  // ── D. Search ConverseAI Knowledge Base (Longest Specific Match Priority) ──
  let bestTopic: KnowledgeTopic | null = null;
  let bestTriggerLen = 0;

  for (const topic of KNOWLEDGE_BASE) {
    for (const trigger of topic.triggers) {
      if (query.includes(trigger) && trigger.length > bestTriggerLen) {
        bestTriggerLen = trigger.length;
        bestTopic = topic;
      }
    }
  }

  if (bestTopic) {
    return {
      reply: bestTopic.reply,
      navigation: bestTopic.navigation,
      quickReplies: bestTopic.quickReplies || ["Book a Consultation", "Explore Services", "View Pricing & Plans"],
    };
  }

  // ── E. Out-of-Context & Off-Topic Query Detection ──
  const isOutOfContext =
    OUT_OF_CONTEXT_TRIGGERS.some((tr) => query.includes(tr)) ||
    /\d+\s*[\+\-\*\/\^%]\s*\d+/.test(query);

  if (isOutOfContext) {
    return {
      reply: `I specialize strictly as ConverseAI's Enterprise AI Consultant. I'm unable to assist with general knowledge, off-topic, or casual queries (such as recipes, weather, trivia, or general coding).

However, I would be delighted to assist you with anything regarding ConverseAI:
• Human-parity AI Voice Agents (<800ms latency for inbound & outbound customer calls)
• WhatsApp AI Chatbots & WhatsApp Shop catalog automation
• Enterprise CRM & ERP integrations (Salesforce, Zoho, HubSpot, SAP, Tally)
• Client case studies, ROI metrics, transparent pricing, or scheduling a consultation!

Would you like to explore our AI solutions or schedule a consultation?`,
      quickReplies: [
        "What is ConverseAI?",
        "Voice Agents Demo",
        "WhatsApp AI Solutions",
        "Book a Consultation",
      ],
    };
  }

  // ── F. Fallback: Intelligent, helpful enterprise greeting ──
  return {
    reply: `I can help you with anything about ConverseAI! You can ask me:
• What ConverseAI does and who we help
• How we are different from traditional chatbots like Tidio or Intercom
• Our AI Voice Agents, latency, and live call demos
• WhatsApp AI automation and catalog stores
• Enterprise CRM/ERP integrations, pricing, or our Jaipur headquarters
• Or schedule a consultation right here!

How can I assist you today?`,
    quickReplies: [
      "What is ConverseAI?",
      "How are you different from Tidio?",
      "Voice Agents Demo",
      "Where is your team based?",
      "Book a Consultation",
    ],
  };
}
