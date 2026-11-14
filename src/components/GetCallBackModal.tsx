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

const STORAGE_KEY_DISMISSED = "converse_callback_dismissed";
const STORAGE_KEY_SUBMITTED = "converse_callback_submitted";

export default function GetCallBackModal() {
  const [open, setOpen] = useState(false);
  const [showFloatingPill, setShowFloatingPill] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    countryName: "",
    email: "",
    company: "",
    category: "",
    preferredTime: "Immediately / Within 15 mins",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const capturePartialLead = usePartialLeadCapture("Partial Lead – Get A Call Back Form");
  const hasStartedForm = useRef(false);
  const hasTriggeredScroll = useRef(false);
  const { toast } = useToast();

  // Scroll detection: Trigger popup once user scrolls past hero banner (~450px)
  useEffect(() => {
    // If already submitted in localStorage, do not auto-pop
    if (typeof window !== "undefined") {
      if (localStorage.getItem(STORAGE_KEY_SUBMITTED)) {
        return;
      }
      if (sessionStorage.getItem(STORAGE_KEY_DISMISSED)) {
        // User previously closed it in this session: show subtle floating pill instead
        setShowFloatingPill(true);
        return;
      }
    }

    const handleScroll = () => {
      if (hasTriggeredScroll.current) return;
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      if (scrollPos > 450) {
        hasTriggeredScroll.current = true;
        // Small graceful delay so it doesn't abruptly flash
        setTimeout(() => {
          setOpen(true);
          setShowFloatingPill(true);
        }, 500);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Custom listener so banner or any other button can open this modal
  useEffect(() => {
    const handleOpenModal = () => {
      setOpen(true);
      setShowFloatingPill(true);
    };
    window.addEventListener("open-callback-modal", handleOpenModal);
    return () => window.removeEventListener("open-callback-modal", handleOpenModal);
  }, []);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      // Mark as dismissed in sessionStorage so it doesn't auto-pop again on every scroll
      if (typeof window !== "undefined" && !submitted) {
        sessionStorage.setItem(STORAGE_KEY_DISMISSED, "true");
        setShowFloatingPill(true);
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
      newErrors.name = "Please enter your name";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    }
    if (!formData.category) {
      newErrors.category = "Please select a product or service";
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
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

      const result = await submitContactForm({
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

      if (result.success) {
        setSubmitted(true);
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY_SUBMITTED, "true");
        }
        trackFormSuccess("get_call_back_form");
        toast({
          title: "Request Received!",
          description: "Our team will call you shortly. Thank you!",
        });
      } else {
        throw new Error(result.error || "Failed to submit");
      }
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
    <>
      {/* Floating Pill Button — stays visible if user closed without filling */}
      {showFloatingPill && !open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-20 right-6 z-40 hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-xs shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          title="Request a Call Back from ConverseAI"
          aria-label="Request a Call Back"
        >
          <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
          <span>Request a Call Back</span>
        </button>
      )}

      {/* Main Call Back Dialog */}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[560px] max-h-[92vh] overflow-y-auto p-0 gap-0 bg-white rounded-2xl shadow-2xl border border-border/80">
          {/* Header */}
          <DialogHeader className="p-6 pb-4 bg-gradient-to-br from-primary/5 via-violet/5 to-transparent border-b border-border/60">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <PhoneCall className="w-3.5 h-3.5" />
                Quick Response Team
              </span>
            </div>
            <DialogTitle className="text-2xl font-bold text-foreground tracking-tight">
              Get a Call Back
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-1">
              Share your contact details — an AI specialist from ConverseAI will call you back within 15 minutes.
            </DialogDescription>
          </DialogHeader>

          {/* Body */}
          <div className="p-6">
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Request Received!</h3>
                <p className="text-muted-foreground max-w-sm mx-auto text-sm leading-relaxed">
                  Thank you, <span className="font-semibold text-foreground">{formData.name}</span>. Our specialist is reviewing your interest in <span className="font-semibold text-foreground">{formData.category}</span> and will call you at <span className="font-semibold text-foreground">{formData.phone}</span> shortly.
                </p>
                <div className="pt-2">
                  <Button
                    onClick={() => setOpen(false)}
                    variant="outline"
                    className="rounded-full px-6"
                  >
                    Close
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} onFocus={handleFormFocus} className="space-y-4" noValidate>
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`h-10 text-sm ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    />
                    {errors.name && <p className="text-[11px] text-destructive">{errors.name}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">
                      Phone Number <span className="text-destructive">*</span>
                    </label>
                    <PhoneInputField
                      value={formData.phone}
                      onChange={(phone, countryName) =>
                        setFormData({ ...formData, phone, countryName })
                      }
                      error={errors.phone}
                      variant="bordered"
                      className="h-10"
                    />
                  </div>
                </div>

                {/* Email & Company (Optional) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">
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
                      className={`h-10 text-sm ${errors.email ? "border-destructive" : ""}`}
                    />
                    {errors.email && <p className="text-[11px] text-destructive">{errors.email}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">
                      Company Name <span className="text-muted-foreground font-normal">(Optional)</span>
                    </label>
                    <Input
                      placeholder="e.g. Acme Corp"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="h-10 text-sm"
                    />
                  </div>
                </div>

                {/* Category (Products & Services Grouped Dropdown) */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">
                    Interested In <span className="text-destructive">*</span>
                  </label>
                  <Select
                    value={formData.category}
                    onValueChange={(val) => setFormData({ ...formData, category: val })}
                  >
                    <SelectTrigger className={`h-10 text-sm ${errors.category ? "border-destructive" : ""}`}>
                      <SelectValue placeholder="Select a Product or Agentic Service" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      <SelectGroup>
                        <SelectLabel className="text-xs font-bold text-primary uppercase tracking-wider">
                          Products
                        </SelectLabel>
                        <SelectItem value="AI Chatbot for Website">AI Chatbot for Website</SelectItem>
                        <SelectItem value="WhatsApp Shop & Commerce">WhatsApp Shop & Commerce</SelectItem>
                        <SelectItem value="WhatsApp Marketing & Broadcast">WhatsApp Marketing & Broadcast</SelectItem>
                        <SelectItem value="Live Chat & Unified Inbox">Live Chat & Unified Inbox</SelectItem>
                        <SelectItem value="AI Voice Agents">AI Voice Agents</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel className="text-xs font-bold text-violet uppercase tracking-wider mt-2">
                          Agentic AI Services
                        </SelectLabel>
                        <SelectItem value="Custom AI Agent Development">Custom AI Agent Development</SelectItem>
                        <SelectItem value="Agentic Systems & Process Automation">Agentic Systems & Automation</SelectItem>
                        <SelectItem value="AI Integration Services">AI Integration Services</SelectItem>
                        <SelectItem value="Document & Knowledge Intelligence">Document & Knowledge Intelligence</SelectItem>
                        <SelectItem value="AI Strategy & Readiness Audit">AI Strategy & Readiness Audit</SelectItem>
                        <SelectItem value="Sales Intelligence & Outreach">Sales Intelligence & Outreach</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-[11px] text-destructive">{errors.category}</p>}
                </div>

                {/* Preferred Call Time */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                    Best Time to Call
                  </label>
                  <Select
                    value={formData.preferredTime}
                    onValueChange={(val) => setFormData({ ...formData, preferredTime: val })}
                  >
                    <SelectTrigger className="h-10 text-sm">
                      <SelectValue placeholder="Select preferred time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Immediately / Within 15 mins">Immediately / Within 15 mins</SelectItem>
                      <SelectItem value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</SelectItem>
                      <SelectItem value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</SelectItem>
                      <SelectItem value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message (Optional) */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-muted-foreground" />
                    Your Message / Requirement <span className="text-muted-foreground font-normal">(Optional)</span>
                  </label>
                  <Textarea
                    placeholder="Tell us a little about what you are looking to automate or build..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={2}
                    className="text-sm resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 transition-all shadow-md hover:shadow-lg mt-2"
                >
                  {isSubmitting ? "Requesting Call Back..." : "Request a Call Back"}
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>

                {/* WhatsApp Alternative Strip */}
                <div className="pt-2 border-t border-border/60">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/15 border border-[#25D366]/30 transition-all text-xs group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </div>
                      <div>
                        <span className="font-semibold text-foreground block">Prefer WhatsApp?</span>
                        <span className="text-[11px] text-muted-foreground">Chat with us on {WHATSAPP_DISPLAY}</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#128C7E] group-hover:underline">
                      Chat Now →
                    </span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
