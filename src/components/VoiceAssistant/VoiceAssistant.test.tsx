import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import VoiceAssistant from "./VoiceAssistant";

// Mock scrollIntoView since jsdom doesn't support it
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe("VoiceAssistant UI Component Integration Tests", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  const renderAssistant = () => {
    return render(
      <BrowserRouter>
        <VoiceAssistant />
      </BrowserRouter>
    );
  };

  it("renders the floating launcher button and opens the chat drawer on click", () => {
    renderAssistant();

    // Launcher button exists with aria-label
    const launcher = screen.getByLabelText("Open AI Consultant chat");
    expect(launcher).toBeInTheDocument();

    // Click launcher
    fireEvent.click(launcher);

    // Chat header branding verified
    expect(screen.getAllByText("Converse AI").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Your AI Consultant")).toBeInTheDocument();
    expect(screen.getByText("Enterprise Assistant")).toBeInTheDocument();

    // Initial greeting message verified
    expect(
      screen.getByText(/Hello! I'm Converse AI's Consultant/i)
    ).toBeInTheDocument();
  });

  it("answers 'ConverseAI kya karta hai aur aap kin businesses ki help karte ho?'", async () => {
    renderAssistant();
    fireEvent.click(screen.getByLabelText("Open AI Consultant chat"));

    const input = screen.getByPlaceholderText("Ask a question...");
    fireEvent.change(input, {
      target: { value: "ConverseAI kya karta hai aur aap kin businesses ki help karte ho?" },
    });

    const sendBtn = screen.getByLabelText("Send message");
    fireEvent.click(sendBtn);

    // Advance timers for realistic bot typing delay (700ms)
    act(() => {
      vi.advanceTimersByTime(800);
    });

    expect(
      screen.getByText(/ConverseAI builds, integrates, and operates custom enterprise AI agents/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Healthcare & Clinics/i)).toBeInTheDocument();
    expect(screen.getByText(/BFSI & NBFC Lending/i)).toBeInTheDocument();
  });

  it("answers comparison with traditional chatbots like Tidio or Intercom", async () => {
    renderAssistant();
    fireEvent.click(screen.getByLabelText("Open AI Consultant chat"));

    const input = screen.getByPlaceholderText("Ask a question...");
    fireEvent.change(input, {
      target: { value: "What is ConverseAI, and how is it different from a normal chatbot like Tidio or Intercom?" },
    });

    fireEvent.click(screen.getByLabelText("Send message"));

    act(() => {
      vi.advanceTimersByTime(800);
    });

    expect(
      screen.getByText(/Traditional chatbots \(such as Tidio, Intercom, or basic widget bots\)/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Autonomous Action Execution/i)).toBeInTheDocument();
    expect(screen.getByText(/Human-Parity Voice AI \(<800ms\)/i)).toBeInTheDocument();
  });

  it("answers where the team is based", async () => {
    renderAssistant();
    fireEvent.click(screen.getByLabelText("Open AI Consultant chat"));

    const input = screen.getByPlaceholderText("Ask a question...");
    fireEvent.change(input, {
      target: { value: "Where is your team based?" },
    });

    fireEvent.click(screen.getByLabelText("Send message"));

    act(() => {
      vi.advanceTimersByTime(800);
    });

    expect(
      screen.getByText(/ConverseAI is headquartered in Jaipur, Rajasthan, India/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Madhuban Colony, Barkat Nagar, Tonk Phatak/i)).toBeInTheDocument();
    expect(screen.getByText(/Revti Digital/i)).toBeInTheDocument();
  });

  it("guides user through full conversational step-by-step consultation scheduling", async () => {
    renderAssistant();
    fireEvent.click(screen.getByLabelText("Open AI Consultant chat"));

    const input = screen.getByPlaceholderText("Ask a question...");
    const sendBtn = screen.getByLabelText("Send message");

    // 1. User requests consultation
    fireEvent.change(input, { target: { value: "Book a Consultation" } });
    fireEvent.click(sendBtn);
    act(() => { vi.advanceTimersByTime(800); });

    expect(screen.getByText(/what is your \*\*Full Name\*\*\?/i)).toBeInTheDocument();

    // 2. User enters name
    fireEvent.change(input, { target: { value: "Amit Verma" } });
    fireEvent.click(sendBtn);
    act(() => { vi.advanceTimersByTime(800); });

    expect(screen.getByText(/Work Email/i)).toBeInTheDocument();

    // 3. User enters email
    fireEvent.change(input, { target: { value: "amit@techcorp.in" } });
    fireEvent.click(sendBtn);
    act(() => { vi.advanceTimersByTime(800); });

    expect(screen.getByText(/Phone or WhatsApp number/i)).toBeInTheDocument();

    // 4. User enters phone
    fireEvent.change(input, { target: { value: "9876543210" } });
    fireEvent.click(sendBtn);
    act(() => { vi.advanceTimersByTime(800); });

    expect(screen.getByText(/Which \*\*ConverseAI solution\*\* are you most interested in/i)).toBeInTheDocument();

    // 5. User enters service
    fireEvent.change(input, { target: { value: "AI Voice Agents" } });
    fireEvent.click(sendBtn);
    act(() => { vi.advanceTimersByTime(800); });

    expect(screen.getByText(/What \*\*date and time\*\* works best/i)).toBeInTheDocument();

    // 6. User enters preferred time
    fireEvent.change(input, { target: { value: "Tomorrow at 3 PM" } });
    fireEvent.click(sendBtn);
    act(() => { vi.advanceTimersByTime(800); });

    // Review Summary Card is generated with all details!
    expect(screen.getAllByText(/Consultation Booking Summary/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Amit Verma").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("amit@techcorp.in").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("9876543210").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("AI Voice Agents").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Tomorrow at 3 PM").length).toBeGreaterThanOrEqual(1);

    // Confirm button is present
    expect(screen.getAllByText(/Confirm & Book Consultation/i).length).toBeGreaterThanOrEqual(1);
  });
});
