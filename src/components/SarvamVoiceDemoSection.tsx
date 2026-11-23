import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  Calendar,
  Building,
  Car,
  Truck,
  HeartPulse,
  TrendingUp,
  Receipt,
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
        female: { voiceName: "Aria", badge: "Studio Neural HD", audioUrl: "/audio/voice-demos/appointment-hinglish-female.mp3" },
        male: { voiceName: "Madhur", badge: "Neural Low-Latency", audioUrl: "/audio/voice-demos/appointment-hinglish-male.mp3" },
        context: "Patient calling to schedule a general physician consultation in fluid conversational Hinglish.",
      },
      {
        code: "hindi",
        label: "Hindi",
        flag: "🇮🇳",
        female: { voiceName: "Swara", badge: "Studio Neural HD", audioUrl: "/audio/voice-demos/appointment-hindi-female.mp3" },
        male: { voiceName: "Madhur", badge: "Neural Low-Latency", audioUrl: "/audio/voice-demos/appointment-hindi-male.mp3" },
        context: "क्लीनिक अपॉइंटमेंट बुकिंग और डॉक्टर उपलब्धता की जानकारी शुद्ध हिंदी में।",
      },
      {
        code: "us_english",
        label: "US English",
        flag: "🇺🇸",
        female: { voiceName: "Aria", badge: "Natural Conversational", audioUrl: "/audio/voice-demos/appointment-us-female.mp3" },
        male: { voiceName: "Marcus", badge: "Healthcare & Prior Auth", audioUrl: "/audio/voice-demos/appointment-us-male.mp3" },
        context: "Inbound clinic inquiry confirming symptoms, insurance coverage, and specialist doctor booking.",
      },
      {
        code: "uk_english",
        label: "UK English",
        flag: "🇬🇧",
        female: { voiceName: "Sarah", badge: "British RP", audioUrl: "/audio/voice-demos/appointment-uk-female.mp3" },
        male: { voiceName: "Oliver", badge: "British RP", audioUrl: "/audio/voice-demos/appointment-uk-male.mp3" },
        context: "Private clinic specialist consultation scheduling with polite British RP cadence.",
      },
      {
        code: "french",
        label: "French",
        flag: "🇫🇷",
        female: { voiceName: "Sophie", badge: "Parisian Neural", audioUrl: "/audio/voice-demos/appointment-french-female.mp3" },
        male: { voiceName: "Marc", badge: "Natural Native", audioUrl: "/audio/voice-demos/appointment-french-male.mp3" },
        context: "Prise de rendez-vous médical et confirmation instantanée en français.",
      },
      {
        code: "german",
        label: "German",
        flag: "🇩🇪",
        female: { voiceName: "Greta", badge: "Klinik Service", audioUrl: "/audio/voice-demos/appointment-german-female.mp3" },
        male: { voiceName: "Klaus", badge: "Fachberatung", audioUrl: "/audio/voice-demos/appointment-german-male.mp3" },
        context: "Arzttermin- und Fachberatungsbuchung auf Deutsch.",
      },
      {
        code: "spanish",
        label: "Spanish",
        flag: "🇪🇸",
        female: { voiceName: "Sofía", badge: "Citas Médicas", audioUrl: "/audio/voice-demos/appointment-spanish-female.mp3" },
        male: { voiceName: "Carlos", badge: "Atención Clínica", audioUrl: "/audio/voice-demos/appointment-spanish-male.mp3" },
        context: "Reserva de citas médicas y atención ambulatoria en español.",
      },
      {
        code: "tamil",
        label: "Tamil",
        flag: "🇮🇳",
        female: { voiceName: "Priya", badge: "மருத்துவ சேவை", audioUrl: "/audio/voice-demos/appointment-tamil-female.mp3" },
        male: { voiceName: "Karthik", badge: "ஆலோசனை", audioUrl: "/audio/voice-demos/appointment-tamil-male.mp3" },
        context: "தமிழ் மருத்துவ ஆலோசனை மற்றும் முன்பதிவு.",
      },
    ],
  },

  // Card 2: Sales Discovery & Qualification
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
        female: { voiceName: "Aria", badge: "Warm SDR", audioUrl: "/audio/voice-demos/sales-english-female.mp3" },
        male: { voiceName: "Marcus", badge: "Executive SDR", audioUrl: "/audio/voice-demos/sales-english-male.mp3" },
        context: "Qualifying B2B SaaS demo requests on tech stack, monthly chat volume, and decision timeline.",
      },
      {
        code: "hinglish",
        label: "Hinglish",
        flag: "🇮🇳",
        female: { voiceName: "Aria", badge: "Natural Indian", audioUrl: "/audio/voice-demos/sales-hinglish-female.mp3" },
        male: { voiceName: "Madhur", badge: "Conversational Pro", audioUrl: "/audio/voice-demos/sales-hinglish-male.mp3" },
        context: "Fast-growth Indian startup sales discovery call with natural language code-switching.",
      },
      {
        code: "us_english",
        label: "US English",
        flag: "🇺🇸",
        female: { voiceName: "Aria", badge: "US West Coast", audioUrl: "/audio/voice-demos/sales-english-female.mp3" },
        male: { voiceName: "Marcus", badge: "US Architecture", audioUrl: "/audio/voice-demos/sales-english-male.mp3" },
        context: "Inbound SaaS lead discovery, ROI justification, and calendar invite dispatch.",
      },
      {
        code: "uk_english",
        label: "UK English",
        flag: "🇬🇧",
        female: { voiceName: "Sarah", badge: "British RP", audioUrl: "/audio/voice-demos/sales-uk-female.mp3" },
        male: { voiceName: "Oliver", badge: "Executive Tone", audioUrl: "/audio/voice-demos/sales-uk-male.mp3" },
        context: "Enterprise discovery for EMEA market with native business accent.",
      },
      {
        code: "german",
        label: "German",
        flag: "🇩🇪",
        female: { voiceName: "Greta", badge: "Native Business", audioUrl: "/audio/voice-demos/sales-german-female.mp3" },
        male: { voiceName: "Klaus", badge: "Enterprise Native", audioUrl: "/audio/voice-demos/sales-german-male.mp3" },
        context: "B2B Vertriebsqualifizierung und Terminvereinbarung auf Deutsch.",
      },
      {
        code: "french",
        label: "French",
        flag: "🇫🇷",
        female: { voiceName: "Sophie", badge: "SDR Paris", audioUrl: "/audio/voice-demos/sales-french-female.mp3" },
        male: { voiceName: "Marc", badge: "Consultant B2B", audioUrl: "/audio/voice-demos/sales-french-male.mp3" },
        context: "Qualification commerciale B2B et démonstration logicielle en français.",
      },
      {
        code: "spanish",
        label: "Spanish",
        flag: "🇪🇸",
        female: { voiceName: "Sofía", badge: "Ventas B2B", audioUrl: "/audio/voice-demos/sales-spanish-female.mp3" },
        male: { voiceName: "Carlos", badge: "Ejecutivo SDR", audioUrl: "/audio/voice-demos/sales-spanish-male.mp3" },
        context: "Calificación de prospectos B2B y agendamiento de demostraciones en español.",
      },
      {
        code: "hindi",
        label: "Hindi",
        flag: "🇮🇳",
        female: { voiceName: "Swara", badge: "B2B सेल्स", audioUrl: "/audio/voice-demos/appointment-hindi-female.mp3" },
        male: { voiceName: "Madhur", badge: "बिज़नेस कंसल्टेंट", audioUrl: "/audio/voice-demos/appointment-hindi-male.mp3" },
        context: "बिज़नेस सॉफ्टवेयर समाधान और ऑटोमेशन पूछताछ हिंदी में।",
      },
    ],
  },

  // Card 3: EMI Reminder & Collections
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
        female: { voiceName: "Swara", badge: "Polite DLT", audioUrl: "/audio/voice-demos/emi-hindi-female.mp3" },
        male: { voiceName: "Madhur", badge: "Compliant Tone", audioUrl: "/audio/voice-demos/emi-hindi-male.mp3" },
        context: "सहानुभूतिपूर्ण और RBI/DLT-compliant भाषा में सुरक्षित ऋण भुगतान अनुस्मारक।",
      },
      {
        code: "tamil",
        label: "Tamil",
        flag: "🇮🇳",
        female: { voiceName: "Priya", badge: "DLT-Compliant", audioUrl: "/audio/voice-demos/emi-tamil-female.mp3" },
        male: { voiceName: "Karthik", badge: "Polite Tone", audioUrl: "/audio/voice-demos/emi-tamil-male.mp3" },
        context: "கடன் தவணை நினைவூட்டல் மற்றும் பாதுகாப்பான கட்டண இணைப்பு அனுப்புதல்.",
      },
      {
        code: "spanish",
        label: "Spanish",
        flag: "🇪🇸",
        female: { voiceName: "Sofía", badge: "Compliant BFSI", audioUrl: "/audio/voice-demos/emi-spanish-female.mp3" },
        male: { voiceName: "Carlos", badge: "Professional Tone", audioUrl: "/audio/voice-demos/emi-spanish-male.mp3" },
        context: "Recordatorio de cuota financiera con opciones de pago en línea inmediato.",
      },
      {
        code: "us_english",
        label: "US English",
        flag: "🇺🇸",
        female: { voiceName: "Aria", badge: "Financial Care", audioUrl: "/audio/voice-demos/sales-english-female.mp3" },
        male: { voiceName: "Marcus", badge: "Direct & Clear", audioUrl: "/audio/voice-demos/sales-english-male.mp3" },
        context: "Early-bucket customer payment reminder with secure digital payment processing.",
      },
      {
        code: "uk_english",
        label: "UK English",
        flag: "🇬🇧",
        female: { voiceName: "Sarah", badge: "Gentle Reminder", audioUrl: "/audio/voice-demos/sales-uk-female.mp3" },
        male: { voiceName: "Oliver", badge: "Formal & Clear", audioUrl: "/audio/voice-demos/sales-uk-male.mp3" },
        context: "Compliant financial reminder adhering strictly to consumer credit guidelines.",
      },
      {
        code: "hinglish",
        label: "Hinglish",
        flag: "🇮🇳",
        female: { voiceName: "Aria", badge: "Payment Support", audioUrl: "/audio/voice-demos/emi-hinglish-female.mp3" },
        male: { voiceName: "Madhur", badge: "Friendly Officer", audioUrl: "/audio/voice-demos/emi-hinglish-male.mp3" },
        context: "Courteous EMI reminder and digital payment link dispatch in conversational Hinglish.",
      },
      {
        code: "german",
        label: "German",
        flag: "🇩🇪",
        female: { voiceName: "Greta", badge: "Finanzwesen", audioUrl: "/audio/voice-demos/sales-german-female.mp3" },
        male: { voiceName: "Klaus", badge: "Zahlungsservice", audioUrl: "/audio/voice-demos/sales-german-male.mp3" },
        context: "Diskrete Zahlungserinnerung mit sicherem Zahlungslink auf Deutsch.",
      },
      {
        code: "french",
        label: "French",
        flag: "🇫🇷",
        female: { voiceName: "Sophie", badge: "Rappel Bancaire", audioUrl: "/audio/voice-demos/sales-french-female.mp3" },
        male: { voiceName: "Marc", badge: "Conseiller Crédit", audioUrl: "/audio/voice-demos/sales-french-male.mp3" },
        context: "Rappel d'échéance financière respectueux avec envoi de lien de paiement.",
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
        female: { voiceName: "Aria", badge: "Property Advisor", audioUrl: "/audio/voice-demos/sales-hinglish-female.mp3" },
        male: { voiceName: "Madhur", badge: "Senior Consultant", audioUrl: "/audio/voice-demos/sales-hinglish-male.mp3" },
        context: "High-intent buyer qualification (2BHK vs 3BHK, budget, possession) and weekend site visit booking in Hinglish.",
      },
      {
        code: "spanish",
        label: "Spanish",
        flag: "🇪🇸",
        female: { voiceName: "Sofía", badge: "Asesora Inmobiliaria", audioUrl: "/audio/voice-demos/sales-spanish-female.mp3" },
        male: { voiceName: "Carlos", badge: "Experto en Bienes Raíces", audioUrl: "/audio/voice-demos/sales-spanish-male.mp3" },
        context: "Calificación de compradores e inversores residenciales con visita presencial.",
      },
      {
        code: "us_english",
        label: "US English",
        flag: "🇺🇸",
        female: { voiceName: "Aria", badge: "Luxury Realty", audioUrl: "/audio/voice-demos/sales-english-female.mp3" },
        male: { voiceName: "Marcus", badge: "Advisory Voice", audioUrl: "/audio/voice-demos/sales-english-male.mp3" },
        context: "Residential property inquiry qualification, price estimation, and callback scheduling.",
      },
      {
        code: "uk_english",
        label: "UK English",
        flag: "🇬🇧",
        female: { voiceName: "Sarah", badge: "Prime Property", audioUrl: "/audio/voice-demos/sales-uk-female.mp3" },
        male: { voiceName: "Oliver", badge: "Prime Property", audioUrl: "/audio/voice-demos/sales-uk-male.mp3" },
        context: "Premium London real estate site visit coordination with authentic British RP accent.",
      },
      {
        code: "hindi",
        label: "Hindi",
        flag: "🇮🇳",
        female: { voiceName: "Swara", badge: "प्रॉपर्टी सलाहकार", audioUrl: "/audio/voice-demos/appointment-hindi-female.mp3" },
        male: { voiceName: "Madhur", badge: "साइट विज़िट", audioUrl: "/audio/voice-demos/appointment-hindi-male.mp3" },
        context: "प्रीमियम प्रॉपर्टी साइट विज़िट और 2BHK/3BHK चयन हिंदी में।",
      },
      {
        code: "german",
        label: "German",
        flag: "🇩🇪",
        female: { voiceName: "Greta", badge: "Immobilien", audioUrl: "/audio/voice-demos/sales-german-female.mp3" },
        male: { voiceName: "Klaus", badge: "Objektberater", audioUrl: "/audio/voice-demos/sales-german-male.mp3" },
        context: "Immobilienbesichtigung und Beratung auf Deutsch.",
      },
      {
        code: "french",
        label: "French",
        flag: "🇫🇷",
        female: { voiceName: "Sophie", badge: "Prestige Immobilier", audioUrl: "/audio/voice-demos/sales-french-female.mp3" },
        male: { voiceName: "Marc", badge: "Agent Immobilier", audioUrl: "/audio/voice-demos/sales-french-male.mp3" },
        context: "Visite de biens immobiliers de prestige et réservation en français.",
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
        female: { voiceName: "Sarah", badge: "Dealership Concierge", audioUrl: "/audio/voice-demos/sales-uk-female.mp3" },
        male: { voiceName: "Oliver", badge: "Service Specialist", audioUrl: "/audio/voice-demos/sales-uk-male.mp3" },
        context: "Automotive dealership booking test drives and annual maintenance appointments.",
      },
      {
        code: "hindi",
        label: "Hindi",
        flag: "🇮🇳",
        female: { voiceName: "Swara", badge: "Showroom Assistant", audioUrl: "/audio/voice-demos/appointment-hindi-female.mp3" },
        male: { voiceName: "Madhur", badge: "Service Advisor", audioUrl: "/audio/voice-demos/appointment-hindi-male.mp3" },
        context: "शोरूम टेस्ट ड्राइव और अधिकृत सर्विस सेंटर अपॉइंटमेंट बुकिंग हिंदी में।",
      },
      {
        code: "us_english",
        label: "US English",
        flag: "🇺🇸",
        female: { voiceName: "Aria", badge: "Sales Advisor", audioUrl: "/audio/voice-demos/sales-english-female.mp3" },
        male: { voiceName: "Marcus", badge: "Service Manager", audioUrl: "/audio/voice-demos/sales-english-male.mp3" },
        context: "US automotive dealership test drive scheduling and trim level configuration.",
      },
      {
        code: "french",
        label: "French",
        flag: "🇫🇷",
        female: { voiceName: "Sophie", badge: "Conseillère Auto", audioUrl: "/audio/voice-demos/sales-french-female.mp3" },
        male: { voiceName: "Marc", badge: "Expert Concession", audioUrl: "/audio/voice-demos/sales-french-male.mp3" },
        context: "Réservation d'essais automobiles et entretiens périodiques en concession.",
      },
      {
        code: "german",
        label: "German",
        flag: "🇩🇪",
        female: { voiceName: "Greta", badge: "Autohaus Service", audioUrl: "/audio/voice-demos/sales-german-female.mp3" },
        male: { voiceName: "Klaus", badge: "Werkstattleiter", audioUrl: "/audio/voice-demos/sales-german-male.mp3" },
        context: "Probefahrtvereinbarung und Werkstattservice auf Deutsch.",
      },
      {
        code: "hinglish",
        label: "Hinglish",
        flag: "🇮🇳",
        female: { voiceName: "Aria", badge: "Dealership Concierge", audioUrl: "/audio/voice-demos/appointment-hinglish-female.mp3" },
        male: { voiceName: "Madhur", badge: "Test Drive Advisor", audioUrl: "/audio/voice-demos/appointment-hinglish-male.mp3" },
        context: "New car showroom test drive booking and weekend VIP slots in Hinglish.",
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
        female: { voiceName: "Greta", badge: "Express Support", audioUrl: "/audio/voice-demos/sales-german-female.mp3" },
        male: { voiceName: "Klaus", badge: "Logistik Assistent", audioUrl: "/audio/voice-demos/sales-german-male.mp3" },
        context: "Automatische Lieferbenachrichtigung und Adressbestätigung für Expresssendungen.",
      },
      {
        code: "hindi",
        label: "Hindi",
        flag: "🇮🇳",
        female: { voiceName: "Swara", badge: "डिस्पैच सपोर्ट", audioUrl: "/audio/voice-demos/appointment-hindi-female.mp3" },
        male: { voiceName: "Madhur", badge: "डिलीवरी मैनेजर", audioUrl: "/audio/voice-demos/appointment-hindi-male.mp3" },
        context: "COD पता सत्यापन और ग्राहक डिलीवरी समय स्लॉट पुष्टि।",
      },
      {
        code: "english",
        label: "English",
        flag: "🌐",
        female: { voiceName: "Aria", badge: "Dispatch Desk", audioUrl: "/audio/voice-demos/sales-english-female.mp3" },
        male: { voiceName: "Marcus", badge: "Courier Lead", audioUrl: "/audio/voice-demos/sales-english-male.mp3" },
        context: "Real-time delivery verification, ETA notification, and gate entry code verification.",
      },
      {
        code: "uk_english",
        label: "UK English",
        flag: "🇬🇧",
        female: { voiceName: "Sarah", badge: "Customer Care", audioUrl: "/audio/voice-demos/sales-uk-female.mp3" },
        male: { voiceName: "Oliver", badge: "Operations", audioUrl: "/audio/voice-demos/sales-uk-male.mp3" },
        context: "UK courier service resolving delivery timeframes and safe place instructions.",
      },
      {
        code: "spanish",
        label: "Spanish",
        flag: "🇪🇸",
        female: { voiceName: "Sofía", badge: "Despacho Logístico", audioUrl: "/audio/voice-demos/sales-spanish-female.mp3" },
        male: { voiceName: "Carlos", badge: "Coordinador Envíos", audioUrl: "/audio/voice-demos/sales-spanish-male.mp3" },
        context: "Seguimiento de envíos, despacho aduanero y verificación de entrega en español.",
      },
      {
        code: "french",
        label: "French",
        flag: "🇫🇷",
        female: { voiceName: "Sophie", badge: "Suivi Colis", audioUrl: "/audio/voice-demos/sales-french-female.mp3" },
        male: { voiceName: "Marc", badge: "Logistique Express", audioUrl: "/audio/voice-demos/sales-french-male.mp3" },
        context: "Confirmation de livraison de fret et suivi de dédouanement en français.",
      },
    ],
  },
];

