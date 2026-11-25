import { describe, it, expect } from "vitest";
import { generateAiraReply, type BookingLead } from "./airaEngine";

describe("Converse AI Assistant - Knowledge Base & Scheduler Tests", () => {
  // ── 1. In-Context Tests: Core Knowledge & Offerings ──
  it("should answer what ConverseAI does and industries helped", () => {
    const res = generateAiraReply("ConverseAI kya karta hai aur aap kin businesses ki help karte ho?");
    expect(res.reply).toContain("ConverseAI builds, integrates, and operates custom enterprise AI agents");
    expect(res.reply).toContain("Healthcare");
    expect(res.reply).toContain("BFSI");
    expect(res.reply).toContain("E-Commerce");
  });

  it("should explain differences from traditional chatbots like Tidio / Intercom", () => {
    const res = generateAiraReply("What is ConverseAI, and how is it different from a normal chatbot like Tidio or Intercom?");
    expect(res.reply).toContain("Traditional chatbots (such as Tidio, Intercom");
    expect(res.reply).toContain("Autonomous Action Execution");
    expect(res.reply).toContain("Human-Parity Voice AI (<800ms)");
    expect(res.reply).toContain("Warm Human Handoff");
  });

  it("should answer where the team is based", () => {
    const res = generateAiraReply("Where is your team based?");
    expect(res.reply).toContain("Jaipur");
    expect(res.reply).toContain("Madhuban Colony");
    expect(res.reply).toContain("Revti Digital");
  });

  it("should provide case studies and ROI metrics", () => {
    const res = generateAiraReply("Can I see some case studies or examples of what you have built?");
    expect(res.reply).toContain("StyleMart India");
    expect(res.reply).toContain("3× repeat revenue");
    expect(res.navigation?.url).toBe("/case-studies");
  });

  it("should explain multilingual and dialect support (Hindi, Hinglish, regional accents)", () => {
    const res = generateAiraReply("Which languages do your voice agents support? Do you have Hindi and Hinglish?");
    expect(res.reply).toContain("Hindi (pure & conversational)");
    expect(res.reply).toContain("Hinglish");
    expect(res.reply).toContain("Tamil");
  });

  it("should answer queries about Sales AI & autonomous outbound calling", () => {
    const res = generateAiraReply("Can your AI do outbound sales calls and cold calling?");
    expect(res.reply).toContain("Speed-to-Lead (<30s)");
    expect(res.reply).toContain("BANT / MEDDIC Qualification");
    expect(res.reply).toContain("Live Calendar Booking");
  });

  it("should answer queries about Custom AI Agents & on-premise VPC deployments", () => {
    const res = generateAiraReply("Can you build custom AI models for our private VPC on-premise?");
    expect(res.reply).toContain("bespoke, production-grade AI agents");
    expect(res.reply).toContain("Fine-Tuned Domain Models");
    expect(res.reply).toContain("on-premise");
  });

  it("should answer queries about Omnichannel support", () => {
    const res = generateAiraReply("Do you support omnichannel communication across WhatsApp, voice, and web?");
    expect(res.reply).toContain("unified intelligence layer");
    expect(res.reply).toContain("WhatsApp Business API");
    expect(res.reply).toContain("Live Telephony");
  });

  it("should handle greetings and polite salutations warmly", () => {
    const res = generateAiraReply("Hello! Good morning");
    expect(res.reply).toContain("Welcome to ConverseAI");
    expect(res.reply).toContain("Enterprise AI Consultant");
  });

  it("should handle gratitude and sign-offs gracefully", () => {
    const res = generateAiraReply("Thank you so much! Bye");
    expect(res.reply).toContain("You're very welcome");
  });

  // ── 2. Out-of-Context Tests: Polite Domain Deflection ──
  it("should gracefully deflect general knowledge & trivia questions", () => {
    const res = generateAiraReply("What is the capital of France?");
    expect(res.reply).toContain("I specialize strictly as ConverseAI's Enterprise AI Consultant");
    expect(res.reply).toContain("unable to assist with general knowledge, off-topic, or casual queries");
    expect(res.reply).toContain("AI Voice Agents");
  });

  it("should gracefully deflect cooking & recipe questions", () => {
    const res = generateAiraReply("Can you give me a recipe for chocolate cake?");
    expect(res.reply).toContain("I specialize strictly as ConverseAI's Enterprise AI Consultant");
    expect(res.reply).toContain("WhatsApp AI Chatbots");
  });

  it("should gracefully deflect entertainment & joke requests", () => {
    const res = generateAiraReply("Tell me a joke");
    expect(res.reply).toContain("I specialize strictly as ConverseAI's Enterprise AI Consultant");
  });

  it("should gracefully deflect general programming & coding homework", () => {
    const res = generateAiraReply("Write a python script for binary search");
    expect(res.reply).toContain("I specialize strictly as ConverseAI's Enterprise AI Consultant");
    expect(res.reply).toContain("Enterprise CRM & ERP integrations");
  });

  it("should gracefully deflect weather inquiries", () => {
    const res = generateAiraReply("What is the weather today?");
    expect(res.reply).toContain("I specialize strictly as ConverseAI's Enterprise AI Consultant");
  });

  it("should gracefully deflect sports & world cup queries", () => {
    const res = generateAiraReply("Who won the cricket world cup?");
    expect(res.reply).toContain("I specialize strictly as ConverseAI's Enterprise AI Consultant");
  });

  it("should gracefully deflect raw math calculation queries", () => {
    const res = generateAiraReply("2 + 2 = ?");
    expect(res.reply).toContain("I specialize strictly as ConverseAI's Enterprise AI Consultant");
  });

  // ── 3. Conversational Form-Filling & Consultation Scheduling ──
  it("should guide user through step-by-step form filling and call scheduling", () => {
    // 1. User wants to book a consultation
    let lead: BookingLead | undefined;
    let res = generateAiraReply("Book a Consultation", lead);
    expect(res.bookingCard?.step).toBe("awaiting_name");
    expect(res.reply).toContain("Full Name");
    lead = res.bookingCard;

    // 2. User provides name
    res = generateAiraReply("Rahul Sharma", lead);
    expect(res.bookingCard?.name).toBe("Rahul Sharma");
    expect(res.bookingCard?.step).toBe("awaiting_email");
    expect(res.reply).toContain("Work Email");
    lead = res.bookingCard;

    // 3. User provides email
    res = generateAiraReply("rahul@sharmaenterprises.com", lead);
    expect(res.bookingCard?.email).toBe("rahul@sharmaenterprises.com");
    expect(res.bookingCard?.step).toBe("awaiting_phone");
    expect(res.reply).toContain("Phone or WhatsApp number");
    lead = res.bookingCard;

    // 4. User provides phone
    res = generateAiraReply("+91 9876543210", lead);
    expect(res.bookingCard?.phone).toBe("9876543210");
    expect(res.bookingCard?.step).toBe("awaiting_service");
    expect(res.reply).toContain("ConverseAI solution");
    lead = res.bookingCard;

    // 5. User provides service
    res = generateAiraReply("AI Voice Agents", lead);
    expect(res.bookingCard?.service).toBe("AI Voice Agents");
    expect(res.bookingCard?.step).toBe("awaiting_time");
    expect(res.reply).toContain("date and time");
    lead = res.bookingCard;

    // 6. User provides preferred time
    res = generateAiraReply("Tomorrow at 3 PM", lead);
    expect(res.bookingCard?.step).toBe("ready");
    expect(res.bookingCard?.preferredTime).toBe("Tomorrow at 3 PM");
    expect(res.bookingCard?.name).toBe("Rahul Sharma");
    expect(res.bookingCard?.email).toBe("rahul@sharmaenterprises.com");
    expect(res.bookingCard?.phone).toBe("9876543210");
    expect(res.bookingCard?.service).toBe("AI Voice Agents");
    expect(res.reply).toContain("review your booking summary");
  });

  it("should support single-shot multi-entity extraction", () => {
    const res = generateAiraReply("Hi, my name is Priya Patel, email priya@fintech.io, phone 9876543210, interested in WhatsApp AI Chatbot for next Monday 11am");
    expect(res.bookingCard).toBeDefined();
    expect(res.bookingCard?.step).toBe("ready");
    expect(res.bookingCard?.name).toBe("Priya Patel");
    expect(res.bookingCard?.email).toBe("priya@fintech.io");
    expect(res.bookingCard?.phone).toBe("9876543210");
    expect(res.bookingCard?.service).toBe("WhatsApp AI Chatbot");
  });
});
