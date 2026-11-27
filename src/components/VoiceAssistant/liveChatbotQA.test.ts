import { describe, it, expect } from "vitest";
import { generateAiraReply, type BookingLead } from "./airaEngine";

describe("Live Chatbot Comprehensive Q&A Quality Test", () => {
  const inContextQuestions = [
    {
      q: "ConverseAI kya karta hai aur aap kin businesses ki help karte ho?",
      mustInclude: ["enterprise AI agents", "Healthcare", "E-Commerce", "BFSI"]
    },
    {
      q: "What is ConverseAI, and how is it different from a normal chatbot like Tidio or Intercom?",
      mustInclude: ["Autonomous Action Execution", "Voice AI (<800ms)", "Warm Human Handoff"]
    },
    {
      q: "Where is your team based? Kya office Jaipur me hai?",
      mustInclude: ["Jaipur", "Madhuban Colony", "Revti Digital"]
    },
    {
      q: "Can I see some case studies or examples of what you have built?",
      mustInclude: ["StyleMart India", "3× repeat revenue", "65% customer support cost savings"]
    },
    {
      q: "Voice agents ki latency kitni hai aur response speed kya hai?",
      mustInclude: ["800ms", "telephony", "streaming latency"]
    },
    {
      q: "Voice agents kaunsi languages support karte hain? Kya Hindi aati hai?",
      mustInclude: ["Hindi", "Hinglish", "Tamil", "German"]
    },
    {
      q: "What are your pricing plans? Kitna kharcha aata hai?",
      mustInclude: ["Engage", "Grow", "Scale", "transparent", "outcome-aligned"]
    },
    {
      q: "What is your contact number and business hours?",
      mustInclude: ["+91-7891331221", "Monday – Saturday", "10:00 AM – 7:00 PM IST"]
    },
    {
      q: "Do you support on-premise private VPC deployment?",
      mustInclude: ["bespoke", "on-premise", "IP"]
    }
  ];

  const outOfContextQuestions = [
    {
      category: "Political Trivia",
      q: "Who is the Prime Minister of India?",
    },
    {
      category: "Cooking / Recipe",
      q: "Give me a recipe for chocolate cake with strawberry frosting",
    },
    {
      category: "General Programming",
      q: "Write a Python script for binary search tree implementation",
    },
    {
      category: "Entertainment / Joke",
      q: "Tell me a funny joke to make me laugh",
    },
    {
      category: "Weather Lookup",
      q: "What is the weather in Delhi today?",
    },
    {
      category: "Raw Math Calculation",
      q: "What is 45 * 25 + 500?",
    },
    {
      category: "Sports Trivia",
      q: "Who won the ICC Cricket World Cup 2023?",
    },
    {
      category: "Creative Writing",
      q: "Write a poem about the monsoon rain",
    }
  ];

  it("should answer all in-context queries with comprehensive, accurate business knowledge", () => {
    for (const test of inContextQuestions) {
      const res = generateAiraReply(test.q);
      for (const expected of test.mustInclude) {
        expect(res.reply.toLowerCase()).toContain(expected.toLowerCase());
      }
      expect(res.quickReplies).toBeDefined();
      expect(res.quickReplies!.length).toBeGreaterThan(0);
    }
  });

  it("should politely and gracefully deflect all out-of-context queries with ConverseAI enterprise focus", () => {
    for (const test of outOfContextQuestions) {
      const res = generateAiraReply(test.q);
      expect(res.reply).toContain("I specialize strictly as ConverseAI's Enterprise AI Consultant");
      expect(res.reply).toContain("AI Voice Agents");
      expect(res.reply).toContain("WhatsApp");
      expect(res.quickReplies).toContain("Voice Agents Demo");
      expect(res.quickReplies).toContain("Book a Consultation");
    }
  });

  it("should complete a multi-turn call scheduling & form filling interaction seamlessly", () => {
    // 1. Initial request
    let state: BookingLead | undefined;
    let res = generateAiraReply("I want to book a consultation for AI voice agents", state);
    expect(res.bookingCard?.step).toBe("awaiting_name");
    state = res.bookingCard;

    // 2. Name
    res = generateAiraReply("Vikram Singhania", state);
    expect(res.bookingCard?.name).toBe("Vikram Singhania");
    expect(res.bookingCard?.step).toBe("awaiting_email");
    state = res.bookingCard;

    // 3. Email
    res = generateAiraReply("vikram@singhanialogistics.com", state);
    expect(res.bookingCard?.email).toBe("vikram@singhanialogistics.com");
    expect(res.bookingCard?.step).toBe("awaiting_phone");
    state = res.bookingCard;

    // 4. Phone
    res = generateAiraReply("+91 9988776655", state);
    expect(res.bookingCard?.phone).toBe("9988776655");
    expect(res.bookingCard?.step).toBe("awaiting_service");
    state = res.bookingCard;

    // 5. Service
    res = generateAiraReply("AI Voice Agents", state);
    expect(res.bookingCard?.service).toBe("AI Voice Agents");
    expect(res.bookingCard?.step).toBe("awaiting_time");
    state = res.bookingCard;

    // 6. Time slot
    res = generateAiraReply("Monday at 11:30 AM", state);
    expect(res.bookingCard?.step).toBe("ready");
    expect(res.bookingCard?.preferredTime).toBe("Monday at 11:30 AM");
    expect(res.reply).toContain("booking summary");
  });
});
