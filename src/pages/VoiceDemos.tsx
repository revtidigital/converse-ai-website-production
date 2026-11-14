import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ExternalLink,
  Sparkles,
  PhoneCall,
  Calendar,
  Users,
  CreditCard,
  Building2,
  ShoppingCart,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Radio,
  ArrowRight,
  ChevronRight,
  Headphones,
  RotateCcw,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

// ── Types ────────────────────────────────────────────────────────────────────────

type LanguageKey = "hindi" | "uk_english" | "us_english" | "spanish" | "german";

interface TranscriptTurn {
  speaker: "caller" | "agent";
  text: string;
}

interface LanguageAudioVariant {
  label: string;
  flag: string;
  accent: string;
  audioSrc?: string;
  duration: string;
  turns: TranscriptTurn[];
}

interface VoiceUseCase {
  id: string;
  title: string;
  category: "booking" | "sales" | "collections" | "ecommerce" | "insurance";
  description: string;
  iconBg: string;
  iconColor: string;
  agentName: string;
  statsBadge: string;
  variants: Record<LanguageKey, LanguageAudioVariant>;
}

// ── 6 Sarvam-Style Voice AI Use-Cases Data ──────────────────────────────────────

const VOICE_USE_CASES: VoiceUseCase[] = [
  {
    id: "appointment-management",
    title: "Appointment management",
    category: "booking",
    description: "Turn customer calls into instant bookings, reschedules, and confirmations with an AI voice agent.",
    iconBg: "bg-blue-50 border-blue-200 text-blue-600",
    iconColor: "#2563EB",
    agentName: "Aria (Scheduler)",
    statsBadge: "⚡ 92% First-Call Booking Rate",
    variants: {
      hindi: {
        label: "Hindi",
        flag: "🇮🇳",
        accent: "Conversational Hindi",
        audioSrc: "/audio/Hindi (2).mp3",
        duration: "0:36",
        turns: [
          { speaker: "caller", text: "नमस्ते, मुझे डॉक्टर शर्मा के साथ अपना अपॉइंटमेंट रीशेड्यूल करना था।" },
          { speaker: "agent", text: "नमस्ते! बिल्कुल, मैं इसमें आपकी सहायता कर सकती हूँ। आपका रजिस्टर्ड मोबाइल नंबर क्या है?" },
          { speaker: "caller", text: "98765 43210." },
          { speaker: "agent", text: "धन्यवाद। डॉक्टर शर्मा के लिए कल दोपहर 3:00 बजे और परसों सुबह 11:30 बजे स्लॉट खाली हैं। आपके लिए कौन सा समय सही रहेगा?" },
          { speaker: "caller", text: "कल दोपहर 3:00 बजे का कर दीजिए।" },
          { speaker: "agent", text: "बढ़िया! आपका अपॉइंटमेंट कल दोपहर 3:00 बजे के लिए कन्फर्म कर दिया गया है। कन्फर्मेशन SMS और WhatsApp आपके नंबर पर भेज दिया गया है।" },
        ],
      },
      uk_english: {
        label: "UK English",
        flag: "🇬🇧",
        accent: "British RP Accent",
        duration: "0:34",
        turns: [
          { speaker: "caller", text: "Hello, I'd like to reschedule my dental consultation for this week." },
          { speaker: "agent", text: "Good afternoon! I'd be delighted to assist you with that. May I take your full name, please?" },
          { speaker: "caller", text: "It's Oliver Wright." },
          { speaker: "agent", text: "Thank you, Oliver. We have an opening with Dr. Harris this Thursday at 2:15 PM, or Friday morning at 10:00 AM. Which suits you better?" },
          { speaker: "caller", text: "Thursday afternoon works splendidly, thanks." },
          { speaker: "agent", text: "Splendid! You're booked for Thursday at 2:15 PM. A confirmation email and calendar invite have been sent over. Have a wonderful day!" },
        ],
      },
      us_english: {
        label: "US English",
        flag: "🇺🇸",
        accent: "Standard American",
        audioSrc: "/audio/english-sdr.mp3",
        duration: "0:32",
        turns: [
          { speaker: "caller", text: "Hi, I need to push my appointment back by a couple of days." },
          { speaker: "agent", text: "Sure thing! I can help you find a new time slot right away. Could you verify your phone number?" },
          { speaker: "caller", text: "Sure, it's 415-555-0198." },
          { speaker: "agent", text: "Got it! We have Thursday at 1:00 PM or Friday at 3:30 PM open. Which one fits your schedule?" },
          { speaker: "caller", text: "Let's go with Friday at 3:30." },
          { speaker: "agent", text: "All set! Your appointment is rescheduled for Friday at 3:30 PM. You'll receive a confirmation text shortly." },
        ],
      },
      spanish: {
        label: "Spanish",
        flag: "🇪🇸",
        accent: "European Spanish (Castilian)",
        audioSrc: "/audio/spanish-real-estate.mp3",
        duration: "0:35",
        turns: [
          { speaker: "caller", text: "Hola, buenos días. Quería cambiar la hora de mi cita médica." },
          { speaker: "agent", text: "¡Hola! Por supuesto, le ayudo con mucho gusto. ¿Me indica su nombre y apellidos, por favor?" },
          { speaker: "caller", text: "Carlos Martínez." },
          { speaker: "agent", text: "Gracias, Carlos. Tenemos disponibilidad el jueves a las 16:00 o el viernes a las 11:00. ¿Cuál prefiere?" },
          { speaker: "caller", text: "El jueves por la tarde me viene perfecto." },
          { speaker: "agent", text: "Perfecto. Su cita queda confirmada para este jueves a las 16:00. Le hemos enviado la confirmación por SMS." },
        ],
      },
      german: {
        label: "German",
        flag: "🇩🇪",
        accent: "Standard Deutsch",
        duration: "0:33",
        turns: [
          { speaker: "caller", text: "Guten Tag, ich möchte meinen Beratungstermin verschieben." },
          { speaker: "agent", text: "Guten Tag! Gerne helfe ich Ihnen dabei weiter. Wie lautet Ihre Kundennummer oder Ihr Name?" },
          { speaker: "caller", text: "Stefan Weber." },
          { speaker: "agent", text: "Vielen Dank, Herr Weber. Wir haben Donnerstag um 14:00 Uhr oder Freitag um 10:30 Uhr frei. Was passt Ihnen besser?" },
          { speaker: "caller", text: "Donnerstag um 14:00 Uhr passt sehr gut." },
          { speaker: "agent", text: "Ausgezeichnet! Ihr Termin am Donnerstag um 14:00 Uhr ist bestätigt. Die Bestätigung ist per E-Mail unterwegs." },
        ],
      },
    },
  },
  {
    id: "sales-discovery",
    title: "Sales discovery",
    category: "sales",
    description: "Meet Ananya: the AI voice agent that turns warm leads into booked meetings.",
    iconBg: "bg-emerald-50 border-emerald-200 text-emerald-600",
    iconColor: "#059669",
    agentName: "Ananya (SDR Agent)",
    statsBadge: "🎯 3.8x More Qualified Meetings",
    variants: {
      hindi: {
        label: "Hindi / Hinglish",
        flag: "🇮🇳",
        accent: "Natural Urban Hinglish",
        audioSrc: "/audio/Hinglish (2).mp3",
        duration: "0:40",
        turns: [
          { speaker: "agent", text: "Hi Rohan! Main ConverseAI se Ananya bol rahi hoon. Aapne hamari website pe Voice AI automation ke liye enquiry submit ki thi?" },
          { speaker: "caller", text: "Haan Ananya, humare call center ke liye hum voice agent evaluate kar rahe hain." },
          { speaker: "agent", text: "Great! Roughly aapki team per month kitne inbound calls handle karti hai?" },
          { speaker: "caller", text: "Around 40,000 to 50,000 calls monthly." },
          { speaker: "agent", text: "Perfect, yeh scale humare enterprise telephony stack me seamlessly automate ho sakta hai with 450ms latency. Main kal 3 PM hamare Senior Solutions Architect ke sath ek 20-minute live demo schedule kar doon?" },
          { speaker: "caller", text: "Haan kal 3 baje ka slot perfect rahega." },
        ],
      },
      uk_english: {
        label: "UK English",
        flag: "🇬🇧",
        accent: "London Professional",
        audioSrc: "/audio/english-sdr.mp3",
        duration: "0:38",
        turns: [
          { speaker: "agent", text: "Good afternoon! This is Ananya from ConverseAI. I noticed you recently explored our enterprise voice stack on our site." },
          { speaker: "caller", text: "Yes, indeed. We're looking to automate our frontline qualification calls." },
          { speaker: "agent", text: "Splendid. And how many reps are currently dedicating hours to cold outreach?" },
          { speaker: "caller", text: "We have about twelve SDRs spending roughly three hours daily." },
          { speaker: "agent", text: "Understood. Our Voice AI can autonomously handle initial qualification and book warm handoffs straight into your reps' diaries. Shall we set up a brief 20-minute walkthrough this Thursday at 2 PM?" },
          { speaker: "caller", text: "Thursday at 2 PM sounds spot on. Please send over the invite." },
        ],
      },
      us_english: {
        label: "US English",
        flag: "🇺🇸",
        accent: "Tech Sales American",
        audioSrc: "/audio/english-sdr.mp3",
        duration: "0:35",
        turns: [
          { speaker: "agent", text: "Hey David, Ananya here with ConverseAI. Saw you checked out our API docs for voice agents — did you find what you were looking for?" },
          { speaker: "caller", text: "Yeah, we're building an outbound workflow and need sub-second response times." },
          { speaker: "agent", text: "You're in the right place. Our Groq Whisper plus ElevenLabs pipeline clocks in under 480 milliseconds end-to-end. Are you available for a quick technical deep-dive tomorrow at 11 AM PST?" },
          { speaker: "caller", text: "Tomorrow at 11 AM works great. Let's do it." },
        ],
      },
      spanish: {
        label: "Spanish",
        flag: "🇪🇸",
        accent: "Madrid Business",
        audioSrc: "/audio/spanish-real-estate.mp3",
        duration: "0:36",
        turns: [
          { speaker: "agent", text: "Buenos días, le llama Ananya de ConverseAI. Vi que solicitó información sobre nuestros agentes de voz con IA." },
          { speaker: "caller", text: "Sí, queremos automatizar las llamadas entrantes de nuestros clientes comerciales." },
          { speaker: "agent", text: "Excelente. Podemos integrar el sistema con su centralita telefónica en cuestión de días. ¿Le vendría bien una demo personalizada este miércoles a las 11:00?" },
          { speaker: "caller", text: "Miércoles a las 11:00 me va muy bien, gracias." },
        ],
      },
      german: {
        label: "German",
        flag: "🇩🇪",
        accent: "Frankfurt Corporate",
        duration: "0:35",
        turns: [
          { speaker: "agent", text: "Guten Tag, hier ist Ananya von ConverseAI. Sie haben sich für unsere KI-Sprachagenten interessiert?" },
          { speaker: "caller", text: "Guten Tag! Ja, wir prüfen derzeit Lösungen für unseren B2B-Vertrieb." },
          { speaker: "agent", text: "Hervorragend. Unsere Lösung lässt sich nahtlos in Salesforce und HubSpot einbinden. Hätten Sie am Donnerstag um 14:00 Uhr Zeit für eine kurze Online-Demo?" },
          { speaker: "caller", text: "Ja, Donnerstag um 14:00 Uhr passt ausgezeichnet." },
        ],
      },
    },
  },
  {
    id: "emi-collection",
    title: "EMI Collection",
    category: "collections",
    description: "An AI collections agent that manages EMI reminders and simplifies customer payments",
    iconBg: "bg-indigo-50 border-indigo-200 text-indigo-600",
    iconColor: "#4F46E5",
    agentName: "Priya (Collections Agent)",
    statsBadge: "💳 DLT & RBI Compliant • +34% Recovery",
    variants: {
      hindi: {
        label: "Hindi",
        flag: "🇮🇳",
        accent: "Courteous Hindi",
        audioSrc: "/audio/tamil-collections.mp3",
        duration: "0:38",
        turns: [
          { speaker: "agent", text: "नमस्ते श्रीमान वर्मा, मैं FinCare से Priya बोल रही हूँ। क्या मेरी बात अमित जी से हो रही है?" },
          { speaker: "caller", text: "हाँ, बोलिए क्या बात है?" },
          { speaker: "agent", text: "अमित जी, आपके पर्सनल लोन अकाउंट की इस महीने की ₹4,850 की EMI देय है। क्या आप इसे आज प्रोसेस कर सकते हैं?" },
          { speaker: "caller", text: "हाँ, मैं शाम तक कर दूंगा। मुझे लिंक भेज दीजिए।" },
          { speaker: "agent", text: "बिल्कुल! मैंने आपके रजिस्टर्ड मोबाइल नंबर पर एक सुरक्षित UPI पेमेंट लिंक SMS और WhatsApp द्वारा भेज दिया है। समय पर भुगतान से आपका सिबिल स्कोर सुरक्षित रहेगा। धन्यवाद!" },
        ],
      },
      uk_english: {
        label: "UK English",
        flag: "🇬🇧",
        accent: "British Formal",
        duration: "0:36",
        turns: [
          { speaker: "agent", text: "Good morning, am I speaking with Mr. James Richardson?" },
          { speaker: "caller", text: "Speaking, who is this?" },
          { speaker: "agent", text: "This is Priya calling on behalf of Apex Finance. We noticed your monthly vehicle instalment of £285 is currently overdue. Would you like to clear this today via instant bank transfer?" },
          { speaker: "caller", text: "Yes, apologies for the delay. Could you text me the secure payment link?" },
          { speaker: "agent", text: "Certainly, James. A secure payment link has been dispatched to your mobile number ending in 410. Thank you for your cooperation." },
        ],
      },
      us_english: {
        label: "US English",
        flag: "🇺🇸",
        accent: "Professional American",
        audioSrc: "/audio/english-sdr.mp3",
        duration: "0:34",
        turns: [
          { speaker: "agent", text: "Hello, this is Priya with Horizon Lending. I'm reaching out regarding your account balance of $320 due on the 10th." },
          { speaker: "caller", text: "Hi Priya, can I pay that over the phone right now?" },
          { speaker: "agent", text: "I can transfer you to our secure automated IVR, or text a 1-tap checkout link directly to your cell. Which do you prefer?" },
          { speaker: "caller", text: "Text me the link, that's much faster." },
          { speaker: "agent", text: "Done! The secure payment link is on its way. Have a great day!" },
        ],
      },
      spanish: {
        label: "Spanish",
        flag: "🇪🇸",
        accent: "Castilian Professional",
        audioSrc: "/audio/spanish-real-estate.mp3",
        duration: "0:35",
        turns: [
          { speaker: "agent", text: "Buenos días, le llama Priya de CrediFin. ¿Hablo con el señor Javier Ruiz?" },
          { speaker: "caller", text: "Sí, soy yo." },
          { speaker: "agent", text: "Señor Ruiz, nos comunicamos para recordarle que su cuota mensual de 210 euros vence mañana. ¿Desea que le enviemos un enlace de pago seguro a su móvil?" },
          { speaker: "caller", text: "Sí, por favor, envíamelo por Bizum o SMS." },
          { speaker: "agent", text: "Perfecto. Enlace enviado con éxito. Muchas gracias y que tenga buen día." },
        ],
      },
      german: {
        label: "German",
        flag: "🇩🇪",
        accent: "German Formal",
        duration: "0:34",
        turns: [
          { speaker: "agent", text: "Guten Tag, hier ist Priya von der FinanzBank. Spreche ich mit Herrn Michael Braun?" },
          { speaker: "caller", text: "Ja, am Apparat." },
          { speaker: "agent", text: "Herr Braun, Ihre monatliche Rate von 245 Euro ist fällig. Möchten Sie die Zahlung jetzt bequem per Zahlungslink begleichen?" },
          { speaker: "caller", text: "Ja, senden Sie mir bitte den Link auf mein Smartphone." },
          { speaker: "agent", text: "Gerne! Der sichere Zahlungslink wurde soeben per SMS versendet. Vielen Dank und einen schönen Tag." },
        ],
      },
    },
  },
  {
    id: "real-estate-qualification",
    title: "Real Estate Lead Qualification",
    category: "sales",
    description: "An AI agent that turns property inquiries into qualified, booked site visits",
    iconBg: "bg-amber-50 border-amber-200 text-amber-600",
    iconColor: "#D97706",
    agentName: "Maya (Property Advisor)",
    statsBadge: "🏡 4.2x More Site Visits Booked",
    variants: {
      hindi: {
        label: "Hindi / Hinglish",
        flag: "🇮🇳",
        accent: "Real Estate Hinglish",
        audioSrc: "/audio/hindi-appointment.mp3",
        duration: "0:42",
        turns: [
          { speaker: "agent", text: "Hello! Main Grand Vista Properties se Maya baat kar rahi hoon. Aapne hamare Luxury 3BHK flats ke liye inquiry submit ki thi?" },
          { speaker: "caller", text: "Haan Maya, mujhe Golf Course Road wale project ke baare me janna tha." },
          { speaker: "agent", text: "Bohat accha project hai sir! Roughly aapka budget range kya hai — 2.5 Crore ya 3.5 Crore ke aas-paas?" },
          { speaker: "caller", text: "Around 3 Crore, aur mujhe ready-to-move ya 6 months me possession chahiye." },
          { speaker: "agent", text: "Hamare paas Phase-2 me do ready units available hain. Is Saturday subah 11 baje aapka private site tour arrange kar doon?" },
          { speaker: "caller", text: "Haan Saturday 11 AM perfect rahega." },
        ],
      },
      uk_english: {
        label: "UK English",
        flag: "🇬🇧",
        accent: "High-End London Realtor",
        audioSrc: "/audio/english-sdr.mp3",
        duration: "0:39",
        turns: [
          { speaker: "agent", text: "Good afternoon. Maya calling from Kensington Prime Properties regarding your enquiry on our Canary Wharf riverside apartments." },
          { speaker: "caller", text: "Hello! Yes, I was interested in the two-bedroom penthouse suite." },
          { speaker: "agent", text: "Splendid choice. Are you looking to purchase as an investment or for personal residence?" },
          { speaker: "caller", text: "Personal residence, hoping to move in by late autumn." },
          { speaker: "agent", text: "Marvellous. We have a dedicated viewing slot available this Saturday at 11:30 AM. Would you like me to reserve that for you?" },
          { speaker: "caller", text: "Yes, please do. Send the gate access code to my email." },
        ],
      },
      us_english: {
        label: "US English",
        flag: "🇺🇸",
        accent: "Miami / West Coast Realtor",
        audioSrc: "/audio/english-sdr.mp3",
        duration: "0:36",
        turns: [
          { speaker: "agent", text: "Hi there! Maya with Metro Luxury Living following up on the modern townhomes in Austin." },
          { speaker: "caller", text: "Hey Maya! Are there any corner units left with two-car garages?" },
          { speaker: "agent", text: "Yes, unit 4B just opened up today! What's your target move-in timeline?" },
          { speaker: "caller", text: "Within the next 60 days." },
          { speaker: "agent", text: "Awesome! Let's get you in for an exclusive VIP walkthrough this Sunday at 2:00 PM. How does that sound?" },
          { speaker: "caller", text: "Sounds like a plan. See you Sunday!" },
        ],
      },
      spanish: {
        label: "Spanish",
        flag: "🇪🇸",
        accent: "Costa del Sol Luxury",
        audioSrc: "/audio/spanish-real-estate.mp3",
        duration: "0:38",
        turns: [
          { speaker: "agent", text: "Hola, le habla Maya de Inmobiliaria Costa Sol. Recibimos su solicitud para la villa con vistas al mar en Marbella." },
          { speaker: "caller", text: "Hola, sí, quisiéramos saber si dispone de piscina privada y licencia turística." },
          { speaker: "agent", text: "Sí, cuenta con piscina climatizada y licencia en regla. ¿Le gustaría realizar una visita privada este sábado a las doce?" },
          { speaker: "caller", text: "Perfecto, este sábado a las doce nos viene de maravilla." },
        ],
      },
      german: {
        label: "German",
        flag: "🇩🇪",
        accent: "Munich Real Estate",
        duration: "0:37",
        turns: [
          { speaker: "agent", text: "Guten Tag, Maya von Premium Immobilien hier. Sie haben Interesse an unseren Neubauwohnungen in München bekundet?" },
          { speaker: "caller", text: "Ja, genau. Ich suche eine 3-Zimmer-Wohnung mit Balkon." },
          { speaker: "agent", text: "Wir haben genau zwei Einheiten verfügbar. Dürfen wir Sie zu einer Besichtigung am Freitag um 15:00 Uhr einladen?" },
          { speaker: "caller", text: "Freitag um 15:00 Uhr passt mir sehr gut." },
        ],
      },
    },
  },
  {
    id: "cart-recovery",
    title: "Cart Recovery",
    category: "ecommerce",
    description: "An AI sales agent that turns abandoned carts into completed orders over the phone.",
    iconBg: "bg-rose-50 border-rose-200 text-rose-600",
    iconColor: "#E11D48",
    agentName: "Tara (D2C Checkout Concierge)",
    statsBadge: "🛍️ +27% Abandoned Cart Checkout Rate",
    variants: {
      hindi: {
        label: "Hindi / Hinglish",
        flag: "🇮🇳",
        accent: "Warm E-Commerce Hinglish",
        audioSrc: "/audio/hinglish-d2c.mp3",
        duration: "0:37",
        turns: [
          { speaker: "agent", text: "Hello Rahul ji! Main UrbanFashion se Tara bol rahi hoon. Maine notice kiya aapne apne cart me Premium Leather Jacket add ki thi but checkout complete nahi ho paya?" },
          { speaker: "caller", text: "Haan Tara, actually online payment fail ho gaya tha toh maine chhod diya." },
          { speaker: "agent", text: "Arey koi baat nahi sir! Hum aapke liye Cash on Delivery enable kar sakte hain, plus 10% instant checkout discount bhi apply kar diya hai. Kya main abhi order confirm kar doon?" },
          { speaker: "caller", text: "Arre waah! Haan please COD pe book kar do." },
          { speaker: "agent", text: "Superb! Order #UF-9842 confirm ho gaya hai. Tuesday tak delivery ho jayegi. Thank you for shopping with us!" },
        ],
      },
      uk_english: {
        label: "UK English",
        flag: "🇬🇧",
        accent: "British Concierge",
        duration: "0:35",
        turns: [
          { speaker: "agent", text: "Hello Sarah! This is Tara calling from Bloom & Heritage. We noticed you left a pair of handcrafted leather boots in your shopping bag." },
          { speaker: "caller", text: "Oh hello! Yes, I was hesitating on whether the size 5 fits true to size." },
          { speaker: "agent", text: "They run true to size, and we offer free 30-day exchanges just in case. Plus, I can apply free express delivery right now if you'd like to complete it?" },
          { speaker: "caller", text: "That's brilliant! Could you send me the 1-click checkout link?" },
          { speaker: "agent", text: "Sent directly to your WhatsApp. Thank you for shopping with us!" },
        ],
      },
      us_english: {
        label: "US English",
        flag: "🇺🇸",
        accent: "D2C American Brand Voice",
        audioSrc: "/audio/english-sdr.mp3",
        duration: "0:34",
        turns: [
          { speaker: "agent", text: "Hey Alex! Tara from Apex Performance Gear here. Saw you were checking out the Carbon Fiber road bike helmet earlier." },
          { speaker: "caller", text: "Hey! Yeah, my card threw an authorization error at checkout." },
          { speaker: "agent", text: "No worries at all! I can shoot you an Apple Pay / Google Pay one-tap link with a 15% VIP discount code applied. Sound good?" },
          { speaker: "caller", text: "Sweet! Send it over to my phone." },
          { speaker: "agent", text: "Just sent! You're good to go. Catch you on the trails!" },
        ],
      },
      spanish: {
        label: "Spanish",
        flag: "🇪🇸",
        accent: "European Spanish Friendly",
        audioSrc: "/audio/spanish-real-estate.mp3",
        duration: "0:35",
        turns: [
          { speaker: "agent", text: "¡Hola Laura! Te llama Tara de ModaTrendy. Vimos que dejaste un vestido de fiesta en tu carrito de compra." },
          { speaker: "caller", text: "Hola, sí, tenía dudas con el plazo de entrega antes del sábado." },
          { speaker: "agent", text: "No te preocupes, te activamos el envío exprés gratuito y te llega este viernes. ¿Te confirmamos el pedido?" },
          { speaker: "caller", text: "¡Qué bien! Sí, confírmalo por favor." },
        ],
      },
      german: {
        label: "German",
        flag: "🇩🇪",
        accent: "German E-Commerce",
        duration: "0:33",
        turns: [
          { speaker: "agent", text: "Hallo Herr Schmidt! Tara von SportWelt hier. Sie hatten Laufschuhe in Ihrem Warenkorb hinterlassen." },
          { speaker: "caller", text: "Guten Tag. Ja, die Bezahlung mit PayPal hat kurz abgebrochen." },
          { speaker: "agent", text: "Kein Problem! Wir können den Kauf auf Rechnung mit Klarna aktivieren, inklusive gratis Versand. Sollen wir das buchen?" },
          { speaker: "caller", text: "Ja bitte, das ist sehr bequem." },
        ],
      },
    },
  },
  {
    id: "health-insurance-renewal",
    title: "Health Insurance Renewal Reminder",
    category: "insurance",
    description: "An AI voice agent that calls policyholders to confirm health insurance renewals.",
    iconBg: "bg-purple-50 border-purple-200 text-purple-600",
    iconColor: "#7C3AED",
    agentName: "Kavita (Insurance Specialist)",
    statsBadge: "📋 +41% On-Time Policy Renewals",
    variants: {
      hindi: {
        label: "Hindi",
        flag: "🇮🇳",
        accent: "Clear Professional Hindi",
        audioSrc: "/audio/Hindi (2).mp3",
        duration: "0:39",
        turns: [
          { speaker: "agent", text: "नमस्ते राजीव जी! मैं CarePlus Health Insurance से Kavita बोल रही हूँ। आपकी ₹10 लाख वाली फैमिली हेल्थ पॉलिसी 25 तारीख को expire हो रही है।" },
          { speaker: "caller", text: "नमस्ते। हाँ मुझे renew कराना है, क्या इस बार No Claim Bonus मिलेगा?" },
          { speaker: "agent", text: "जी बिल्कुल राजीव जी! इस वर्ष क्लेम-फ्री रहने के कारण आपको 20% का No Claim Bonus मिला है, जिससे आपका सम-इन्शURED ₹12 लाख हो गया है बिना किसी एक्स्ट्रा प्रीमियम के।" },
          { speaker: "caller", text: "अरे बहुत बढ़िया! मुझे लिंक भेज दीजिए, मैं तुरंत पेमेंट कर देता हूँ।" },
          { speaker: "agent", text: "लिंक आपके WhatsApp और SMS पर भेज दिया गया है। पॉलिसी 5 मिनट में रिन्यू हो जाएगी। सुरक्षित रहिए!" },
        ],
      },
      uk_english: {
        label: "UK English",
        flag: "🇬🇧",
        accent: "British Insurance Advisor",
        duration: "0:36",
        turns: [
          { speaker: "agent", text: "Good afternoon, Mr. Davies. Kavita calling from VitalHealth Insurance. Your comprehensive healthcare policy is due for annual renewal on the 30th." },
          { speaker: "caller", text: "Hello Kavita. Yes, has the monthly premium changed at all?" },
          { speaker: "agent", text: "Your premium remains fixed at £64 per month, and your zero-excess dental cover carries forward. Would you like to renew with your existing direct debit?" },
          { speaker: "caller", text: "Yes please, keep the direct debit active." },
          { speaker: "agent", text: "Brilliant. Your renewal is locked in for another 12 months. Your updated policy documents have been sent via email." },
        ],
      },
      us_english: {
        label: "US English",
        flag: "🇺🇸",
        accent: "US Healthcare Specialist",
        audioSrc: "/audio/english-sdr.mp3",
        duration: "0:35",
        turns: [
          { speaker: "agent", text: "Hi Mark, Kavita with Premier Health Partners. Reaching out because open enrollment for your family health plan closes this Friday." },
          { speaker: "caller", text: "Hey Kavita, can I keep my current doctors under the same silver tier?" },
          { speaker: "agent", text: "Yes! All your in-network physicians and pharmacy coverage remain identical. With your wellness discount, your premium is $385/mo. Shall I re-enroll you now?" },
          { speaker: "caller", text: "Yes please, re-enroll me today." },
          { speaker: "agent", text: "You're all confirmed for 2027! Confirmation details have been emailed to you." },
        ],
      },
      spanish: {
        label: "Spanish",
        flag: "🇪🇸",
        accent: "European Spanish Healthcare",
        audioSrc: "/audio/spanish-real-estate.mp3",
        duration: "0:36",
        turns: [
          { speaker: "agent", text: "Buenos días, le llama Kavita de SegurosSalud. Nos ponemos en contacto porque su póliza familiar vence a fin de mes." },
          { speaker: "caller", text: "Hola Kavita. ¿Mantenemos la cobertura dental y hospitalaria sin copago?" },
          { speaker: "agent", text: "Así es, se mantienen todas las coberturas y sin aumento de cuota. ¿Desea que procesemos la renovación automática?" },
          { speaker: "caller", text: "Sí, por favor, procédala." },
        ],
      },
      german: {
        label: "German",
        flag: "🇩🇪",
        accent: "German Insurance",
        duration: "0:34",
        turns: [
          { speaker: "agent", text: "Guten Tag, Kavita von der GesundPlus Versicherung hier. Ihre Krankenzusatzversicherung steht zur jährlichen Verlängerung an." },
          { speaker: "caller", text: "Guten Tag. Bleiben die Konditionen für Zahnersatz gleich?" },
          { speaker: "agent", text: "Ja, zu 100% unverändert. Dürfen wir die Verlängerung für Sie wie gewohnt bestätigen?" },
          { speaker: "caller", text: "Ja, bitte bestätigen Sie das." },
        ],
      },
    },
  },
];

