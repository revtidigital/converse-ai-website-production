import { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  RotateCcw,
  Send,
  Sparkles,
  PhoneCall,
  Play,
  Pause,
  ExternalLink,
  Globe,
  Radio,
} from "lucide-react";

export type AgentType = "appointment" | "support" | "services";
export type LanguageKey = "hindi" | "uk_english" | "us_english" | "spanish";

interface DialogueMessage {
  id: string;
  sender: "agent" | "user";
  text: string;
  time: string;
}

interface AgentConfig {
  id: AgentType;
  title: string;
  roleTitle: string;
  description: string;
  avatarBadge: string;
  color: string;
  accentBg: string;
  greetings: Record<LanguageKey, string>;
  suggestions: Record<LanguageKey, string[]>;
  fallbackResponses: Record<LanguageKey, string>;
  intents: Record<LanguageKey, Array<{ keywords: string[]; answer: string }>>;
}

export const AGENT_CONFIGS: Record<AgentType, AgentConfig> = {
  appointment: {
    id: "appointment",
    title: "Appointment Booking",
    roleTitle: "Aria &bull; Clinic & Consultation Scheduler",
    description: "Book, reschedule, or confirm consultations with instant calendar sync.",
    avatarBadge: "📅",
    color: "#2563EB",
    accentBg: "bg-blue-600",
    greetings: {
      hindi:
        "नमस्ते! Converse AI अपॉइंटमेंट डेस्क में आपका स्वागत है। मैं आपकी डॉक्टर या कंसल्टेशन अपॉइंटमेंट बुक करने में मदद कर सकती हूँ। आप किस दिन का स्लॉट चाहते हैं?",
      uk_english:
        "Good day! Welcome to the ConverseAI Appointment Desk. I can assist you with booking or rescheduling your consultation. Which date or time suits you best?",
      us_english:
        "Hi there! Welcome to the ConverseAI Scheduling Service. I'm here to help you book or reschedule your appointment. What day and time work best for you?",
      spanish:
        "¡Hola! Le damos la bienvenida al servicio de citas de ConverseAI. Puedo ayudarle a reservar o reprogramar su consulta. ¿Qué fecha y hora le vendría mejor?",
    },
    suggestions: {
      hindi: [
        "कल दोपहर 3 बजे का अपॉइंटमेंट बुक कर दो",
        "डॉक्टर शर्मा कब उपलब्ध हैं?",
        "अपॉइंटमेंट रीशेड्यूल करना है",
        "क्रिकेट मैच कौन जीता? (Off-topic Test)",
      ],
      uk_english: [
        "Book an appointment for Thursday afternoon",
        "What slots are available this week?",
        "I need to reschedule my consultation",
        "What is the weather in London? (Off-topic Test)",
      ],
      us_english: [
        "Schedule an appointment for tomorrow morning",
        "Are there any openings on Friday?",
        "Can I push my visit to next week?",
        "Who is the president of France? (Off-topic Test)",
      ],
      spanish: [
        "Quiero reservar cita para mañana por la tarde",
        "¿Qué horarios tienen disponibles?",
        "Necesito cambiar mi cita al viernes",
        "¿Quién ganó el mundial de fútbol? (Prueba no relevante)",
      ],
    },
    fallbackResponses: {
      hindi:
        "माफ़ कीजिए, मुझे इस विषय की जानकारी नहीं है। मैं केवल अपॉइंटमेंट बुकिंग और शेड्यूलिंग में आपकी सहायता कर सकती हूँ। क्या आप कोई स्लॉट बुक करना चाहते हैं?",
      uk_english:
        "I am terribly sorry, but I don't have information on that subject. I am exclusively configured to help with appointment bookings and scheduling. Would you like to check available slots?",
      us_english:
        "Sorry about that, I don't have information on that topic. I can only assist with scheduling and appointment bookings. Would you like to pick a time slot?",
      spanish:
        "Disculpe, no tengo información sobre ese tema. Sólo estoy capacitada para gestionar reservas y citas. ¿Desea consultar los horarios disponibles?",
    },
    intents: {
      hindi: [
        {
          keywords: ["कल", "3 बजे", "बुक", "अपॉइंटमेंट", "समय", "स्लॉट", "दोपहर"],
          answer:
            "बढ़िया! कल दोपहर 3:00 बजे का स्लॉट खाली है। क्या मैं इसे आपके नाम से कन्फर्म कर दूँ? आपके मोबाइल पर कन्फर्मेशन SMS और WhatsApp भेज दिया जाएगा।",
        },
        {
          keywords: ["डॉक्टर", "शर्मा", "उपलब्ध", "timing", "टाइमिंग", "दिन"],
          answer:
            "डॉक्टर शर्मा सोमवार से शनिवार, सुबह 10:00 बजे से शाम 6:00 बजे तक उपलब्ध हैं। आपको सुबह का समय चाहिए या दोपहर का?",
        },
        {
          keywords: ["रीशेड्यूल", "बदलना", "change", "reschedule", "रद्द"],
          answer:
            "बिल्कुल! कृपया अपना पिछला बुकिंग रेफरेंस नंबर या मोबाइल नंबर बताएं, मैं तुरंत आपका अपॉइंटमेंट नए समय पर रीशेड्यूल कर देती हूँ।",
        },
      ],
      uk_english: [
        {
          keywords: ["thursday", "afternoon", "book", "appointment", "schedule", "slot"],
          answer:
            "Splendid! We have Thursday at 2:15 PM and 4:30 PM open. Shall I reserve the 2:15 PM slot for you and email the confirmation?",
        },
        {
          keywords: ["available", "openings", "slots", "when", "hours", "timings"],
          answer:
            "Our specialists are available Monday through Friday from 9:00 AM to 5:30 PM. Would you prefer a morning or late afternoon consultation?",
        },
        {
          keywords: ["reschedule", "change", "cancel", "push", "postpone"],
          answer:
            "Certainly! I can reschedule your appointment right away. Could you kindly confirm your full name or reference number?",
        },
      ],
      us_english: [
        {
          keywords: ["tomorrow", "morning", "book", "appointment", "schedule", "slot"],
          answer:
            "Awesome! Tomorrow at 10:30 AM is wide open. Would you like me to lock that in and text you the calendar invite?",
        },
        {
          keywords: ["friday", "available", "openings", "hours", "doctor"],
          answer:
            "On Friday, we have slots at 1:00 PM and 3:30 PM. Which one works best for your schedule?",
        },
        {
          keywords: ["reschedule", "next week", "push", "change", "cancel"],
          answer:
            "No problem at all! I can move your visit to next week. Do Tuesday or Wednesday work better for you?",
        },
      ],
      spanish: [
        {
          keywords: ["mañana", "tarde", "reservar", "cita", "hora", "slot"],
          answer:
            "¡Excelente! Mañana a las 16:00 horas tenemos disponibilidad. ¿Desea que confirme la reserva a su nombre?",
        },
        {
          keywords: ["horarios", "disponibles", "días", "médico", "especialista"],
          answer:
            "Atendemos de lunes a viernes de 9:00 a 19:00 horas. ¿Prefiere horario de mañana o de tarde?",
        },
        {
          keywords: ["cambiar", "viernes", "reprogramar", "posponer", "cancelar"],
          answer:
            "Por supuesto. He trasladado su cita para el viernes a las 11:30 horas. Le llegará un SMS con la confirmación.",
        },
      ],
    },
  },

  support: {
    id: "support",
    title: "Customer Support",
    roleTitle: "Rohan &bull; 24/7 Tier-1 Help Desk",
    description: "Instant order tracking, return queries, refund status, and issue resolution.",
    avatarBadge: "🎧",
    color: "#059669",
    accentBg: "bg-emerald-600",
    greetings: {
      hindi:
        "नमस्ते! Converse AI कस्टमर सपोर्ट में आपका स्वागत है। मैं आपकी ऑर्डर ट्रैकिंग या रिफंड में सहायता कर सकती हूँ। बताइए, आज मैं आपकी क्या मदद करूँ?",
      uk_english:
        "Hello and welcome to ConverseAI Customer Support. I'm here to assist you with order tracking, returns, or technical inquiries. How may I be of service today?",
      us_english:
        "Hey there! Welcome to ConverseAI Customer Care. I can help you track an order, process a return, or troubleshoot any issues. What can I help you with?",
      spanish:
        "¡Hola! Bienvenido al servicio de atención al cliente de ConverseAI. Puedo ayudarle con el seguimiento de sus pedidos, reembolsos o incidencias. ¿En qué puedo ayudarle hoy?",
    },
    suggestions: {
      hindi: [
        "मेरे आर्डर #7742 का स्टेटस क्या है?",
        "मुझे रिफंड कब तक मिलेगा?",
        "कस्टमर केयर एग्जीक्यूटिव से बात करनी है",
        "फ्रांस की राजधानी क्या है? (Off-topic Test)",
      ],
      uk_english: [
        "Where is my order #7742?",
        "How do I request a return or refund?",
        "Can I speak with a human agent?",
        "Who wrote Romeo and Juliet? (Off-topic Test)",
      ],
      us_english: [
        "Track my delivery package #7742",
        "What is your refund policy?",
        "Transfer me to a live representative",
        "How do I bake a chocolate cake? (Off-topic Test)",
      ],
      spanish: [
        "¿Dónde está mi pedido #7742?",
        "¿Cómo solicito un reembolso?",
        "Quiero hablar con un agente humano",
        "¿Cuál es la distancia a la luna? (Prueba no relevante)",
      ],
    },
    fallbackResponses: {
      hindi:
        "माफ़ कीजिए, मुझे इस विषय की जानकारी नहीं है। मैं केवल कस्टमर सपोर्ट, ऑर्डर और रिफंड से जुड़े सवालों के जवाब दे सकती हूँ। क्या आपकी कोई सपोर्ट इन्क्वायरी है?",
      uk_english:
        "I do apologise, but I don't have information on that topic. I'm specifically designed for customer support, order updates, and returns. Can I help with your order?",
      us_english:
        "Sorry, I don't have answers for that topic. I'm set up to help with customer support, orders, and returns. Is there an issue with your account or order?",
      spanish:
        "Lo siento, no dispongo de información sobre ese tema. Sólo puedo atender consultas de soporte, pedidos o devoluciones. ¿Tiene alguna duda con su compra?",
    },
    intents: {
      hindi: [
        {
          keywords: ["ऑर्डर", "7742", "स्टेटस", "डिलीवरी", "ट्रैक", "कहाँ"],
          answer:
            "ऑर्डर नंबर #7742 ब्लू डार्ट कूरियर से निकल चुका है और कल दोपहर 2:00 बजे तक आपके पते पर डिलीवर हो जाएगा। डिलीवरी बॉय का नंबर आपके SMS पर भेजा गया है।",
        },
        {
          keywords: ["रिफंड", "पैसे", "वापस", "पॉलिसी", "रिटर्न"],
          answer:
            "रिफंड रिक्वेस्ट मंज़ूर होने के 3 से 5 वर्किंग डेज़ में अमाउंट आपके ओरिजिनल बैंक खाते या UPI में क्रेडिट हो जाता है। क्या आप रिफंड टिकट रेज़ करना चाहते हैं?",
        },
        {
          keywords: ["एग्जीक्यूटिव", "इंसान", "बात", "human", "agent", "ट्रांसफर"],
          answer:
            "ज़रूर! मैं आपकी कॉल हमारे सीनियर कस्टमर सपोर्ट स्पेशलिस्ट को ट्रांसफर कर रही हूँ। कृपया लाइन पर बने रहिए...",
        },
      ],
      uk_english: [
        {
          keywords: ["order", "7742", "status", "tracking", "delivery", "parcel", "where"],
          answer:
            "Order #7742 is currently out for delivery with Royal Mail and is scheduled to reach your doorstep by 2:00 PM tomorrow afternoon. Tracking link has been sent via SMS.",
        },
        {
          keywords: ["refund", "return", "policy", "money back", "exchange"],
          answer:
            "We offer a 30-day no-quibble return policy. Once we receive your item, refunds are processed back to your original payment card within 3 business days.",
        },
        {
          keywords: ["human", "agent", "representative", "speak", "person", "operator"],
          answer:
            "Certainly! I am initiating a warm transfer to our senior support desk right now. Please hold for just a moment...",
        },
      ],
      us_english: [
        {
          keywords: ["order", "7742", "track", "delivery", "package", "where"],
          answer:
            "Package #7742 is on the FedEx truck and slated for delivery tomorrow by 3:00 PM. A tracking alert has been texted to your phone.",
        },
        {
          keywords: ["refund", "return", "policy", "credit", "cancel"],
          answer:
            "Returns are 100% free within 30 days! Your refund will be credited directly to your credit card or PayPal within 48 to 72 hours.",
        },
        {
          keywords: ["human", "representative", "agent", "person", "transfer", "live"],
          answer:
            "You got it! Handing you over to a live specialist right now. Hold tight for just one second...",
        },
      ],
      spanish: [
        {
          keywords: ["pedido", "7742", "dónde", "seguimiento", "entrega", "paquete"],
          answer:
            "Su pedido #7742 se encuentra en reparto con SEUR y será entregado mañana antes de las 14:00 horas. Le hemos enviado el enlace de seguimiento.",
        },
        {
          keywords: ["reembolso", "devolución", "dinero", "plazo", "cuenta"],
          answer:
            "Dispone de 30 días para devoluciones gratuitas. El abono se efectúa en su tarjeta en un plazo de 3 a 5 días laborables.",
        },
        {
          keywords: ["agente", "humano", "persona", "operador", "transferir"],
          answer:
            "Con mucho gusto. Le transfiero inmediatamente con un asesor de soporte humano. Un segundo, por favor...",
        },
      ],
    },
  },

  services: {
    id: "services",
    title: "Services & Products",
    roleTitle: "Maya &bull; ConverseAI Solutions Advisor",
    description: "Explore AI Voice Agents, WhatsApp Chatbots, and custom enterprise automations.",
    avatarBadge: "⚡",
    color: "#7C3AED",
    accentBg: "bg-violet-600",
    greetings: {
      hindi:
        "नमस्ते! Converse AI सॉल्यूशंस में आपका स्वागत है। हम आपके बिज़नेस के लिए AI Voice Agents, WhatsApp Chatbots और Agentic Automation बनाते हैं। आप किस प्रोडक्ट के बारे में जानना चाहते हैं?",
      uk_english:
        "Good day! Welcome to ConverseAI Solutions. We engineer enterprise AI Voice Agents, WhatsApp Commerce Chatbots, and autonomous workflow automation. Which solution would you like to explore?",
      us_english:
        "Hi! Welcome to ConverseAI. We build and run custom AI voice agents, WhatsApp business bots, and end-to-end agentic workflows. Which product would you like to learn about?",
      spanish:
        "¡Hola! Le damos la bienvenida a ConverseAI. Desarrollamos agentes de voz con IA, chatbots para WhatsApp y automatización inteligente de flujos. ¿Qué solución desea conocer?",
    },
    suggestions: {
      hindi: [
        "Converse AI क्या-क्या सर्विसेज देता है?",
        "Voice AI Agent की लेटेंसी कितनी है?",
        "WhatsApp Chatbot के क्या फीचर्स हैं?",
        "गाड़ी का माइलेज कैसे बढ़ाएं? (Off-topic Test)",
      ],
      uk_english: [
        "What services does ConverseAI provide?",
        "What is the latency of your Voice AI agents?",
        "Tell me about your WhatsApp AI Chatbot",
        "Who won the Premier League? (Off-topic Test)",
      ],
      us_english: [
        "What AI agents can you build for my company?",
        "How fast does the voice agent respond?",
        "How do I book a personalized pilot demo?",
        "What is the best recipe for pasta? (Off-topic Test)",
      ],
      spanish: [
        "¿Qué servicios y productos ofrece ConverseAI?",
        "¿Cuál es la latencia de sus agentes de voz?",
        "Hábleme del Chatbot para WhatsApp",
        "¿Cómo se cambia una rueda? (Prueba no relevante)",
      ],
    },
    fallbackResponses: {
      hindi:
        "माफ़ कीजिए, मुझे इस विषय की जानकारी नहीं है। मैं केवल Converse AI के प्रोडक्ट्स और AI सर्विसेज के बारे में बता सकती हूँ। क्या आप Voice Agents या WhatsApp Bot के बारे में जानना चाहते हैं?",
      uk_english:
        "I'm afraid I don't have information on that subject. I can only provide details on ConverseAI's voice agents, chatbots, and automation services. Would you like to hear about our enterprise solutions?",
      us_english:
        "Sorry, I don't have info on that topic. I'm here to tell you all about ConverseAI's voice agents, chatbots, and workflow automation. Would you like a quick overview of what we build?",
      spanish:
        "Disculpe, no tengo información sobre ese tema. Sólo puedo facilitarle detalles sobre nuestros agentes de IA, bots de WhatsApp y automatizaciones. ¿Desea información sobre nuestras soluciones?",
    },
    intents: {
      hindi: [
        {
          keywords: ["सर्विसेज", "प्रोडक्ट्स", "क्या-क्या", "काम", "करते हो", "ऑफर"],
          answer:
            "Converse AI तीन मुख्य सर्विसेज देता है: 1. AI Voice Agents जो इंसानों की तरह कॉल पर बात करते हैं, 2. Official Meta API WhatsApp Bots, और 3. Custom Agentic Automation जो आपके CRM और टूल्स को खुद चलाती हैं।",
        },
        {
          keywords: ["voice", "लेटेंसी", "latency", "स्पीड", "फास्ट", "agent"],
          answer:
            "हमारा Voice AI स्टैक Groq Whisper और ElevenLabs पर चलता है, जिसकी एंड-टू-एंड लेटेंसी 500 मिलीसेकंड से भी कम है! साथ ही इसमें Silero VAD है, यानी ग्राहक कभी भी बोलते हुए बीच में टोक सकता है।",
        },
        {
          keywords: ["whatsapp", "व्हाट्सएप", "चैटबॉट", "shop", "कॉमर्स"],
          answer:
            "हमारा WhatsApp AI Bot सीधे Meta Cloud API से जुड़ा है। यह कैटलॉग शोकेस, आर्डर प्लेसमेंट, कार्ट रिकवरी और 24/7 कस्टमर सपोर्ट बिना किसी ह्यूमन एजेंट के संभालता है।",
        },
      ],
      uk_english: [
        {
          keywords: ["services", "products", "offer", "provide", "solutions", "build"],
          answer:
            "ConverseAI provides three core capabilities: 1. Human-parity AI Voice Calling Agents, 2. Official WhatsApp Business Chatbots with Catalog Checkout, and 3. Autonomous Agentic AI Workflow Automation.",
        },
        {
          keywords: ["latency", "speed", "fast", "voice", "response time", "groq"],
          answer:
            "Our voice architecture delivers under 480 milliseconds round-trip latency using Groq Whisper V3 Turbo and streaming synthesis. It also supports instant barge-in so callers can interrupt naturally.",
        },
        {
          keywords: ["whatsapp", "chatbot", "catalog", "meta", "commerce"],
          answer:
            "Our WhatsApp solution connects directly to the Meta Cloud API with green tick readiness. It automates catalog browsing, broadcast campaigns, and tier-1 support across 50,000+ daily chats.",
        },
      ],
      us_english: [
        {
          keywords: ["services", "products", "build", "company", "offer", "what do you do"],
          answer:
            "We build and run AI agents for your business: real-time voice agents that replace costly SDRs and call centers, WhatsApp commerce bots, and custom agentic integrations for CRM workflows.",
        },
        {
          keywords: ["latency", "voice", "fast", "speed", "response", "whisper"],
          answer:
            "Our voice engine clocks in under 500 milliseconds end-to-end. Your callers get natural, zero-delay responses with zero robotic awkwardness.",
        },
        {
          keywords: ["demo", "pilot", "book", "pricing", "cost", "start"],
          answer:
            "You can start a custom pilot in just 5 business days! You can book a 1-on-1 discovery walkthrough directly at theconverseai.com/book-demo.",
        },
      ],
      spanish: [
        {
          keywords: ["servicios", "productos", "ofrecen", "hacen", "soluciones"],
          answer:
            "En ConverseAI ofrecemos tres pilares: Agentes de Voz con IA conversacional en tiempo real, Chatbots para WhatsApp con API oficial de Meta, y Automatizaciones Inteligentes para su CRM.",
        },
        {
          keywords: ["latencia", "voz", "velocidad", "rápido", "agente"],
          answer:
            "Nuestros agentes de voz operan con una latencia inferior a 500 milisegundos y admiten interrupciones naturales del usuario mediante Silero VAD.",
        },
        {
          keywords: ["whatsapp", "chatbot", "comercio", "catálogo", "meta"],
          answer:
            "Integramos bots para WhatsApp con catálogo interactivo, cobros automatizados y atención ininterrumpida las 24 horas del día.",
        },
      ],
    },
  },
};

