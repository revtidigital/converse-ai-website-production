import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { validateContactForm } from "@/lib/validations/contact";
import { submitContactForm } from "@/lib/submitContactForm";
import { usePartialLeadCapture } from "@/lib/usePartialLeadCapture";
import PhoneInputField from "@/components/ui/PhoneInputField";
import {
  trackFormError,
  trackFormStart,
  trackFormSubmitClick,
  trackFormSuccess,
  trackFormView,
  trackDemoBooked,
} from "@/lib/tracking";

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
}

const BookDemoModal = ({ isOpen, onClose, initialPlan = "Grow" }: BookDemoModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryName: "",
    plan: initialPlan,
    message: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const capturePartialLead = usePartialLeadCapture("Partial Lead – Pricing Demo Modal");
  const hasStartedForm = useRef(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialPlan) {
      setFormData((prev) => ({ ...prev, plan: initialPlan }));
    }
  }, [initialPlan]);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      hasStartedForm.current = false;
      trackFormView("pricing_demo_modal", { form_location: "pricing_page_modal", plan: formData.plan });
    } else {
      onClose();
    }
  };

  const trackFormStartHandler = () => {
    if (hasStartedForm.current) return;
    hasStartedForm.current = true;
    trackFormStart("pricing_demo_modal", { form_location: "pricing_page_modal", plan: formData.plan });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trackFormSubmitClick("pricing_demo_modal", { form_location: "pricing_page_modal", plan: formData.plan });
    setErrors({});

    const validation = validateContactForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      product: formData.plan,
      subject: `Pricing Demo Request (${formData.plan} Plan)`,
      message: formData.message,
      agreeToTerms: formData.agreeToTerms,
    });

    if (!validation.success) {
      setErrors(validation.errors);
      trackFormError("pricing_demo_modal", Object.values(validation.errors)[0] || "validation_error", {
        form_location: "pricing_page_modal",
      });
      toast({
        title: "Please fix the errors",
        description: Object.values(validation.errors)[0],
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await submitContactForm({
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        countryName: formData.countryName,
        product: `${formData.plan} Plan (Pricing Page)`,
        subject: `Pricing Demo Request: ${formData.plan} Plan`,
        message: formData.message || `Demo request for ${formData.plan} plan from the Pricing page.`,
        form_source: "Pricing Page Demo Modal",
      });

      trackFormSuccess("pricing_demo_modal", { form_location: "pricing_page_modal", plan: formData.plan });
      trackDemoBooked({
        form_location: "pricing_page_modal",
        product: formData.plan,
        country: formData.countryName,
      });

      toast({
        title: "Demo Request Received!",
        description: "Our AI solutions team will connect with you within 24 hours.",
      });

      onClose();
      navigate("/thank-you");
    } catch {
      trackFormError("pricing_demo_modal", "submission_failed", { form_location: "pricing_page_modal" });
      toast({
        title: "Failed to book demo",
        description: "Please try again or contact us via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[560px] bg-white p-0 gap-0 overflow-hidden rounded-2xl shadow-2xl border border-gray-150">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-b from-[#9d00ff]/5 to-transparent">
          <DialogTitle className="text-2xl font-bold text-gray-900 tracking-tight">
            Book a Live Demo
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 mt-1">
            See how ConverseAI voice and conversational agents work for your business. Selected plan:{" "}
            <span className="font-semibold text-[#9d00ff]">{formData.plan}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} onFocus={trackFormStartHandler} className="px-6 pb-6 space-y-4" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label htmlFor="modal-name" className="text-xs font-semibold text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="modal-name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                maxLength={100}
                className={`rounded-xl border ${errors.name ? "border-destructive" : "border-gray-200"}`}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="modal-email" className="text-xs font-semibold text-gray-700">
                Work Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="modal-email"
                type="email"
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onBlur={() =>
                  capturePartialLead(formData.email, {
                    fullName: formData.name,
                    phone: formData.phone,
                    countryName: formData.countryName,
                    product: `${formData.plan} Plan`,
                  })
                }
                maxLength={255}
                className={`rounded-xl border ${errors.email ? "border-destructive" : "border-gray-200"}`}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <PhoneInputField
                value={formData.phone}
                onChange={(phone, countryName) =>
                  setFormData({ ...formData, phone, countryName })
                }
                error={errors.phone}
                variant="bordered"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="modal-plan" className="text-xs font-semibold text-gray-700">
                Interested Plan
              </label>
              <Select
                value={formData.plan}
                onValueChange={(val) => setFormData({ ...formData, plan: val })}
              >
                <SelectTrigger id="modal-plan" className="rounded-xl border border-gray-200">
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  <SelectItem value="Engage">Engage (Starter)</SelectItem>
                  <SelectItem value="Grow">Grow (Most Popular)</SelectItem>
                  <SelectItem value="Scale">Scale (Enterprise)</SelectItem>
                  <SelectItem value="Custom">Custom AI Audit & Build</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="modal-message" className="text-xs font-semibold text-gray-700">
              Tell us about your use case (Optional)
            </label>
            <Textarea
              id="modal-message"
              placeholder="e.g. Inbound voice agent for customer support and WhatsApp catalog chatbot..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
              maxLength={1000}
              className="rounded-xl border border-gray-200 resize-none text-sm"
            />
          </div>

          <div className="flex items-start space-x-2 pt-1">
            <Checkbox
              id="modal-terms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, agreeToTerms: checked as boolean })
              }
              className="mt-0.5 border-gray-300"
            />
            <label
              htmlFor="modal-terms"
              className="text-xs text-gray-600 leading-snug cursor-pointer select-none"
            >
              I agree to the{" "}
              <a href="/terms-and-conditions" target="_blank" rel="noreferrer" className="text-[#9d00ff] underline">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy-policy" target="_blank" rel="noreferrer" className="text-[#9d00ff] underline">
                Privacy Policy
              </a>
              .
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-xs text-destructive">{errors.agreeToTerms}</p>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#9d00ff] hover:bg-[#8800e0] text-white font-semibold py-2.5 h-11 rounded-xl shadow-md shadow-[#9d00ff]/25 transition-all duration-300 hover:scale-[1.01] active:scale-100"
            >
              {isSubmitting ? "Scheduling Demo..." : "Confirm & Schedule Demo"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookDemoModal;