const SONARA_VOICE_AGENT_URL = "https://sonara-voice-agent.vercel.app/";

// ── Component ───────────────────────────────────────────────────────────────────

export default function VoiceDemos() {
  const [selectedCardId, setSelectedCardId] = useState<string>("appointment-management");
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageKey>("hindi");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeSpeechTurnIndex, setActiveSpeechTurnIndex] = useState<number>(0);
  const [playbackProgress, setPlaybackProgress] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const currentCase = VOICE_USE_CASES.find((c) => c.id === selectedCardId) || VOICE_USE_CASES[0];
  const currentVariant = currentCase.variants[selectedLanguage] || currentCase.variants.hindi;

  // Stop playback when switching card or language
  useEffect(() => {
    stopPlayback();
    setActiveSpeechTurnIndex(0);
    setPlaybackProgress(0);
  }, [selectedCardId, selectedLanguage]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      stopPlayback();
    };
  }, []);

  const stopPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    setIsPlaying(false);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopPlayback();
      return;
    }

    setIsPlaying(true);
    setPlaybackProgress(0);

    // If an audio file exists in public/audio, play real audio
    if (currentVariant.audioSrc) {
      if (!audioRef.current) {
        audioRef.current = new Audio(currentVariant.audioSrc);
      } else {
        audioRef.current.src = currentVariant.audioSrc;
      }
      audioRef.current.muted = isMuted;

      audioRef.current.play().catch(() => {
        // Fallback to speech synthesis simulation if browser blocks file
        playSpeechSimulation();
      });

      audioRef.current.onended = () => {
        stopPlayback();
      };

      // Progress bar ticker
      const interval = setInterval(() => {
        if (!audioRef.current) return;
        const prog = (audioRef.current.currentTime / (audioRef.current.duration || 30)) * 100;
        setPlaybackProgress(Math.min(100, prog));

        // Advance transcript turns based on progress
        const totalTurns = currentVariant.turns.length;
        const currentTurn = Math.min(totalTurns - 1, Math.floor((prog / 100) * totalTurns));
        setActiveSpeechTurnIndex(currentTurn);
      }, 200);

      progressTimerRef.current = interval;
    } else {
      // Natural Web Speech API playback for European/UK accents
      playSpeechSimulation();
    }
  };

  const playSpeechSimulation = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      // Simple timer simulation
      let prog = 0;
      progressTimerRef.current = setInterval(() => {
        prog += 3;
        setPlaybackProgress(Math.min(100, prog));
        const totalTurns = currentVariant.turns.length;
        const currentTurn = Math.min(totalTurns - 1, Math.floor((prog / 100) * totalTurns));
        setActiveSpeechTurnIndex(currentTurn);
        if (prog >= 100) {
          stopPlayback();
        }
      }, 300);
      return;
    }

    window.speechSynthesis.cancel();

    // Map language key to BCP-47 language tag
    const langTags: Record<LanguageKey, string> = {
      hindi: "hi-IN",
      uk_english: "en-GB",
      us_english: "en-US",
      spanish: "es-ES",
      german: "de-DE",
    };

    let turnIdx = 0;
    const turns = currentVariant.turns;

    const speakNextTurn = () => {
      if (turnIdx >= turns.length) {
        stopPlayback();
        return;
      }

      setActiveSpeechTurnIndex(turnIdx);
      const turn = turns[turnIdx];
      const utterance = new SpeechSynthesisUtterance(turn.text);
      utterance.lang = langTags[selectedLanguage] || "en-US";
      utterance.rate = turn.speaker === "agent" ? 1.05 : 0.95;
      utterance.pitch = turn.speaker === "agent" ? 1.1 : 0.95;
      utterance.volume = isMuted ? 0 : 1;

      utterance.onend = () => {
        turnIdx++;
        setPlaybackProgress(Math.round((turnIdx / turns.length) * 100));
        setTimeout(speakNextTurn, 400);
      };

      utterance.onerror = () => {
        stopPlayback();
      };

      speechUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    };

    speakNextTurn();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  return (
    <>
      <Helmet>
        <title>Enterprise Voice AI Demos & Multilingual Samples | ConverseAI</title>
        <meta
          name="description"
          content="Listen to human-parity AI voice agents in action across Hindi, UK English, US English, European Spanish, and German for appointment booking, sales discovery, EMI collections, and cart recovery."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://theconverseai.com/voice-demos" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-slate-50 text-slate-900 pt-28 pb-20 selection:bg-violet-100 selection:text-violet-900">
        
        {/* ── HERO SECTION ── */}
        <section className="container max-w-6xl mx-auto px-4 sm:px-6 mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100/80 border border-violet-200 text-violet-700 text-xs font-semibold mb-5 shadow-sm">
            <Radio className="w-3.5 h-3.5 text-violet-600 animate-pulse" />
            <span>Production Real-Time Voice Stack &bull; Sub-500ms End-to-End Latency</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 max-w-4xl mx-auto leading-tight">
            Listen to Human-Parity <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Voice AI Agents</span> in Action
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Experience natural, low-latency conversations across Hindi, UK/US English, and European languages — or test the live voice agent right now in your browser.
          </p>

          {/* Top Live Agent Launcher Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl max-w-4xl mx-auto border border-indigo-900/60 text-left">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 flex-shrink-0 relative">
                  <Headphones className="w-7 h-7 text-white" />
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-900 animate-ping" />
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-900" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold tracking-wider uppercase text-emerald-400">Live Voice Agent Online</span>
                    <span className="text-[11px] text-slate-400">&bull; Sonara AI Engine</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Want to speak with the AI Voice Agent directly?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Real-time full-duplex conversational voice with Groq Whisper V3 + ElevenLabs + Silero VAD.
                  </p>
                </div>
              </div>

              <div className="flex-shrink-0 w-full sm:w-auto">
                <a
                  href={SONARA_VOICE_AGENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-violet-600/30 transition-all hover:scale-105"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Launch Live Voice Agent ↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6 SARVAM-STYLE USE CASE CARDS GRID ── */}
        <section className="container max-w-6xl mx-auto px-4 sm:px-6 mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Choose a Voice Scenario to Listen
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Select any card below to test audio samples and view live transcript in multiple languages.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-200 text-slate-700">
              6 Enterprise Scenarios
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VOICE_USE_CASES.map((item) => {
              const isSelected = item.id === selectedCardId;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedCardId(item.id)}
                  className={`group relative rounded-2xl p-6 bg-white border cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md ${
                    isSelected
                      ? "border-violet-600 ring-2 ring-violet-500/20 bg-gradient-to-b from-violet-50/40 to-white"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {/* Top Row: Pixel Icon + Arrow */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.iconBg}`}
                    >
                      {item.category === "booking" && <Calendar className="w-6 h-6" />}
                      {item.category === "sales" && (item.id === "sales-discovery" ? <Users className="w-6 h-6" /> : <Building2 className="w-6 h-6" />)}
                      {item.category === "collections" && <CreditCard className="w-6 h-6" />}
                      {item.category === "ecommerce" && <ShoppingCart className="w-6 h-6" />}
                      {item.category === "insurance" && <ShieldCheck className="w-6 h-6" />}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isSelected && (
                        <span className="text-[11px] font-bold text-violet-700 bg-violet-100 px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      )}
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 group-hover:text-violet-600 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-violet-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Footer Tag */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">{item.statsBadge}</span>
                    <span className="text-violet-600 font-semibold group-hover:underline flex items-center gap-0.5">
                      Listen <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── INTERACTIVE AUDIO PLAYER & TRANSCRIPT CONSOLE ── */}
        <section id="demo-player" className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-lg overflow-hidden">
            
            {/* Player Header with Active Scenario Info */}
            <div className="bg-slate-900 text-white p-5 sm:p-6 border-b border-slate-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold tracking-wider uppercase text-violet-400">
                      Now Playing Scenario
                    </span>
                    <span className="text-xs text-slate-400">&bull; {currentCase.agentName}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {currentCase.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    {currentCase.description}
                  </p>
                </div>

                {/* Right: Live Agent Link */}
                <div className="flex items-center gap-3">
                  <a
                    href={SONARA_VOICE_AGENT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-sm border border-white/15 transition-all"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Try on Live Voice Agent ↗</span>
                  </a>
                </div>
              </div>

              {/* Language Selector Tabs */}
              <div className="mt-6 pt-5 border-t border-slate-800">
                <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-violet-400" />
                  <span>Select Voice Sample Language:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(currentCase.variants) as LanguageKey[]).map((langKey) => {
                    const variant = currentCase.variants[langKey];
                    const isLangActive = selectedLanguage === langKey;
                    return (
                      <button
                        key={langKey}
                        onClick={() => setSelectedLanguage(langKey)}
                        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          isLangActive
                            ? "bg-violet-600 text-white shadow-md shadow-violet-600/30 ring-1 ring-violet-400"
                            : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`}
                      >
                        <span className="text-sm">{variant.flag}</span>
                        <span>{variant.label}</span>
                        <span className="text-[10px] opacity-75 hidden sm:inline">({variant.accent})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Audio Waveform & Player Controls */}
            <div className="p-6 bg-slate-50 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                
                {/* Play/Pause Button */}
                <button
                  onClick={handleTogglePlay}
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-white transition-all transform hover:scale-105 shadow-md flex-shrink-0 ${
                    isPlaying ? "bg-rose-600 hover:bg-rose-500 shadow-rose-600/30" : "bg-violet-600 hover:bg-violet-500 shadow-violet-600/30"
                  }`}
                  title={isPlaying ? "Pause audio" : "Play voice sample"}
                >
                  {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
                </button>

                {/* Waveform / Scrubber Bar */}
                <div className="flex-1 w-full">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-mono">
                    <span className="font-semibold text-slate-700">
                      {isPlaying ? "Playing Sample..." : "Click Play to Listen"}
                    </span>
                    <span>Duration: {currentVariant.duration}</span>
                  </div>

                  {/* Simulated Waveform Bars */}
                  <div className="h-10 bg-white border border-slate-200 rounded-lg p-2 flex items-center gap-1 overflow-hidden relative">
                    {/* Animated Progress Overlay */}
                    <div
                      className="absolute inset-y-0 left-0 bg-violet-100/60 transition-all pointer-events-none"
                      style={{ width: `${playbackProgress}%` }}
                    />

                    {Array.from({ length: 48 }).map((_, i) => {
                      const isActiveBar = (i / 48) * 100 <= playbackProgress;
                      const randomHeight = Math.sin(i * 0.45) * 12 + 16;
                      return (
                        <div
                          key={i}
                          className={`flex-1 rounded-full transition-all ${
                            isActiveBar
                              ? "bg-violet-600"
                              : isPlaying
                              ? "bg-slate-300 animate-pulse"
                              : "bg-slate-200"
                          }`}
                          style={{
                            height: `${Math.max(6, isPlaying ? randomHeight * (1 + (i % 3) * 0.2) : randomHeight)}px`,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Mute Button */}
                <button
                  onClick={toggleMute}
                  className="p-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-slate-900 transition-colors"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-5 h-5 text-rose-500" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Live Synchronized Transcript Console */}
            <div className="p-6 sm:p-8 bg-white">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Dialogue Transcript &bull; {currentVariant.label} ({currentVariant.accent})
                </h4>
                <span className="text-[11px] text-slate-400">
                  Speech Turns: {currentVariant.turns.length}
                </span>
              </div>

              <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
                {currentVariant.turns.map((turn, index) => {
                  const isAgent = turn.speaker === "agent";
                  const isActiveTurn = isPlaying && activeSpeechTurnIndex === index;

                  return (
                    <div
                      key={index}
                      className={`flex gap-3 p-3.5 rounded-xl transition-all ${
                        isActiveTurn
                          ? "bg-violet-50 border border-violet-300 shadow-sm"
                          : "bg-slate-50 border border-slate-100"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          isAgent ? "bg-violet-600 text-white" : "bg-slate-700 text-white"
                        }`}
                      >
                        {isAgent ? "AI" : "You"}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-bold text-slate-900">
                            {isAgent ? currentCase.agentName : "Customer"}
                          </span>
                          {isActiveTurn && (
                            <span className="text-[10px] font-bold text-violet-700 bg-violet-100 px-1.5 py-0.2 rounded animate-pulse">
                              Speaking now...
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {turn.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Actions Row inside Player */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Supports natural barge-in (caller can interrupt bot anytime)</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={SONARA_VOICE_AGENT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs shadow-md transition-all"
                  >
                    <span>Test on Live Voice Agent</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <Link
                    to="/book-demo"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-all"
                  >
                    <span>Request Custom Pilot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── ENTERPRISE ARCHITECTURE HIGHLIGHTS ── */}
        <section className="container max-w-6xl mx-auto px-4 sm:px-6 mt-16">
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-10 border border-slate-800 shadow-xl">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
                Production-Grade Architecture
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                How ConverseAI Powers Real-Time Voice
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold mb-3">
                  ⚡
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">Sub-500ms Turn Latency</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Groq Whisper V3 Turbo streaming STT coupled with ultra-fast LLM inference guarantees sub-second human turn response times.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold mb-3">
                  🛑
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">Silero VAD Barge-In</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Voice Activity Detection stops bot speech the exact millisecond the customer speaks, eliminating awkward robot overlaps.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold mb-3">
                  📞
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">Telephony & PBX Ready</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Direct SIP trunking into Exotel, Twilio, Knowlarity, Asterisk, and FreePBX with automatic CRM logging into Zoho and Salesforce.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
