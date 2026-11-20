import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  Calendar,
  Sparkles,
  ChevronDown,
  Building,
  Car,
  Truck,
  HeartPulse,
  TrendingUp,
  Receipt,
  CheckCircle,
} from "lucide-react";

type Gender = "female" | "male";

interface VoiceConfig {
  voiceName: string;
  badge?: string;
  audioUrl: string;
}

interface LanguageVariant {
  code: string;
  label: string;
  flag: string;
  female: VoiceConfig;
  male: VoiceConfig;
  context: string;
  script: string;
}

interface DemoCardConfig {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: typeof Calendar;
  accentBg: string;
  accentText: string;
  defaultLang: string;
  defaultGender: Gender;
  languages: LanguageVariant[];
}

const DEMO_CARDS: DemoCardConfig[] = [
  // Card 1: Appointment Management
  {
    id: "appointment-management",
    title: "Appointment Management",
    category: "Healthcare & Clinics",
    description: "Collects patient symptoms, recommends matching specialist doctors, and books calendar consultation slots.",
    icon: HeartPulse,
    accentBg: "bg-blue-500/10",
    accentText: "text-blue-600 dark:text-blue-400",
    defaultLang: "hinglish",
    defaultGender: "female",
    languages: [
      {
        code: "hinglish",
        label: "Hinglish",
        flag: "🇮🇳",
        female: { voiceName: "Aria", badge: "Studio Neural HD", audioUrl: "/audio/voice-demos/appointment-hinglish.mp3?v=3" },
        male: { voiceName: "Madhur", badge: "Neural Low-Latency", audioUrl: "/audio/voice-demos/sales-hinglish-male.mp3?v=4" },
        context: "Patient calling to schedule a general physician consultation in fluid conversational Hinglish.",
        script: "नमस्ते! HealthCare Clinic से Converse AI बात कर रहा हूँ। डॉक्टर शर्मा के पास गुरुवार दोपहर 3 बजे और शुक्रवार सुबह 11 बजे स्लॉट्स उपलब्ध हैं। कौन सा टाइम आपके लिए बेस्ट रहेगा?",
      },
      {
        code: "hindi",
        label: "Hindi",
        flag: "🇮🇳",
        female: { voiceName: "Swara", badge: "Studio Neural HD", audioUrl: "/audio/voice-demos/appointment-hindi.mp3?v=3" },
        male: { voiceName: "Madhur", badge: "Neural Low-Latency", audioUrl: "/audio/voice-demos/appointment-hindi-male.mp3?v=4" },
        context: "क्लीनिक अपॉइंटमेंट बुकिंग और डॉक्टर उपलब्धता की जानकारी शुद्ध हिंदी में।",
        script: "नमस्ते, मैं Converse AI क्लिनिक सपोर्ट से बात कर रही हूँ। आपकी सुविधानुसार गुरुवार 3 बजे का समय निश्चित कर दिया गया है। आपके मोबाइल पर SMS कन्फर्मेशन भेज दिया गया है।",
      },
      {
        code: "us_english",
        label: "US English",
        flag: "🇺🇸",
        female: { voiceName: "Aria", badge: "Natural Conversational", audioUrl: "/audio/voice-demos/sales-english.mp3" },
        male: { voiceName: "Marcus", badge: "Professional Neural", audioUrl: "/audio/voice-demos/appointment-us-male.mp3" },
        context: "Inbound clinic inquiry confirming symptoms, insurance coverage, and specialist doctor booking.",
        script: "Hi there! This is Aria from HealthCare Clinic. I see you requested an appointment. Dr. Sharma has openings this Thursday at 3 PM or Friday at 11 AM. Which works best for you?",
      },
      {
        code: "uk_english",
        label: "UK English",
        flag: "🇬🇧",
        female: { voiceName: "Sarah", badge: "British RP", audioUrl: "/audio/voice-demos/uk-converse-voice.mp3" },
        male: { voiceName: "Oliver", badge: "British RP", audioUrl: "/audio/voice-demos/uk-wealth-advisory.mp3" },
        context: "Private clinic specialist consultation scheduling with polite British RP cadence.",
        script: "Good afternoon. Thank you for contacting our clinic. I would be delighted to arrange your consultation. Would Thursday afternoon at 3 PM suit your schedule?",
      },
      {
        code: "french",
        label: "French",
        flag: "🇫🇷",
        female: { voiceName: "Sophie", badge: "Parisian Neural", audioUrl: "/audio/voice-demos/french-hospitality.mp3" },
        male: { voiceName: "Marc", badge: "Natural Native", audioUrl: "/audio/voice-demos/appointment-french-male.mp3" },
        context: "Prise de rendez-vous médical et confirmation instantanée en français.",
        script: "Bonjour, je suis l'assistant vocal de la clinique. Nous avons des créneaux disponibles ce jeudi à 15 heures. Souhaitez-vous confirmer cette réservation ?",
      },
    ],
  },

  // Card 2: Sales Discovery
  {
    id: "sales-discovery",
    title: "Sales Discovery & Qualification",
    category: "B2B SaaS & High-Ticket",
    description: "Qualifies inbound warm leads on monthly interaction volume, budget authority, and books account executive meetings.",
    icon: TrendingUp,
    accentBg: "bg-emerald-500/10",
    accentText: "text-emerald-600 dark:text-emerald-400",
    defaultLang: "english",
    defaultGender: "female",
    languages: [
      {
        code: "english",
        label: "English",
        flag: "🌐",
        female: { voiceName: "Aria", badge: "Warm SDR", audioUrl: "/audio/voice-demos/sales-english.mp3" },
        male: { voiceName: "Marcus", badge: "Executive SDR", audioUrl: "/audio/voice-demos/us-converse-voice.mp3" },
        context: "Qualifying B2B SaaS demo requests on tech stack, monthly chat volume, and decision timeline.",
        script: "Hi there, this is Aria from ConverseAI! How many monthly customer interactions does your team currently handle? That puts you right in our sweet spot for automated resolution.",
      },
      {
        code: "hinglish",
        label: "Hinglish",
        flag: "🇮🇳",
        female: { voiceName: "Aria", badge: "Natural Indian", audioUrl: "/audio/voice-demos/sales-hinglish.mp3?v=3" },
        male: { voiceName: "Madhur", badge: "Conversational Pro", audioUrl: "/audio/voice-demos/sales-hinglish-male.mp3?v=4" },
        context: "Fast-growth Indian startup sales discovery call with natural language code-switching.",
        script: "Hello! Converse AI से बात कर रहा हूँ। क्या आपका team support automation ढूंढ रहा है या sales outreach? हम 20-minute live pilot setup कर सकते हैं।",
      },
      {
        code: "us_english",
        label: "US English",
        flag: "🇺🇸",
        female: { voiceName: "Aria", badge: "US West Coast", audioUrl: "/audio/voice-demos/sales-english.mp3" },
        male: { voiceName: "Marcus", badge: "US Standard", audioUrl: "/audio/voice-demos/us-converse-voice.mp3" },
        context: "Inbound SaaS lead discovery, ROI justification, and calendar invite dispatch.",
        script: "Awesome. I'd love to set up a 20-minute tailored walkthrough with our solutions team. Would Friday at 10 AM EST work for your calendar?",
      },
      {
        code: "uk_english",
        label: "UK English",
        flag: "🇬🇧",
        female: { voiceName: "Sarah", badge: "British RP", audioUrl: "/audio/voice-demos/uk-converse-voice.mp3" },
        male: { voiceName: "Oliver", badge: "Executive Tone", audioUrl: "/audio/voice-demos/uk-wealth-advisory.mp3" },
        context: "Enterprise discovery for EMEA market with native business accent.",
        script: "Good afternoon. We help mid-market teams automate 80% of routine workflows while reducing operational cost. Shall we book a brief consultation?",
      },
      {
        code: "german",
        label: "German",
        flag: "🇩🇪",
        female: { voiceName: "Greta", badge: "Native Business", audioUrl: "/audio/voice-demos/sales-german.mp3" },
        male: { voiceName: "Klaus", badge: "Enterprise Native", audioUrl: "/audio/voice-demos/german-logistics.mp3" },
        context: "B2B Vertriebsqualifizierung und Terminvereinbarung auf Deutsch.",
        script: "Guten Tag! Ich bin der KI-Assistent von ConverseAI. Wie viele Supportanfragen verarbeitet Ihr Unternehmen monatlich? Wir automatisieren wiederkehrende Anfragen nahtlos.",
      },
    ],
  },

  // Card 3: EMI Collection & Support
  {
    id: "emi-collection",
    title: "EMI Reminder & Collections",
    category: "BFSI & NBFC Lending",
    description: "DLT-compliant, respectful payment reminders with instant UPI/NetBanking payment link dispatch via WhatsApp.",
    icon: Receipt,
    accentBg: "bg-amber-500/10",
    accentText: "text-amber-600 dark:text-amber-400",
    defaultLang: "hindi",
    defaultGender: "female",
    languages: [
      {
        code: "hindi",
        label: "Hindi",
        flag: "🇮🇳",
        female: { voiceName: "Swara", badge: "Polite DLT", audioUrl: "/audio/voice-demos/appointment-hindi.mp3?v=3" },
        male: { voiceName: "Madhur", badge: "Compliant Tone", audioUrl: "/audio/voice-demos/appointment-hindi-male.mp3?v=4" },
        context: "सहानुभूतिपूर्ण और RBI/DLT-compliant भाषा में सुरक्षित ऋण भुगतान अनुस्मारक।",
        script: "नमस्ते, मैं FinCare की तरफ से बात कर रही हूँ। आपके लोन अकाउंट में इस महीने की ईएमआई भुगतान तिथि नजदीक है। क्या मैं आपके रजिस्टर्ड नंबर पर UPI लिंक भेज दूँ?",
      },
      {
        code: "tamil",
        label: "Tamil",
        flag: "🇮🇳",
        female: { voiceName: "Priya", badge: "DLT-Compliant", audioUrl: "/audio/voice-demos/emi-tamil.mp3" },
        male: { voiceName: "Karthik", badge: "Polite Tone", audioUrl: "/audio/voice-demos/emi-tamil-male.mp3" },
        context: "கடன் தவணை நினைவூட்டல் மற்றும் பாதுகாப்பான கட்டண இணைப்பு அனுப்புதல்.",
        script: "வணக்கம், FinCare சார்பாக பிரியா பேசுகிறேன். உங்கள் மாத தவணை தொகையை செலுத்த UPI லிங்க் உங்கள் வாட்ஸ்அப் எண்ணிற்கு அனுப்பட்டுமா?",
      },
      {
        code: "spanish",
        label: "Spanish",
        flag: "🇪🇸",
        female: { voiceName: "Sofía", badge: "Compliant BFSI", audioUrl: "/audio/voice-demos/emi-spanish.mp3" },
        male: { voiceName: "Carlos", badge: "Professional Tone", audioUrl: "/audio/voice-demos/emi-spanish-male.mp3" },
        context: "Recordatorio de cuota financiera con opciones de pago en línea inmediato.",
        script: "Hola, me comunico de FinCare para recordarle el pago de su cuota mensual. ¿Desea que le enviemos el enlace seguro para realizar el pago ahora?",
      },
      {
        code: "us_english",
        label: "US English",
        flag: "🇺🇸",
        female: { voiceName: "Aria", badge: "Financial Care", audioUrl: "/audio/voice-demos/sales-english.mp3" },
        male: { voiceName: "Marcus", badge: "Direct & Clear", audioUrl: "/audio/voice-demos/us-converse-voice.mp3" },
        context: "Early-bucket customer payment reminder with secure digital payment processing.",
        script: "Hello, this is a courteous reminder regarding your account balance with FinCare. We can send a secure one-click payment link directly to your mobile number.",
      },
      {
        code: "uk_english",
        label: "UK English",
        flag: "🇬🇧",
        female: { voiceName: "Sarah", badge: "Gentle Reminder", audioUrl: "/audio/voice-demos/uk-converse-voice.mp3" },
        male: { voiceName: "Oliver", badge: "Formal & Clear", audioUrl: "/audio/voice-demos/uk-wealth-advisory.mp3" },
        context: "Compliant financial reminder adhering strictly to consumer credit guidelines.",
        script: "Good afternoon. I am calling from FinCare Customer Support regarding your upcoming payment schedule. Would you like me to send a payment link to your email?",
      },
    ],
  },

  // Card 4: Real Estate & Site Visits
  {
    id: "real-estate",
    title: "Real Estate & Site Visits",
    category: "Property Advisory & Builders",
    description: "Filters high-intent home buyers on budget (2BHK vs 3BHK), preferred locality, and schedules weekend on-site property walkthroughs.",
    icon: Building,
    accentBg: "bg-purple-500/10",
    accentText: "text-purple-600 dark:text-purple-400",
    defaultLang: "hinglish",
    defaultGender: "female",
    languages: [
      {
        code: "hinglish",
        label: "Hinglish",
        flag: "🇮🇳",
        female: { voiceName: "Aria", badge: "Property Advisor", audioUrl: "/audio/voice-demos/sales-hinglish.mp3?v=3" },
        male: { voiceName: "Madhur", badge: "Senior Consultant", audioUrl: "/audio/voice-demos/sales-hinglish-male.mp3?v=4" },
        context: "High-intent buyer qualification (2BHK vs 3BHK, budget, possession) and weekend site visit booking in Hinglish.",
        script: "Hello! Prestige Living से बात कर रहे हैं। क्या आप 2BHK या 3BHK फ्लैट्स देख रहे हैं? इस शनिवार सुबह 11 बजे हमारी प्रोजेक्ट साइट पर VIP वॉकथ्रू शेड्यूल कर दें?",
      },
      {
        code: "spanish",
        label: "Spanish",
        flag: "🇪🇸",
        female: { voiceName: "Sofía", badge: "Asesora Inmobiliaria", audioUrl: "/audio/voice-demos/emi-spanish.mp3" },
        male: { voiceName: "Carlos", badge: "Experto en Bienes Raíces", audioUrl: "/audio/voice-demos/emi-spanish-male.mp3" },
        context: "Calificación de compradores e inversores residenciales con visita presencial.",
        script: "Hola, le llamo de Residencial Vista Real. ¿Está buscando una propiedad para inversión o vivienda familiar? Tenemos visitas disponibles este fin de semana.",
      },
      {
        code: "us_english",
        label: "US English",
        flag: "🇺🇸",
        female: { voiceName: "Aria", badge: "Luxury Realty", audioUrl: "/audio/voice-demos/sales-english.mp3" },
        male: { voiceName: "Marcus", badge: "Advisory Voice", audioUrl: "/audio/voice-demos/us-converse-voice.mp3" },
        context: "Residential property inquiry qualification, price estimation, and callback scheduling.",
        script: "Hi! Thanks for inquiring about Skyline Heights. Are you looking for a two-bedroom or three-bedroom residence? We have private showings this Saturday at 11 AM.",
      },
      {
        code: "uk_english",
        label: "UK English",
        flag: "🇬🇧",
        female: { voiceName: "Sarah", badge: "Prime Property", audioUrl: "/audio/voice-demos/uk-converse-voice.mp3" },
        male: { voiceName: "Oliver", badge: "Prime Property", audioUrl: "/audio/voice-demos/uk-wealth-advisory.mp3" },
        context: "Premium London real estate site visit coordination with authentic British RP accent.",
        script: "Good morning. I am calling from Mayfair Residential. We have exclusive viewing appointments available for our penthouse development this Saturday.",
      },
    ],
  },

  // Card 5: Automotive & Test Drive Booking
  {
    id: "automotive-booking",
    title: "Automotive & Test Drive Booking",
    category: "Dealerships & Service Centers",
    description: "Converts vehicle inquiries into showroom test drives, annual MOT/service appointments, and trade-in valuations.",
    icon: Car,
    accentBg: "bg-red-500/10",
    accentText: "text-red-600 dark:text-red-400",
    defaultLang: "uk_english",
    defaultGender: "female",
    languages: [
      {
        code: "uk_english",
        label: "UK English",
        flag: "🇬🇧",
        female: { voiceName: "Sarah", badge: "Dealership Concierge", audioUrl: "/audio/voice-demos/uk-converse-voice.mp3" },
        male: { voiceName: "James", badge: "Service Specialist", audioUrl: "/audio/voice-demos/uk-automotive-mot.mp3" },
        context: "Automotive dealership booking test drives and annual maintenance appointments.",
        script: "Good afternoon! This is Converse Automotive. I see you're interested in the new hybrid SUV. We have test drive slots available this Saturday at 11 AM or Sunday at 2 PM.",
      },
      {
        code: "hindi",
        label: "Hindi",
        flag: "🇮🇳",
        female: { voiceName: "Swara", badge: "Showroom Assistant", audioUrl: "/audio/voice-demos/appointment-hindi.mp3?v=3" },
        male: { voiceName: "Madhur", badge: "Service Advisor", audioUrl: "/audio/voice-demos/appointment-hindi-male.mp3?v=4" },
        context: "शोरूम टेस्ट ड्राइव और अधिकृत सर्विस सेंटर अपॉइंटमेंट बुकिंग हिंदी में।",
        script: "नमस्ते! ऑटोमोबाइल डीलरशिप से बात कर रहे हैं। आपकी नई SUV की टेस्ट ड्राइव के लिए शनिवार सुबह 11 बजे का स्लॉट उपलब्ध है। क्या हम आपकी बुकिंग कन्फर्म कर दें?",
      },
      {
        code: "us_english",
        label: "US English",
        flag: "🇺🇸",
        female: { voiceName: "Aria", badge: "Sales Advisor", audioUrl: "/audio/voice-demos/sales-english.mp3" },
        male: { voiceName: "Marcus", badge: "Service Manager", audioUrl: "/audio/voice-demos/us-converse-voice.mp3" },
        context: "US automotive dealership test drive scheduling and trim level configuration.",
        script: "Hi there! Following up on your request to test drive the new EV crossover. We have VIP slots open this weekend. Would morning or afternoon suit you best?",
      },
      {
        code: "french",
        label: "French",
        flag: "🇫🇷",
        female: { voiceName: "Sophie", badge: "Conseillère Auto", audioUrl: "/audio/voice-demos/french-hospitality.mp3" },
        male: { voiceName: "Marc", badge: "Expert Concession", audioUrl: "/audio/voice-demos/appointment-french-male.mp3" },
        context: "Réservation d'essais automobiles et entretiens périodiques en concession.",
        script: "Bonjour ! Nous serions ravis de vous faire essayer notre nouveau modèle hybride ce samedi. Souhaitez-vous réserver un essai à 11 heures ?",
      },
    ],
  },

  // Card 6: Logistics & Order Dispatch
  {
    id: "logistics-dispatch",
    title: "Logistics & Order Dispatch",
    category: "Supply Chain & Tracking",
    description: "Automates delivery dispatch alerts, customs clearance updates, address checks, and NDR reattempt scheduling.",
    icon: Truck,
    accentBg: "bg-cyan-500/10",
    accentText: "text-cyan-600 dark:text-cyan-400",
    defaultLang: "german",
    defaultGender: "male",
    languages: [
      {
        code: "german",
        label: "German",
        flag: "🇩🇪",
        male: { voiceName: "Klaus", badge: "Logistik Assistent", audioUrl: "/audio/voice-demos/german-logistics.mp3" },
        female: { voiceName: "Greta", badge: "Express Support", audioUrl: "/audio/voice-demos/sales-german.mp3" },
        context: "Automatische Lieferbenachrichtigung und Adressbestätigung für Expresssendungen.",
        script: "Guten Tag, hier ist der Logistikdienst von Express Delivery. Ihre Sendung befindet sich heute in der Zustellung. Bitte bestätigen Sie Ihre Lieferadresse.",
      },
      {
        code: "hindi",
        label: "Hindi",
        flag: "🇮🇳",
        female: { voiceName: "Swara", badge: "डिस्पैच सपोर्ट", audioUrl: "/audio/voice-demos/appointment-hindi.mp3?v=3" },
        male: { voiceName: "Madhur", badge: "डिलीवरी मैनेजर", audioUrl: "/audio/voice-demos/appointment-hindi-male.mp3?v=4" },
        context: "COD पता सत्यापन और ग्राहक डिलीवरी समय स्लॉट पुष्टि।",
        script: "नमस्ते, आपका पार्सल आज दोपहर 2 बजे तक डिलीवर किया जाएगा। कृपया कन्फर्म करें कि डिलीवरी के समय पते पर कोई उपस्थित रहेगा?",
      },
      {
        code: "english",
        label: "English",
        flag: "🌐",
        female: { voiceName: "Aria", badge: "Dispatch Desk", audioUrl: "/audio/voice-demos/sales-english.mp3" },
        male: { voiceName: "Marcus", badge: "Courier Lead", audioUrl: "/audio/voice-demos/us-converse-voice.mp3" },
        context: "Real-time delivery verification, ETA notification, and gate entry code verification.",
        script: "Hi, this is Express Logistics calling regarding your package delivery scheduled for today between 1 PM and 3 PM. Would you like contactless drop-off?",
      },
      {
        code: "uk_english",
        label: "UK English",
        flag: "🇬🇧",
        female: { voiceName: "Sarah", badge: "Customer Care", audioUrl: "/audio/voice-demos/uk-converse-voice.mp3" },
        male: { voiceName: "Oliver", badge: "Operations", audioUrl: "/audio/voice-demos/uk-wealth-advisory.mp3" },
        context: "UK courier service resolving delivery timeframes and safe place instructions.",
        script: "Good afternoon. We are attempting delivery of your parcel today. If you are not at home, would you like us to leave it with a neighbour?",
      },
    ],
  },
];

