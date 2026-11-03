import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView, trackPricingView, trackServiceView } from "@/lib/tracking";

// Mapping of service routes to clean service names for GA4 & Looker Studio reporting
const SERVICE_ROUTE_MAP: Record<string, string> = {
  "/services/ai-voice-agents": "AI Voice Agents",
  "/services/agentic-automation": "Agentic Automation",
  "/services/ai-integration": "AI Integration",
  "/services/custom-ai-agents": "Custom AI Agents",
  "/services/knowledge-intelligence": "Knowledge Intelligence (RAG)",
  "/services/sales-ai": "Sales AI",
  "/services/ai-strategy-audit": "AI Strategy Audit",
  "/services/ai-strategy-audit/start": "AI Audit Intake",
  "/whatsapp-ai-chatbot": "WhatsApp AI Chatbot",
  "/whatsapp-shop": "WhatsApp Shop",
  "/whatsapp-marketing": "WhatsApp Marketing",
  "/chatbot": "AI Chatbot",
  "/live-chat": "Live Chat Omnichannel",
  "/omni-channel": "Omnichannel Platform",
  "/solutions/ai-for-smb": "AI for SMB",
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    trackPageView(pathname, document.title);

    // Track pricing view
    if (pathname === "/pricing" || pathname.startsWith("/pricing")) {
      trackPricingView({ page_path: pathname });
    }

    // Track specific service views for granular service analytics in Looker Studio
    if (SERVICE_ROUTE_MAP[pathname]) {
      trackServiceView(SERVICE_ROUTE_MAP[pathname], { page_path: pathname });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