interface VoiceCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAgent?: AgentType;
}

export default function VoiceCallModal({
  isOpen,
  onClose,
  initialAgent = "appointment",
}: VoiceCallModalProps) {
  const [selectedAgent, setSelectedAgent] = useState<AgentType>(initialAgent);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageKey>("hindi");
  const [isCalling, setIsCalling] = useState<boolean>(true);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState<boolean>(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [messages, setMessages] = useState<DialogueMessage[]>([]);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [lastSpokenText, setLastSpokenText] = useState<string>("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const recognitionRef = useRef<any>(null);
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentConfig = AGENT_CONFIGS[selectedAgent];

  // Pre-load browser voices so accent selection works immediately
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        setVoices(v);
        voicesRef.current = v;
      }
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // ── FIX 1: Lock body scrolling when modal is open so page never scrolls underneath ──
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Update initial agent if modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedAgent(initialAgent);
      startCall(initialAgent, selectedLanguage);
    } else {
      endCall();
    }
  }, [isOpen, initialAgent]);

  // Handle call duration counter
  useEffect(() => {
    if (isCalling) {
      callTimerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
    }
    return () => {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
    };
  }, [isCalling]);

  // Auto-scroll chat smoothly inside dialogue container
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isAgentSpeaking]);

  // Stop any active playing audio
  const stopAudio = useCallback(() => {
    if (activeAudioRef.current) {
      try {
        activeAudioRef.current.pause();
        activeAudioRef.current.src = "";
      } catch {}
      activeAudioRef.current = null;
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    setIsAgentSpeaking(false);
  }, []);

  // ── FIX 2: Authentic Sarvam AI Voice (Ritu) & Distinct Regional Accents ──
  const speakText = useCallback(
    async (text: string, lang: LanguageKey) => {
      if (isMuted) return;

      stopAudio();
      setIsAgentSpeaking(true);
      setLastSpokenText(text);

      // Strategy A: If Hindi, stream directly from Sarvam AI TTS (Ritu Voice)
      if (lang === "hindi") {
        try {
          const streamUrl = `/api/voice-tts?text=${encodeURIComponent(text.slice(0, 300))}&lang=hi-IN&speaker=ritu`;
          const audio = new Audio(streamUrl);
          activeAudioRef.current = audio;

          audio.onended = () => {
            setIsAgentSpeaking(false);
            activeAudioRef.current = null;
          };

          audio.onerror = () => {
            console.warn("Sarvam stream failed, falling back to browser speech");
            fallbackSpeak(text, lang);
          };

          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.catch((err) => {
              console.warn("Autoplay was prevented by browser:", err);
              fallbackSpeak(text, lang);
            });
          }
          return;
        } catch {
          // Fallback if network blocked
        }
      }

      // Strategy B: Regional voices with distinct British UK, American US, and Spanish accents
      fallbackSpeak(text, lang);
    },
    [isMuted, stopAudio]
  );

  const fallbackSpeak = (text: string, lang: LanguageKey) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setIsAgentSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const available = voicesRef.current.length > 0 ? voicesRef.current : window.speechSynthesis.getVoices();

    if (lang === "uk_english") {
      // Distinct British accent
      utterance.lang = "en-GB";
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      const ukVoice =
        available.find((v) => v.lang.toLowerCase() === "en-gb" || v.lang.toLowerCase() === "en_gb") ||
        available.find((v) => v.name.toLowerCase().includes("united kingdom") || v.name.toLowerCase().includes("british") || v.name.toLowerCase().includes("uk")) ||
        available.find((v) => v.name.toLowerCase().includes("george") || v.name.toLowerCase().includes("hazel") || v.name.toLowerCase().includes("libby") || v.name.toLowerCase().includes("sonia"));
      if (ukVoice) utterance.voice = ukVoice;
    } else if (lang === "hindi") {
      utterance.lang = "hi-IN";
      utterance.rate = 0.92;
      utterance.pitch = 1.02;
      const hiVoice =
        available.find((v) => v.lang.toLowerCase() === "hi-in" || v.lang.toLowerCase() === "hi_in") ||
        available.find((v) => v.lang.toLowerCase().startsWith("hi")) ||
        available.find((v) => v.name.toLowerCase().includes("hindi") || v.name.toLowerCase().includes("kalpana") || v.name.toLowerCase().includes("hemant"));
      if (hiVoice) utterance.voice = hiVoice;
    } else if (lang === "us_english") {
      utterance.lang = "en-US";
      utterance.rate = 1.02;
      utterance.pitch = 1.0;
      const usVoice =
        available.find((v) => v.lang.toLowerCase() === "en-us" || v.lang.toLowerCase() === "en_us") ||
        available.find((v) => v.name.toLowerCase().includes("united states") || v.name.toLowerCase().includes("zira") || v.name.toLowerCase().includes("david") || v.name.toLowerCase().includes("natural"));
      if (usVoice) utterance.voice = usVoice;
    } else if (lang === "spanish") {
      utterance.lang = "es-ES";
      utterance.rate = 0.98;
      utterance.pitch = 1.0;
      const esVoice =
        available.find((v) => v.lang.toLowerCase() === "es-es" || v.lang.toLowerCase() === "es_es") ||
        available.find((v) => v.lang.toLowerCase().startsWith("es")) ||
        available.find((v) => v.name.toLowerCase().includes("spanish") || v.name.toLowerCase().includes("helena") || v.name.toLowerCase().includes("laura"));
      if (esVoice) utterance.voice = esVoice;
    }

    utterance.onstart = () => setIsAgentSpeaking(true);
    utterance.onend = () => setIsAgentSpeaking(false);
    utterance.onerror = () => setIsAgentSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const startCall = (agent: AgentType, lang: LanguageKey) => {
    setIsCalling(true);
    setCallDuration(0);
    const cfg = AGENT_CONFIGS[agent];
    const greetingText = cfg.greetings[lang];

    const initialMsg: DialogueMessage = {
      id: "msg-0",
      sender: "agent",
      text: greetingText,
      time: "Just now",
    };

    setMessages([initialMsg]);

    // Speak greeting immediately
    setTimeout(() => {
      speakText(greetingText, lang);
    }, 200);
  };

  const endCall = () => {
    stopAudio();
    setIsCalling(false);
    setIsUserSpeaking(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
  };

  // Agent response matcher with pre-defined answers + polite fallback
  const handleUserSpeechOrInput = (userQuery: string) => {
    if (!userQuery.trim()) return;

    const trimmed = userQuery.trim();

    // Add user turn to dialogue
    const userMsg: DialogueMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: trimmed,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Find intent in knowledge base
    const lowerQuery = trimmed.toLowerCase();
    const intentList = currentConfig.intents[selectedLanguage] || [];

    let matchedAnswer: string | null = null;

    for (const intent of intentList) {
      const isMatch = intent.keywords.some((kw) => lowerQuery.includes(kw.toLowerCase()));
      if (isMatch) {
        matchedAnswer = intent.answer;
        break;
      }
    }

    // If query is not relevant / off-topic, speak the polite fallback!
    const finalAnswer = matchedAnswer || currentConfig.fallbackResponses[selectedLanguage];

    // Artificial thinking pause for human realism
    setTimeout(() => {
      const agentMsg: DialogueMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "agent",
        text: finalAnswer,
        time: "Just now",
      };
      setMessages((prev) => [...prev, agentMsg]);
      speakText(finalAnswer, selectedLanguage);
    }, 500);
  };

  // Web Speech Recognition for Real Microphone interaction
  const toggleListening = () => {
    if (isUserSpeaking) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      setIsUserSpeaking(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Microphone recognition is not supported in this browser. Please use the quick question buttons below!");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      const langMap: Record<LanguageKey, string> = {
        hindi: "hi-IN",
        uk_english: "en-GB",
        us_english: "en-US",
        spanish: "es-ES",
      };
      recognition.lang = langMap[selectedLanguage] || "en-US";

      recognition.onstart = () => {
        setIsUserSpeaking(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsUserSpeaking(false);
        handleUserSpeechOrInput(transcript);
      };

      recognition.onerror = () => {
        setIsUserSpeaking(false);
      };

      recognition.onend = () => {
        setIsUserSpeaking(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsUserSpeaking(false);
    }
  };

  const handleLanguageChange = (lang: LanguageKey) => {
    setSelectedLanguage(lang);
    startCall(selectedAgent, lang);
  };

  const handleAgentChange = (agent: AgentType) => {
    setSelectedAgent(agent);
    startCall(agent, selectedLanguage);
  };

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 overflow-hidden select-none overscroll-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          endCall();
          onClose();
        }
      }}
    >
      {/* ── Fixed compact card height (h-[85vh] max-h-[570px]), strictly overflow-hidden so popup NEVER scrolls ── */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[85vh] max-h-[570px] min-h-[380px] overscroll-contain">
        
        {/* ── Top Header Bar (Fixed height, no scroll) ── */}
        <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-lg">
              {currentConfig.avatarBadge}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {currentConfig.title}
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Call &bull; {formatDuration(callDuration)}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono truncate max-w-[260px] sm:max-w-none">
                {currentConfig.roleTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                if (isMuted) {
                  setIsMuted(false);
                  if (lastSpokenText) speakText(lastSpokenText, selectedLanguage);
                } else {
                  setIsMuted(true);
                  stopAudio();
                }
              }}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              title={isMuted ? "Unmute Agent Voice" : "Mute Agent Voice"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
            <button
              onClick={() => startCall(selectedAgent, selectedLanguage)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              title="Restart Conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                endCall();
                onClose();
              }}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              title="Close Call"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── 3 Agent Tabs Switcher (Fixed height, no scroll) ── */}
        <div className="bg-slate-950/70 border-b border-slate-800/80 px-4 py-2 flex gap-1.5 overflow-x-auto flex-shrink-0">
          {(["appointment", "support", "services"] as AgentType[]).map((agentKey) => {
            const cfg = AGENT_CONFIGS[agentKey];
            const isActive = selectedAgent === agentKey;
            return (
              <button
                key={agentKey}
                onClick={() => handleAgentChange(agentKey)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                    : "bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                <span>{cfg.avatarBadge}</span>
                <span>{cfg.title}</span>
              </button>
            );
          })}
        </div>

        {/* ── Distinct Regional Accents Switcher (Fixed height) ── */}
        <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between gap-2 overflow-x-auto flex-shrink-0">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 flex-shrink-0">
            <Globe className="w-3.5 h-3.5 text-violet-400" />
            <span>Voice Accent:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {(
              [
                { key: "hindi", label: "Hindi (Sarvam Ritu)", flag: "🇮🇳", accent: "Indian Accent" },
                { key: "uk_english", label: "UK English", flag: "🇬🇧", accent: "British Accent" },
                { key: "us_english", label: "US English", flag: "🇺🇸", accent: "American Accent" },
                { key: "spanish", label: "Spanish", flag: "🇪🇸", accent: "European Accent" },
              ] as const
            ).map((l) => (
              <button
                key={l.key}
                onClick={() => handleLanguageChange(l.key)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-all ${
                  selectedLanguage === l.key
                    ? "bg-slate-700 text-white ring-1 ring-violet-500 font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/80"
                }`}
              >
                <span>{l.flag}</span>
                <span>{l.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Compact Voice Orb Stage (Fixed height) ── */}
        <div className="py-2.5 px-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 border-b border-slate-800/60 flex items-center justify-center flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Glowing Voice Orb with tap-to-replay */}
            <div
              onClick={() => {
                if (lastSpokenText) speakText(lastSpokenText, selectedLanguage);
              }}
              className="relative w-12 h-12 flex items-center justify-center cursor-pointer group"
              title="Click to replay agent voice"
            >
              <div
                className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  isAgentSpeaking
                    ? "bg-violet-500/30 scale-125 animate-ping"
                    : isUserSpeaking
                    ? "bg-emerald-500/30 scale-125 animate-ping"
                    : "bg-slate-800/40"
                }`}
              />
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center text-white shadow-xl transition-all transform ${
                  isAgentSpeaking
                    ? "bg-gradient-to-br from-violet-500 to-indigo-600 scale-105 shadow-violet-500/50"
                    : isUserSpeaking
                    ? "bg-gradient-to-br from-emerald-500 to-teal-600 scale-105 shadow-emerald-500/50"
                    : "bg-slate-800 shadow-slate-900 group-hover:bg-slate-700"
                }`}
              >
                {isAgentSpeaking ? (
                  <Sparkles className="w-5 h-5 animate-spin text-violet-200" />
                ) : isUserSpeaking ? (
                  <Mic className="w-5 h-5 text-emerald-100 animate-bounce" />
                ) : (
                  <Volume2 className="w-5 h-5 text-slate-300" />
                )}
              </div>
            </div>

            {/* Speaking Status Pill */}
            <div>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 ${
                  isAgentSpeaking
                    ? "bg-violet-500/20 text-violet-300 animate-pulse border border-violet-500/30"
                    : isUserSpeaking
                    ? "bg-emerald-500/20 text-emerald-300 animate-pulse border border-emerald-500/30"
                    : "bg-slate-800 text-slate-300 border border-slate-700"
                }`}
              >
                {isAgentSpeaking
                  ? "🎙️ Sarvam Agent Speaking..."
                  : isUserSpeaking
                  ? "👂 Listening to you (Speak now)..."
                  : "Tap mic to speak or choose a question below"}
              </span>
            </div>
          </div>
        </div>

        {/* ── Dialogue Conversation Stream (ONLY this container scrolls!) ── */}
        <div
          ref={chatScrollRef}
          className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-2.5 bg-slate-900/60 min-h-0"
        >
          {messages.map((m) => {
            const isAgent = m.sender === "agent";
            return (
              <div
                key={m.id}
                className={`flex items-start gap-2 ${isAgent ? "justify-start" : "justify-end"}`}
              >
                {isAgent && (
                  <div className="w-6 h-6 rounded-lg bg-violet-600 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5">
                    AI
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed shadow-sm ${
                    isAgent
                      ? "bg-slate-800 text-slate-100 border border-slate-700/80 rounded-tl-sm"
                      : "bg-violet-600 text-white rounded-tr-sm"
                  }`}
                >
                  {m.text}
                </div>
                {!isAgent && (
                  <div className="w-6 h-6 rounded-lg bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5">
                    You
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Suggested Questions (Fixed height, compact single/double row) ── */}
        <div className="px-3.5 py-2 bg-slate-950 border-t border-slate-800 flex-shrink-0">
          <div className="text-[10px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Try asking (Tap to speak):</span>
          </div>
          <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto">
            {currentConfig.suggestions[selectedLanguage].map((sug, idx) => (
              <button
                key={idx}
                onClick={() => handleUserSpeechOrInput(sug)}
                className={`text-[10px] text-left px-2 py-0.5 rounded border transition-all ${
                  idx === 3
                    ? "bg-rose-950/40 border-rose-800/60 text-rose-300 hover:bg-rose-900/50"
                    : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {sug}
              </button>
            ))}
          </div>
        </div>

        {/* ── Bottom Input & Mic Action Bar (Fixed height) ── */}
        <div className="p-2.5 sm:p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2 flex-shrink-0">
          {/* Real Mic Button */}
          <button
            onClick={toggleListening}
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all transform hover:scale-105 flex-shrink-0 ${
              isUserSpeaking
                ? "bg-rose-600 hover:bg-rose-500 animate-pulse shadow-lg shadow-rose-600/40"
                : "bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/30"
            }`}
            title={isUserSpeaking ? "Stop Listening" : "Tap to Speak with Microphone"}
          >
            {isUserSpeaking ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Text Input Box */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Or type what you want to say..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleUserSpeechOrInput(inputText);
                }
              }}
              className="w-full h-10 bg-slate-900 border border-slate-700 rounded-xl px-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
            />
          </div>

          {/* Send Button */}
          <button
            onClick={() => handleUserSpeechOrInput(inputText)}
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:hover:bg-violet-600 text-white flex items-center justify-center transition-all flex-shrink-0"
            title="Send Message"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
