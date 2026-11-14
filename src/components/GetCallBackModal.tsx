import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/lib/submitContactForm";
import { usePartialLeadCapture } from "@/lib/usePartialLeadCapture";
import PhoneInputField from "@/components/ui/PhoneInputField";
import { trackFormStart, trackFormSuccess } from "@/lib/tracking";
import { PhoneCall, CheckCircle2, MessageSquare, Clock, ArrowRight } from "lucide-react";

const WHATSAPP_NUMBER = "917891331221";
const WHATSAPP_DISPLAY = "+91 78913 31221";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi, I would like to request a call back from ConverseAI."
)}`;

const STORAGE_KEY_DISMISSED = "converse_callback_v2_dismissed";
const STORAGE_KEY_SUBMITTED = "converse_callback_submitted";

export default function GetCallBackModal() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    countryName: "",
    email: "",
    company: "",
    category: "",
    preferredTime: "Immediately (Within 15 mins)",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const capturePartialLead = usePartialLeadCapture("Partial Lead – Get A Call Back Form");
  const hasStartedForm = useRef(false);
  const hasTriggeredScroll = useRef(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { toast } = useToast();

  // Scroll detection: Trigger popup smoothly once user scrolls past the hero banner (~350px)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Clean up old stale dismissed key so it does not block testing
    try {
      sessionStorage.removeItem("converse_callback_dismissed");
    } catch {
      // ignore
    }

    // If already submitted in this browser, do not auto-popup
    if (localStorage.getItem(STORAGE_KEY_SUBMITTED)) return;

    // If dismissed recently in this session (within 5 minutes), do not auto-popup
    const lastDismissed = sessionStorage.getItem(STORAGE_KEY_DISMISSED);
    if (lastDismissed && Date.now() - Number(lastDismissed) < 5 * 60 * 1000) {
      return;
    }

    const handleScroll = () => {
      if (hasTriggeredScroll.current) return;
      const scrollPos = window.scrollY || document.documentElement.scrollTop;

      // Trigger threshold: right after user scrolls past the hero banner (~350px)
      if (scrollPos > 350) {
        hasTriggeredScroll.current = true;
        // Smooth 400ms delay for graceful entrance
        scrollTimerRef.current = setTimeout(() => {
          setOpen(true);
        }, 400);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Also run once in case page loaded already scrolled
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      if (typeof window !== "undefined" && !submitted) {
        sessionStorage.setItem(STORAGE_KEY_DISMISSED, String(Date.now()));
      }
    }
  };

  const handleFormFocus = () => {
    if (hasStartedForm.current) return;
    hasStartedForm.current = true;
    trackFormStart("get_call_back_form", { form_location: "scroll_popup" });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }
    if (!formData.category) {
      newErrors.category = "Please select an option";
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Invalid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const fullMessage = [
        formData.message ? `Requirement: ${formData.message}` : "",
        `Preferred Call Time: ${formData.preferredTime}`,
        formData.company ? `Company: ${formData.company}` : "",
      ]
        .filter(Boolean)
        .join(" | ");

      await submitContactForm({
        fullName: formData.name.trim(),
        email: formData.email.trim() || `lead_${Date.now()}@theconverseai.com`,
        phone: formData.phone.trim(),
        countryName: formData.countryName,
        product: formData.category,
        subject: `Quick Call Back Request — ${formData.category}`,
        message: fullMessage,
        form_source: "Get A Call Back (Scroll Popup)",
        extraFields: {
          companyName: formData.company.trim(),
          preferredCallTime: formData.preferredTime,
          sourceTag: "Quick Call Back",
        },
      });

      setSubmitted(true);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY_SUBMITTED, "true");
      }
      trackFormSuccess("get_call_back_form");
      toast({
        title: "Request Received!",
        description: "Our team will call you shortly. Thank you!",
      });
    } catch {
      toast({
        title: "Submission Error",
        description: "Something went wrong. Please connect with us directly on WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[94vw] max-w-[480px] max-h-[86vh] overflow-y-auto p-0 gap-0 bg-white rounded-2xl shadow-2xl border border-border/80 transition-all duration-500 ease-out animate-in fade-in-0 zoom-in-95">
        {/* Compact Clean Header */}
        <DialogHeader className="px-5 py-3.5 bg-gradient-to-r from-primary/5 via-violet/5 to-transparent border-b border-border/60 text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-foreground tracking-tight leading-tight">
                Get a Call Back
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                Share your details — an AI specialist will call you within 15 minutes.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Compact Form Body */}
        <div className="p-4 sm:p-5">
          {submitted ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Request Received!</h3>
              <p className="text-muted-foreground max-w-xs mx-auto text-xs leading-relaxed">
                Thank you, <span className="font-semibold text-foreground">{formData.name}</span>. An AI specialist will call you at <span className="font-semibold text-foreground">{formData.phone}</span> shortly.
              </p>
              <div className="pt-2">
                <Button
                  onClick={() => setOpen(false)}
                  variant="outline"
                  size="sm"
                  className="rounded-full px-5 text-xs"
                >
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} onFocus={handleFormFocus} className="space-y-3" noValidate>
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-foreground block">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`h-9 text-xs sm:text-sm ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  />
                  {errors.name && <p className="text-[10px] text-destructive leading-tight">{errors.name}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-foreground block">
                    Phone Number <span className="text-destructive">*</span>
                  </label>
                  <PhoneInputField
                    value={formData.phone}
                    onChange={(phone, countryName) =>
                      setFormData({ ...formData, phone, countryName })
                    }
                    error={errors.phone}
                    variant="bordered"
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              {/* Row 2: Email & Company (Optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-foreground block">
                    Work Email <span className="text-muted-foreground font-normal">(Optional)</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onBlur={() =>
                      capturePartialLead(formData.email || formData.phone, {
                        fullName: formData.name,
                        phone: formData.phone,
                        countryName: formData.countryName,
                        product: formData.category,
                      })
                    }
                    className={`h-9 text-xs ${errors.email ? "border-destructive" : ""}`}
                  />
                  {errors.email && <p className="text-[10px] text-destructive leading-tight">{errors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-foreground block">
                    Company Name <span className="text-muted-foreground font-normal">(Optional)</span>
                  </label>
                  <Input
                    placeholder="e.g. Acme Corp"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              {/* Row 3: Interested In & Preferred Call Time (Side by Side!) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-foreground block">
                    Interested In <span className="text-destructive">*</span>
                  </label>
                  <Select
                    value={formData.category}
                    onValueChange={(val) => setFormData({ ...formData, category: val })}
                  >
                    <SelectTrigger className={`h-9 text-xs ${errors.category ? "border-destructive" : ""}`}>
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 text-xs">
                      <SelectGroup>
                        <SelectLabel className="text-[10px] font-bold text-primary uppercase tracking-wider">
                          Products
                        </SelectLabel>
                        <SelectItem value="AI Chatbot for Website" className="text-xs">AI Chatbot for Website</SelectItem>
                        <SelectItem value="WhatsApp Shop & Commerce" className="text-xs">WhatsApp Shop & Commerce</SelectItem>
                        <SelectItem value="WhatsApp Marketing & Broadcast" className="text-xs">WhatsApp Marketing & Broadcast</SelectItem>
                        <SelectItem value="Live Chat & Unified Inbox" className="text-xs">Live Chat & Unified Inbox</SelectItem>
                        <SelectItem value="AI Voice Agents" className="text-xs">AI Voice Agents</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel className="text-[10px] font-bold text-violet uppercase tracking-wider mt-1.5">
                          Agentic AI Services
                        </SelectLabel>
                        <SelectItem value="Custom AI Agent Development" className="text-xs">Custom AI Agent Development</SelectItem>
                        <SelectItem value="Agentic Systems & Automation" className="text-xs">Agentic Systems & Automation</SelectItem>
                        <SelectItem value="AI Integration Services" className="text-xs">AI Integration Services</SelectItem>
                        <SelectItem value="Document & Knowledge Intelligence" className="text-xs">Knowledge Intelligence</SelectItem>
                        <SelectItem value="AI Strategy & Readiness Audit" className="text-xs">AI Strategy & Audit</SelectItem>
                        <SelectItem value="Sales Intelligence & Outreach" className="text-xs">Sales Intelligence</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-[10px] text-destructive leading-tight">{errors.category}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    Call Time
                  </label>
                  <Select
                    value={formData.preferredTime}
                    onValueChange={(val) => setFormData({ ...formData, preferredTime: val })}
                  >
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue placeholder="Call time" />
                    </SelectTrigger>
                    <SelectContent className="text-xs">
                      <SelectItem value="Immediately (Within 15 mins)" className="text-xs">Within 15 mins</SelectItem>
                      <SelectItem value="Morning (10:00 AM - 1:00 PM)" className="text-xs">Morning (10 AM - 1 PM)</SelectItem>
                      <SelectItem value="Afternoon (1:00 PM - 5:00 PM)" className="text-xs">Afternoon (1 PM - 5 PM)</SelectItem>
                      <SelectItem value="Evening (5:00 PM - 8:00 PM)" className="text-xs">Evening (5 PM - 8 PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 4: Message (Optional - Compact) */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-foreground flex items-center gap-1">
                  <MessageSquare className="w-3 h-3 text-muted-foreground" />
                  Your Message / Requirement <span className="text-muted-foreground font-normal">(Optional)</span>
                </label>
                <Textarea
                  placeholder="Tell us a little about your requirement..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={2}
                  className="text-xs min-h-[50px] max-h-[70px] resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-9 text-xs sm:text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 transition-all shadow-sm hover:shadow mt-1"
              >
                {isSubmitting ? "Requesting Call Back..." : "Request a Call Back"}
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>

              {/* Direct WhatsApp Strip — Compact 1-line */}
              <div className="pt-2 border-t border-border/50">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/15 border border-[#25D366]/30 transition-all text-xs group"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <span className="text-[11px] text-muted-foreground">
                      Prefer WhatsApp? <strong className="text-foreground">{WHATSAPP_DISPLAY}</strong>
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#128C7E] group-hover:underline">
                    Chat Now →
                  </span>
                </a>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
