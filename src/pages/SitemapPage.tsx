import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { 
  Bot, 
  Cpu, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink,
  MessageSquare,
  Phone,
  FileText
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";

interface SitemapLink {
  name: string;
  href: string;
  desc?: string;
  isExternal?: boolean;
}

interface SitemapCategory {
  title: string;
  icon: typeof Bot;
  description: string;
  links: SitemapLink[];
}

const SITEMAP_DATA: SitemapCategory[] = [
  {
    title: "Products",
    icon: Bot,
    description: "Intelligent messaging, customer engagement, and agent productivity software.",
    links: [
      { name: "WhatsApp AI Chatbot", href: "/whatsapp-ai-chatbot", desc: "Automate 80% of WhatsApp inquiries with intelligent generative bots." },
      { name: "WhatsApp Shop", href: "/whatsapp-shop", desc: "Sell products and accept orders natively inside WhatsApp." },
      { name: "WhatsApp Marketing", href: "/whatsapp-marketing", desc: "Broadcasting, drip campaigns, and automated cart abandonment." },
      { name: "Conversational Chatbot", href: "/chatbot", desc: "Custom-trained 24/7 web chatbot for lead generation and FAQs." },
      { name: "Live Chat Platform", href: "/live-chat", desc: "Real-time human agent dashboard with automated routing." },
      { name: "Omni-Channel Inbox", href: "/omni-channel", desc: "Unified inbox connecting Web, WhatsApp, Instagram, and Email." },
      { name: "Pre-Chat Forms", href: "/pre-chat-forms", desc: "Qualify leads with customizable form triggers before chat starts." },
      { name: "Agent Capacity Control", href: "/agent-capacity", desc: "Load balancing and dynamic concurrent chat assignment limits." },
      { name: "Private Internal Notes", href: "/private-notes", desc: "Collaborate seamlessly across teammates inside conversation threads." },
      { name: "Live View Monitoring", href: "/live-view", desc: "Real-time supervisory dashboard for active customer interactions." },
      { name: "Team Management", href: "/teams", desc: "Skill-based department queues and supervisor controls." },
      { name: "Agent Performance Reports", href: "/agent-reports", desc: "Resolution speeds, agent productivity, and activity analytics." },
      { name: "CSAT Reports & Surveys", href: "/csat-report", desc: "Automated post-chat customer satisfaction measurement." },
      { name: "Team Analytics", href: "/team-reports", desc: "Department-level SLA compliance and volume metrics." },
      { name: "Inbox Volume Reports", href: "/inbox-reports", desc: "Peak hour staffing trends and incoming conversation volume." },
    ],
  },
  {
    title: "Services",
    icon: Cpu,
    description: "Enterprise bespoke AI agent builds, voice bots, and systems integration.",
    links: [
      { name: "AI Voice Agents", href: "/services/ai-voice-agents", desc: "Human-sounding inbound & outbound calling bots in Hindi, English & regional languages." },
      { name: "Custom AI Agents", href: "/services/custom-ai-agents", desc: "Bespoke autonomous agents engineered for your specific business logic." },
      { name: "Agentic Process Automation", href: "/services/agentic-automation", desc: "Next-gen multi-agent systems reasoning across your entire software stack." },
      { name: "AI Integration Services", href: "/services/ai-integration", desc: "Bi-directional sync with Salesforce, HubSpot, Zoho, SAP, and custom APIs." },
      { name: "Knowledge Intelligence", href: "/services/knowledge-intelligence", desc: "Enterprise RAG pipelines searching private docs with zero hallucination." },
      { name: "Sales AI Outreach", href: "/services/sales-ai", desc: "Multi-channel automated research, personalized email, and LinkedIn outbound." },
      { name: "All AI Services", href: "/services", desc: "Complete directory of our AI engineering services and capabilities." },
      { name: "AI Strategy & Readiness Audit", href: "/services/ai-strategy-audit", desc: "3-week fixed-fee audit evaluating 5–10 high-ROI automation use cases." },
      { name: "Start Your AI Audit", href: "/services/ai-strategy-audit/start", desc: "48-hour assessment intake for mid-market business teams." },
      { name: "AI Solutions for SMBs", href: "/solutions/ai-for-smb", desc: "Pragmatic, cost-effective AI workflows built for growing companies." },
    ],
  },
  {
    title: "Company",
    icon: Building2,
    description: "About our mission, customer case studies, official blog, and bookings.",
    links: [
      { name: "Home", href: "/", desc: "ConverseAI official homepage — AI agents built & run for your business." },
      { name: "About Us", href: "/about-us", desc: "Our team, vision, and leadership in autonomous customer engagement." },
      { name: "Book a Demo", href: "/book-demo", desc: "Schedule a personalized 1:1 platform walkthrough with solutions team." },
      { name: "Pricing & Plans", href: "/pricing", desc: "Transparent, outcome-aligned pricing tiers built around your volume." },
      { name: "Contact Us", href: "/contact-us", desc: "Get in touch with support, enterprise sales, or billing." },
      { name: "Official Blog", href: "/blog", desc: "Practical guides on agentic AI, voice bots, and automation." },
      { name: "Blog & Insights 2.0", href: "/blog-2", desc: "Deep-dives into generative AI trends, voice, and industry benchmarks." },
      { name: "Case Studies Overview", href: "/case-studies", desc: "Real-world ROI and performance metrics from verified client deployments." },
      { name: "StyleMart India (Retail Automation)", href: "/case-studies/retail-brand-whatsapp-automation", desc: "3× repeat revenue and 65% support savings via WhatsApp AI." },
      { name: "EdTech Lead Gen Chatbot", href: "/case-studies/edtech-startup-chatbot-lead-generation", desc: "2.4× qualification rate and 40% reduction in lead acquisition cost." },
      { name: "Healthcare Clinic Omnichannel", href: "/case-studies/healthcare-clinic-omnichannel-support", desc: "Zero hold times and automated appointment scheduling." },
      { name: "HRTech Interview Agent", href: "/case-studies/hrtech-ai-interview-agent-automation", desc: "Automated candidate screening and structured resume evaluation." },
    ],
  },
  {
    title: "Legal",
    icon: ShieldCheck,
    description: "Privacy policies, enterprise compliance, and legal terms.",
    links: [
      { name: "Terms & Conditions", href: "/terms-and-conditions", desc: "Official service agreements, user obligations, and acceptable usage." },
      { name: "Privacy Policy", href: "/privacy-policy", desc: "How we collect, protect, and process user data under global compliance." },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <Helmet>
        <title>Sitemap | ConverseAI — Complete Website Directory</title>
        <meta
          name="description"
          content="Explore the full directory of ConverseAI pages, products, voice agents, agentic workflows, pricing, and enterprise AI services."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://theconverseai.com/sitemap" />
        <meta property="og:title" content="Sitemap | ConverseAI — Complete Website Directory" />
        <meta
          property="og:description"
          content="Explore the full directory of ConverseAI pages, products, voice agents, agentic workflows, pricing, and enterprise AI services."
        />
        <meta property="og:url" content="https://theconverseai.com/sitemap" />
        <meta property="og:image" content="https://theconverseai.com/og-image.png" />
        <meta name="twitter:image" content="https://theconverseai.com/og-image.png" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background pt-16 md:pt-20">
        <main id="main-content">
          {/* Header */}
          <section className="relative pt-16 pb-12 overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background border-b border-border/40">
            <div className="container-tight text-center">
              <AnimatedSection>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-4 border border-primary/20">
                  <FileText className="w-3.5 h-3.5" />
                  Website Directory
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
                  HTML <span className="gradient-text">Sitemap</span>
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                  Easily find every product, service, customer case study, and enterprise AI solution offered across the ConverseAI platform.
                </p>
              </AnimatedSection>
            </div>
          </section>

          {/* Grouped Sitemap Sections */}
          <section className="py-12 md:py-16">
            <div className="container-tight">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {SITEMAP_DATA.map((category) => {
                  const Icon = category.icon;
                  return (
                    <AnimatedSection key={category.title}>
                      <div className="h-full rounded-2xl border border-border/60 bg-card p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold text-foreground">
                              {category.title}
                            </h2>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-6">
                          {category.description}
                        </p>

                        <ul className="space-y-3.5 divide-y divide-border/40">
                          {category.links.map((link) => (
                            <li key={link.href} className="pt-3.5 first:pt-0">
                              <Link
                                to={link.href}
                                className="group flex items-start justify-between gap-3 text-foreground hover:text-primary transition-colors"
                              >
                                <div>
                                  <span className="font-semibold text-sm sm:text-base group-hover:underline flex items-center gap-1.5">
                                    {link.name}
                                  </span>
                                  {link.desc && (
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-relaxed">
                                      {link.desc}
                                    </p>
                                  )}
                                </div>
                                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-1 shrink-0" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AnimatedSection>
                  );
                })}
              </div>

              {/* Quick XML Sitemap Callout */}
              <div className="mt-12 p-6 rounded-2xl bg-secondary/30 border border-border/60 text-center max-w-xl mx-auto">
                <p className="text-sm text-muted-foreground mb-2">
                  Looking for the machine-readable XML index for search engines?
                </p>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  <span>View Raw XML Sitemap (sitemap.xml)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