export default function SarvamVoiceDemoSection() {
  // Global Audio Player Reference ensuring single audio stream
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Audio Preload Cache Pool for instant 0ms latency playback
  const audioCacheRef = useRef<Map<string, HTMLAudioElement>>(new Map());

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

  // Helper to get or preload audio
  const getAudio = (url: string) => {
    if (typeof window === "undefined") return null;
    if (!audioCacheRef.current.has(url)) {
      const a = new Audio(url);
      a.preload = "auto";
      audioCacheRef.current.set(url, a);
    }
    return audioCacheRef.current.get(url)!;
  };

  // Preload visible cards' active audio tracks for instant zero-latency playback
  useEffect(() => {
    if (typeof window === "undefined") return;
    DEMO_CARDS.slice(0, 3).forEach((card) => {
      const state = cardStates[card.id];
      if (state) {
        const lang = card.languages.find((l) => l.code === state.lang) || card.languages[0];
        const voice = state.gender === "female" ? lang.female : lang.male;
        getAudio(voice.audioUrl);
      }
    });
  }, [cardStates]);

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
      audioRef.current.currentTime = 0;
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

    const audio = getAudio(audioUrl) || new Audio(audioUrl);
    audioRef.current = audio;
    audio.currentTime = 0;

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
      .then(() => {
        setPlayingCardId(card.id);
        if (audio.duration) {
          setDuration(audio.duration);
        }
      })
      .catch((err) => {
        console.warn("Audio playback prevented:", err);
        setPlayingCardId(null);
      });
  };

  const handleGenderSwitch = (cardId: string, newGender: Gender) => {
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
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
