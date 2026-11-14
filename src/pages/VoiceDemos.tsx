import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Calendar,
  Headphones,
  Sparkles,
  PhoneCall,
  ExternalLink,
  CheckCircle2,
  Globe,
  Radio,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VoiceCallModal, { AgentType } from "@/components/VoiceCallModal";

export default function VoiceDemos() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentType>("appointment");

  const openCallModal = (agent: AgentType) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  const THREE_AGENTS = [
    {
      id: "appointment" as AgentType,
      title: "Appointment Booking",
      badge: "Scheduler",
      tagline: "Turn customer calls into instant bookings, reschedules, and confirmations with an AI voice agent.",
      description: "Speaks naturally to check doctor/consultant availability, confirm dates, manage cancellations, and send WhatsApp calendar invites.",
      iconBg: "bg-blue-50 border-blue-200 text-blue-600",
      accentBorder: "hover:border-blue-500",
      stats: "⚡ 92% First-Call Booking Rate",
      avatar: "📅",
      color: "blue",
      sampleQueries: ["Book appointment for tomorrow", "What slots are available this week?", "Reschedule my booking"],
    },
    {
      id: "support" as AgentType,
      title: "Customer Support",
      badge: "Tier-1 Help Desk",
      tagline: "Instant 24/7 resolution for order tracking, refund status, complaints, and Tier-1 FAQs.",
      description: "Handles repetitive customer enquiries with zero wait times. Answers order tracking, returns, and gracefully transfers complex calls to humans.",
      iconBg: "bg-emerald-50 border-emerald-200 text-emerald-600",
      accentBorder: "hover:border-emerald-500",
      stats: "🎯 Zero Hold Times &bull; 24/7 Resolution",
      avatar: "🎧",
      color: "emerald",
      sampleQueries: ["Where is my order #7742?", "How do I request a refund?", "Transfer me to a live agent"],
    },
    {
      id: "services" as AgentType,
      title: "Services & Products",
      badge: "Solutions Advisor",
      tagline: "An AI advisor that explains your products, pricing, and services to convert warm inquiries.",
      description: "Answers customer questions about ConverseAI Voice Agents, WhatsApp Chatbots, and custom agentic workflows with low latency.",
      iconBg: "bg-violet-50 border-violet-200 text-violet-600",
      accentBorder: "hover:border-violet-500",
      stats: "🚀 3.8x More Warm Sales Meetings",
      avatar: "⚡",
      color: "violet",
      sampleQueries: ["What AI agents do you build?", "What is the voice latency?", "Tell me about WhatsApp Bots"],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Interactive Voice AI Demos — Real-Time Agent Calls | ConverseAI</title>
        <meta
          name="description"
          content="Test our real-time AI Voice Agents for appointment booking, customer support, and product inquiries. Interactive two-way voice call with distinct Hindi, UK, US, and European accents."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://theconverseai.com/voice-demos" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-slate-50 text-slate-900 pt-28 pb-20 selection:bg-violet-100 selection:text-violet-900">
        
        {/* ── HERO SECTION ── */}
        <section className="container max-w-5xl mx-auto px-4 sm:px-6 mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100/80 border border-violet-200 text-violet-700 text-xs font-semibold mb-5 shadow-sm">
            <Radio className="w-3.5 h-3.5 text-violet-600 animate-pulse" />
            <span>Interactive 2-Way Voice Call &bull; Real-Time Speech Recognition</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 max-w-3xl mx-auto leading-tight">
            Talk to Our <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">AI Voice Agents</span> in Real-Time
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Sarvam-style interactive voice demos. Click on any agent below to launch a live voice call in a popup. Speak with your mic or select quick questions in <strong>Hindi, UK English, US English, and European Spanish</strong> accents!
          </p>

          {/* Quick CTA to start call immediately */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => openCallModal("appointment")}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-lg shadow-violet-600/30 transition-all hover:scale-105"
            >
              <PhoneCall className="w-4 h-4 text-emerald-300" />
              <span>Start Interactive Voice Call (Popup) 🎙️</span>
            </button>

            <a
              href="https://sonara-voice-agent.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm shadow-sm transition-all"
            >
              <span>Full-Duplex Sonara Engine</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </section>

        {/* ── 3 DEDICATED SARVAM-STYLE USE CASE CARDS ── */}
        <section className="container max-w-5xl mx-auto px-4 sm:px-6 mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Select a Voice Agent to Test
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Clicking any card opens the interactive 2-way call popup with distinct accents.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-200 text-slate-700">
              3 Production Agents
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {THREE_AGENTS.map((agent) => (
              <div
                key={agent.id}
                onClick={() => openCallModal(agent.id)}
                className={`group relative rounded-2xl p-6 bg-white border border-slate-200 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-xl hover:scale-[1.02] flex flex-col justify-between ${agent.accentBorder}`}
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border text-2xl ${agent.iconBg}`}>
                      {agent.avatar}
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-violet-100 group-hover:text-violet-700 transition-colors">
                      {agent.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-violet-700 transition-colors">
                    {agent.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-slate-800 leading-snug mb-3">
                    {agent.tagline}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {agent.description}
                  </p>

                  {/* Sample topics */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Sample Questions:
                    </p>
                    <ul className="space-y-1">
                      {agent.sampleQueries.map((q, i) => (
                        <li key={i} className="text-xs text-slate-600 truncate flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-violet-400" />
                          <span>"{q}"</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Button to open popup */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-500">{agent.stats}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openCallModal(agent.id);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs shadow-sm transition-all"
                  >
                    <PhoneCall className="w-3 h-3" />
                    <span>Talk in Popup ↗</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ACCENT & INTELLIGENCE HIGHLIGHTS ── */}
        <section className="container max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5 text-violet-600" />
              <span>Authentic Regional Accents & Polite Off-Topic Fallback</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
              In Sarvam AI style, each voice agent adapts to the caller's chosen dialect and language. If asked an off-topic or irrelevant question (like cricket, politics, or recipes), the agent politely clarifies that it only handles that specific business task!
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-2xl mb-1 block">🇮🇳</span>
                <span className="text-xs font-bold text-slate-900 block">Hindi (हिंदी)</span>
                <span className="text-[11px] text-slate-500">Natural Indian Cadence</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-2xl mb-1 block">🇬🇧</span>
                <span className="text-xs font-bold text-slate-900 block">UK English</span>
                <span className="text-[11px] text-slate-500">British Received Pronunciation</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-2xl mb-1 block">🇺🇸</span>
                <span className="text-xs font-bold text-slate-900 block">US English</span>
                <span className="text-[11px] text-slate-500">American Conversational</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-2xl mb-1 block">🇪🇸</span>
                <span className="text-xs font-bold text-slate-900 block">Spanish</span>
                <span className="text-[11px] text-slate-500">European Castilian Accent</span>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      {/* ── THE INTERACTIVE 2-WAY VOICE CALL POPUP MODAL ── */}
      <VoiceCallModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialAgent={selectedAgent}
      />
    </>
  );
}
