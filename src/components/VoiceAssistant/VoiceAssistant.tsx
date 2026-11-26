import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Bot,
  Loader2,
  Sparkles,
} from "lucide-react";
import { generateAiraReply, type AiraResponse, type BookingLead } from "./airaEngine";
import { submitContactForm } from "@/lib/submitContactForm";
import { Button } from "@/components/ui/button";

interface BookingCardData extends BookingLead {
  status: "idle" | "submitting" | "confirmed";
}

interface Message {
  id: string;
  sender: "user" | "aira";
  text: string;
  timestamp: string;
  navigation?: AiraResponse["navigation"];
  bookingCard?: BookingCardData;
  quickReplies?: string[];
}

export default function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeLead, setActiveLead] = useState<BookingLead | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-1",
      sender: "aira",
      text: "Hello! I'm Converse AI's Consultant. How can I help you automate and scale your customer engagement today?",
      timestamp: "Just now",
      quickReplies: [
        "Voice Agents Demo",
        "Case Studies & ROI",
        "Book a Consultation",
        "View Pricing & Plans",
      ],
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  const handleBookingConfirm = async (messageId: string, lead: BookingCardData) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId && m.bookingCard
          ? { ...m, bookingCard: { ...m.bookingCard, status: "submitting" } }
          : m
      )
    );

    try {
      await submitContactForm({
        fullName: lead.name || "Converse AI Web Visitor",
        email: lead.email || "consultation@theconverseai.com",
        phone: lead.phone || "+919982323333",
        product: lead.service || "AI Voice Agents",
        subject: "Direct In-Chat Booking via Converse AI Assistant",
        message: lead.message || `Booked through Converse AI Conversational Consultant on site.${lead.preferredTime ? ` Preferred Slot: ${lead.preferredTime}` : ""}`,
        form_source: "Converse AI In-Chat Booking",
        extraFields: {
          preferred_time: lead.preferredTime || "Flexible",
          booking_channel: "Chatbot Interactive Scheduler",
        },
      });

      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId && m.bookingCard
            ? { ...m, bookingCard: { ...m.bookingCard, status: "confirmed" } }
            : m
        )
      );

      // Clear active lead state so subsequent new leads don't inherit previous user's data
      setActiveLead(undefined);

      // Add a confirmation message with follow-up options
      const confirmationMsg: Message = {
        id: `aira-${Date.now()}`,
        sender: "aira",
        text: `Great news ${lead.name ? lead.name : ""}! Your consultation for ${lead.service} has been successfully scheduled${lead.preferredTime ? ` for ${lead.preferredTime}` : ""}. Our solutions engineering team will reach out to you via ${lead.email || lead.phone || "your contact details"} with the meeting invite and link.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        quickReplies: ["Voice Agents Demo", "Explore Case Studies", "View Pricing & Plans"],
      };
      setMessages((prev) => [...prev, confirmationMsg]);
    } catch {
      // Fallback: route directly to book-demo page with prefilled parameters
      const params = new URLSearchParams();
      if (lead.service) params.set("service", lead.service);
      if (lead.name) params.set("name", lead.name);
      if (lead.email) params.set("email", lead.email);
      if (lead.phone) params.set("phone", lead.phone);
      if (lead.preferredTime) params.set("preferred_time", lead.preferredTime);
      navigate(`/book-demo?${params.toString()}`);
      setIsOpen(false);
    }
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const trimmedLower = query.trim().toLowerCase();

    // If user clicked or typed "Confirm Consultation", execute booking on the active pending card
    if (trimmedLower === "confirm consultation" || trimmedLower === "confirm & book consultation") {
      const pendingMsg = [...messages].reverse().find((m) => m.bookingCard && m.bookingCard.status === "idle");
      if (pendingMsg && pendingMsg.bookingCard) {
        const userMsg: Message = {
          id: `user-${Date.now()}`,
          sender: "user",
          text: query,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, userMsg]);
        if (!textToSend) setInput("");
        handleBookingConfirm(pendingMsg.id, pendingMsg.bookingCard);
        return;
      }
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    // Realistic typing delay with 3-dots animation
    setTimeout(() => {
      const response = generateAiraReply(query, activeLead);

      if (response.bookingCard) {
        setActiveLead(response.bookingCard);
      }

      const botMessage: Message = {
        id: `aira-${Date.now()}`,
        sender: "aira",
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        navigation: response.navigation,
        bookingCard: response.bookingCard
          ? { ...response.bookingCard, status: "idle" }
          : undefined,
        quickReplies: response.quickReplies,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 700);
  };

  const handleNavigate = (url: string) => {
    setIsOpen(false);
    navigate(url);
  };

  return (
    <>
      {/* ── Floating Launcher Button (Matches User Reference Image) ── */}
      <div className="fixed bottom-5 sm:bottom-6 right-5 sm:right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white flex items-center justify-center shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 transition-all duration-300 border-2 border-white/20 focus:outline-none focus:ring-4 focus:ring-purple-400/30"
          aria-label={isOpen ? "Close AI Consultant chat" : "Open AI Consultant chat"}
        >
          {/* Top-Right Online Status Badge with Translucent Halo */}
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center pointer-events-none">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/40 animate-ping" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#10B981] border-2 border-white shadow-xs" />
          </span>

          {isOpen ? (
            <X className="w-6 h-6 text-white stroke-[2.3]" />
          ) : (
            /* Crisp Chat Bubble Icon matching reference picture */
            <svg
              className="w-6 h-6 text-white ml-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </motion.button>
      </div>

      {/* ── Premium Chat Window / Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="fixed bottom-[76px] sm:bottom-[86px] right-3 sm:right-6 w-[calc(100vw-24px)] sm:w-[400px] h-[min(530px,calc(100dvh-100px))] max-h-[calc(100dvh-100px)] z-50 rounded-2xl bg-card border border-border/80 shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#7C3AED] via-[#6D28D9] to-[#7C3AED] text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-sm border border-white/30 shadow-inner">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#10B981] border-2 border-[#7C3AED]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-white text-sm">Converse AI</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-medium">
                      Your AI Consultant
                    </span>
                  </div>
                  <p className="text-[11px] text-white/80 flex items-center gap-1 font-normal">
                    Enterprise Assistant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs sm:text-sm bg-gradient-to-b from-secondary/20 to-background">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  {/* Sender label for bot */}
                  {msg.sender === "aira" && (
                    <div className="flex items-center gap-1.5 mb-1 pl-1">
                      <span className="text-[11px] font-semibold text-primary">Converse AI</span>
                      <span className="text-[10px] text-muted-foreground/70">{msg.timestamp}</span>
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#7C3AED] text-white rounded-tr-xs"
                        : "bg-card text-foreground border border-border/70 rounded-tl-xs"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* User timestamp */}
                  {msg.sender === "user" && (
                    <span className="text-[10px] text-muted-foreground/60 mt-1 pr-1">
                      {msg.timestamp}
                    </span>
                  )}

                  {/* Navigation Action CTA Button */}
                  {msg.navigation && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2"
                    >
                      <button
                        type="button"
                        onClick={() => handleNavigate(msg.navigation!.url)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-semibold text-xs border border-primary/25 transition-all shadow-xs"
                      >
                        {msg.navigation.label}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  )}

                  {/* Direct In-Chat Booking Summary Review Card */}
                  {msg.bookingCard && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-2.5 w-full max-w-[92%] p-3.5 rounded-xl border border-primary/30 bg-primary/5 shadow-sm"
                    >
                      <div className="flex items-center gap-1.5 mb-2 text-primary font-bold text-xs uppercase tracking-wide">
                        <Calendar className="w-3.5 h-3.5" /> Consultation Booking Summary
                      </div>

                      <div className="space-y-1.5 text-xs text-muted-foreground mb-3 bg-card p-2.5 rounded-lg border border-border/50">
                        {msg.bookingCard.name && (
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-foreground">Name:</span>
                            <span className="text-foreground">{msg.bookingCard.name}</span>
                          </div>
                        )}
                        {msg.bookingCard.email && (
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-foreground">Email:</span>
                            <span className="text-foreground">{msg.bookingCard.email}</span>
                          </div>
                        )}
                        {msg.bookingCard.phone && (
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-foreground">Phone:</span>
                            <span className="text-foreground">{msg.bookingCard.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-foreground">Service:</span>
                          <span className="text-primary font-semibold">{msg.bookingCard.service}</span>
                        </div>
                        {msg.bookingCard.preferredTime && (
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-foreground">Preferred Slot:</span>
                            <span className="text-foreground font-medium">{msg.bookingCard.preferredTime}</span>
                          </div>
                        )}
                      </div>

                      {msg.bookingCard.status === "confirmed" ? (
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/10 text-emerald-600 font-semibold text-xs border border-emerald-500/20">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>Booking Confirmed! Our solutions engineer will contact you shortly.</span>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          disabled={msg.bookingCard.status === "submitting"}
                          onClick={() => handleBookingConfirm(msg.id, msg.bookingCard!)}
                          className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs h-8 rounded-lg shadow-sm"
                        >
                          {msg.bookingCard.status === "submitting" ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                              Confirming...
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                              Confirm &amp; Book Consultation
                            </>
                          )}
                        </Button>
                      )}
                    </motion.div>
                  )}

                  {/* Quick Reply Chips */}
                  {msg.quickReplies && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {msg.quickReplies.map((chip) => (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => handleSend(chip)}
                          className="px-3 py-1.5 rounded-full bg-card hover:bg-primary/10 hover:text-primary text-muted-foreground text-[11px] font-medium border border-border/80 transition-colors shadow-2xs"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* 3-Dots Animated Typing Loading Bubble */}
              {isTyping && (
                <div className="flex items-start gap-2 max-w-[85%] animate-fadeIn">
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 border border-primary/20">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-card text-foreground border border-border/70 rounded-2xl rounded-tl-xs px-4 py-3 shadow-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary/70 animate-bounce [animation-delay:-0.32s]" />
                    <span className="w-2 h-2 rounded-full bg-primary/70 animate-bounce [animation-delay:-0.16s]" />
                    <span className="w-2 h-2 rounded-full bg-primary/70 animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-card border-t border-border/80">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 h-10 px-3.5 text-xs sm:text-sm rounded-xl bg-secondary/50 border border-border/80 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground/70"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-40 text-white flex items-center justify-center transition-all shrink-0 shadow-sm"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