export default function SarvamVoiceDemoSection() {
  // Global Audio Player Reference ensuring single audio stream
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Active playing state
  const [playingCardId, setPlayingCardId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  // Per-card selection state: { [cardId]: { lang: string, gender: Gender } }
  const [cardStates, setCardStates] = useState<Record<string, { lang: string; gender: Gender }>>(() => {
    const initial: Record<string, { lang: string; gender: Gender }> = {};
    DEMO_CARDS.forEach((card) => {
      initial[card.id] = { lang: card.defaultLang, gender: card.defaultGender };
    });
    return initial;
  });

  // Expanded transcripts state
  const [expandedTranscripts, setExpandedTranscripts] = useState<Record<string, boolean>>({});

  // Stop audio on component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const stopCurrentAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlayingCardId(null);
    setCurrentTime(0);
    setDuration(0);
  };

  const handlePlayToggle = (card: DemoCardConfig, audioUrl: string) => {
    if (playingCardId === card.id) {
      // Toggle pause
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setPlayingCardId(null);
      } else if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => setPlayingCardId(card.id)).catch(() => setPlayingCardId(null));
      }
      return;
    }

    // New card / track clicked: pause existing audio
    stopCurrentAudio();

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.onloadedmetadata = () => {
      setDuration(audio.duration || 0);
    };

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    audio.onended = () => {
      setPlayingCardId(null);
      setCurrentTime(0);
    };

    audio.onerror = () => {
      console.warn("Could not load audio file:", audioUrl);
      setPlayingCardId(null);
    };

    audio
      .play()
      .then(() => setPlayingCardId(card.id))
      .catch((err) => {
        console.warn("Audio playback prevented:", err);
        setPlayingCardId(null);
      });
  };

  const handleGenderSwitch = (cardId: string, newGender: Gender) => {
    // If this card is currently playing, pause it to swap cleanly
    if (playingCardId === cardId) {
      stopCurrentAudio();
    }
    setCardStates((prev) => ({
      ...prev,
      [cardId]: {
        ...prev[cardId],
        gender: newGender,
      },
    }));
  };

  const handleLangSwitch = (cardId: string, newLang: string) => {
    if (playingCardId === cardId) {
      stopCurrentAudio();
    }
    setCardStates((prev) => ({
      ...prev,
      [cardId]: {
        ...prev[cardId],
        lang: newLang,
      },
    }));
  };

  const toggleTranscript = (cardId: string) => {
    setExpandedTranscripts((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  return (
    <section id="voice-demos" className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-background via-violet-950/[0.02] to-background border-b border-border">
      {/* Background glow effects */}
      <div className="absolute top-10 left-1/3 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-violet/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4 border border-primary/20">
            <Volume2 className="w-3.5 h-3.5" /> Neural Voice Demo Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4 leading-tight">
            Hear Real Human AI Voice Agents in Action
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Experience ultra-low latency (&lt;800ms) conversational AI with authentic regional cadences across Hindi, Hinglish, UK English, US English, Tamil, German, Spanish, and French.
          </p>
        </div>

        {/* Demo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {DEMO_CARDS.map((card) => {
            const currentState = cardStates[card.id] || { lang: card.defaultLang, gender: card.defaultGender };
            const activeLang = card.languages.find((l) => l.code === currentState.lang) || card.languages[0];
            const activeVoice = currentState.gender === "female" ? activeLang.female : activeLang.male;
            const isThisCardPlaying = playingCardId === card.id;
            const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
            const isTranscriptOpen = !!expandedTranscripts[card.id];
            const CardIcon = card.icon;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-2xl border border-border/70 p-6 flex flex-col justify-between hover:shadow-xl hover:border-primary/30 transition-all duration-300 bg-card/90"
              >
                <div>
                  {/* Card Header & Category Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${card.accentBg} flex items-center justify-center shrink-0`}>
                        <CardIcon className={`w-5 h-5 ${card.accentText}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-base sm:text-lg leading-snug">
                          {card.title}
                        </h3>
                        <span className="text-xs text-muted-foreground font-medium">
                          {card.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">
                    {card.description}
                  </p>

                  {/* 1. Dual Gender Switcher */}
                  <div className="mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 block mb-2">
                      Voice Gender:
                    </span>
                    <div className="inline-flex rounded-lg bg-secondary/80 p-0.5 border border-border/60">
                      <button
                        type="button"
                        onClick={() => handleGenderSwitch(card.id, "female")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                          currentState.gender === "female"
                            ? "bg-primary text-white shadow-xs"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span>👩 Female</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleGenderSwitch(card.id, "male")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                          currentState.gender === "male"
                            ? "bg-primary text-white shadow-xs"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span>👨 Male</span>
                      </button>
                    </div>
                  </div>

                  {/* 2. Language Variant Tabs */}
                  <div className="mb-5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 block mb-2">
                      Select Accent &amp; Language:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {card.languages.map((lang) => {
                        const isSelected = lang.code === currentState.lang;
                        return (
                          <button
                            key={lang.code}
                            type="button"
                            onClick={() => handleLangSwitch(card.id, lang.code)}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
                              isSelected
                                ? "bg-primary/10 text-primary border-primary/30 font-semibold"
                                : "bg-secondary/40 hover:bg-secondary text-muted-foreground border-border/50"
                            }`}
                          >
                            <span>{lang.flag}</span>
                            <span>{lang.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 3. Audio Player Box */}
                <div className="mt-2 pt-4 border-t border-border/60">
                  <div className="p-3.5 rounded-xl bg-secondary/50 border border-border/50">
                    {/* Active Voice Info & Live Waveform Indicator */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-foreground">
                          {currentState.gender === "female" ? "👩 Female Voice:" : "👨 Male Voice:"} {activeVoice.voiceName}
                        </span>
                        {activeVoice.badge && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-primary/10 text-primary font-semibold border border-primary/20">
                            {activeVoice.badge}
                          </span>
                        )}
                      </div>

                      {/* Equalizer bars animation when playing */}
                      <div className="flex items-center gap-0.5 h-3">
                        <span className={`w-0.5 rounded-full bg-primary transition-all duration-200 ${isThisCardPlaying ? "h-3 animate-pulse" : "h-1"}`} />
                        <span className={`w-0.5 rounded-full bg-primary transition-all duration-300 ${isThisCardPlaying ? "h-2.5 animate-bounce" : "h-1"}`} />
                        <span className={`w-0.5 rounded-full bg-primary transition-all duration-200 ${isThisCardPlaying ? "h-3.5 animate-pulse" : "h-1"}`} />
                        <span className={`w-0.5 rounded-full bg-primary transition-all duration-300 ${isThisCardPlaying ? "h-2 animate-bounce" : "h-1"}`} />
                      </div>
                    </div>

                    {/* Play Button & Progress */}
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handlePlayToggle(card, activeVoice.audioUrl)}
                        className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center shrink-0 shadow-md transition-transform active:scale-95"
                        aria-label={isThisCardPlaying ? "Pause demo" : "Play demo"}
                      >
                        {isThisCardPlaying ? (
                          <Pause className="w-4 h-4 fill-white" />
                        ) : (
                          <Play className="w-4 h-4 fill-white ml-0.5" />
                        )}
                      </button>

                      {/* Progress Bar & Time */}
                      <div className="flex-1">
                        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden mb-1.5">
                          <div
                            className="bg-primary h-full transition-all duration-150"
                            style={{ width: `${isThisCardPlaying ? progressPercent : 0}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
                          <span>{isThisCardPlaying ? formatTime(currentTime) : "0:00"}</span>
                          <span>{isThisCardPlaying && duration > 0 ? formatTime(duration) : "0:36"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Scenario label */}
                    <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                      💬 <span className="italic">{activeLang.context}</span>
                    </p>
                  </div>

                  {/* 4. View Transcript Accordion */}
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => toggleTranscript(card.id)}
                      className="w-full flex items-center justify-between text-xs text-muted-foreground hover:text-foreground font-medium py-1 transition-colors"
                    >
                      <span>{isTranscriptOpen ? "Hide Call Transcript" : "View Spoken Transcript"}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isTranscriptOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isTranscriptOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-2 p-3 rounded-lg bg-card border border-border/70 text-xs text-foreground/90 leading-relaxed font-sans shadow-inner">
                            <span className="font-semibold text-primary block mb-1">
                              Agent Script ({activeLang.label} — {activeVoice.voiceName}):
                            </span>
                            "{activeLang.script}"
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
