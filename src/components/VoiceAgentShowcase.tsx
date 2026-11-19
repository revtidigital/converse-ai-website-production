import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, Bot } from "lucide-react";

interface VoiceVariant {
  language: string;
  langCode: string;
  flag: string;
  gender: "female" | "male";
  voiceName: string;
  audioSrc: string;
  durationLabel: string;
  scenario: string;
}

interface ShowcaseCard {
  id: string;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
  languages: { code: string; label: string; flag: string }[];
  variants: VoiceVariant[];
  defaultGender: "female" | "male";
  defaultLang: string;
}

const CARDS_DATA: ShowcaseCard[] = [
  {
    id: "real-estate",
    title: "Real Estate & Site Visits",
    description:
      "Qualify high-intent property buyers on budget, configuration, and timeline, then instantly book on-site viewings.",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    languages: [
      { code: "hinglish", label: "Hinglish", flag: "IN" },
      { code: "spanish", label: "Spanish", flag: "ES" },
      { code: "us_english", label: "US English", flag: "US" },
      { code: "uk_english", label: "UK English", flag: "GB" },
    ],
    defaultGender: "male",
    defaultLang: "hinglish",
    variants: [
      {
        language: "Hinglish",
        langCode: "hinglish",
        flag: "IN",
        gender: "male",
        voiceName: "Madhur",
        audioSrc: "/audio/real-estate-hinglish-male.mp3",
        durationLabel: "0:25",
        scenario:
          "High-intent buyer qualification (2BHK vs 3BHK, budget, possession) and weekend site visit booking in Hinglish.",
      },
      {
        language: "Hinglish",
        langCode: "hinglish",
        flag: "IN",
        gender: "female",
        voiceName: "Aria",
        audioSrc: "/audio/real-estate-hinglish-female.mp3",
        durationLabel: "0:28",
        scenario:
          "Residential property inquiry qualification, price estimation, and callback scheduling in conversational Hinglish.",
      },
      {
        language: "Spanish",
        langCode: "spanish",
        flag: "ES",
        gender: "female",
        voiceName: "Sofia",
        audioSrc: "/audio/spanish-real-estate.mp3",
        durationLabel: "0:43",
        scenario:
          "Agente inmobiliario virtual coordinando visitas a departamentos residenciales y filtrando presupuestos en Español.",
      },
      {
        language: "Spanish",
        langCode: "spanish",
        flag: "ES",
        gender: "male",
        voiceName: "Alvaro",
        audioSrc: "/audio/spanish-real-estate.mp3",
        durationLabel: "0:43",
        scenario:
          "Calificación de compradores e inversores con agendamiento de visita presencial en Madrid.",
      },
      {
        language: "US English",
        langCode: "us_english",
        flag: "US",
        gender: "female",
        voiceName: "Aria",
        audioSrc: "/audio/english-sdr.mp3",
        durationLabel: "0:48",
        scenario:
          "Real estate investment lead qualification, timeline verification, and calendar invite dispatch.",
      },
      {
        language: "US English",
        langCode: "us_english",
        flag: "US",
        gender: "male",
        voiceName: "David",
        audioSrc: "/audio/english-sdr.mp3",
        durationLabel: "0:48",
        scenario:
          "Commercial property leasing qualification and broker consultation scheduling.",
      },
      {
        language: "UK English",
        langCode: "uk_english",
        flag: "GB",
        gender: "male",
        voiceName: "Oliver",
        audioSrc: "/audio/uk-english-auto.mp3",
        durationLabel: "0:25",
        scenario:
          "Prime central London apartment viewing confirmation and mortgage pre-approval check in British RP accent.",
      },
      {
        language: "UK English",
        langCode: "uk_english",
        flag: "GB",
        gender: "female",
        voiceName: "Emma",
        audioSrc: "/audio/uk-english-auto.mp3",
        durationLabel: "0:25",
        scenario:
          "Luxury estates consultation scheduling with estate agents in London.",
      },
    ],
  },
  {
    id: "automotive",
    title: "Automotive & Test Drive Booking",
    description:
      "Convert vehicle inquiries into showroom test drives, service bookings, and annual MOT/maintenance reminders.",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-500",
    languages: [
      { code: "uk_english", label: "UK English", flag: "GB" },
      { code: "hindi", label: "Hindi", flag: "IN" },
      { code: "us_english", label: "US English", flag: "US" },
      { code: "german", label: "German", flag: "DE" },
    ],
    defaultGender: "female",
    defaultLang: "hindi",
    variants: [
      {
        language: "Hindi",
        langCode: "hindi",
        flag: "IN",
        gender: "female",
        voiceName: "Swara",
        audioSrc: "/audio/hindi-automotive-female.mp3",
        durationLabel: "0:20",
        scenario:
          "Vehicle test drive slot booking and authorized service center appointment confirmation in Hindi.",
      },
      {
        language: "Hindi",
        langCode: "hindi",
        flag: "IN",
        gender: "male",
        voiceName: "Madhur",
        audioSrc: "/audio/automotive-hindi-male.mp3",
        durationLabel: "0:22",
        scenario:
          "शोरूम विजिट स्लॉट एवं नई एसयूवी मॉडल टेस्ट ड्राइव की जानकारी एवं कन्फर्मेशन।",
      },
      {
        language: "UK English",
        langCode: "uk_english",
        flag: "GB",
        gender: "male",
        voiceName: "Oliver",
        audioSrc: "/audio/uk-english-auto.mp3",
        durationLabel: "0:25",
        scenario:
          "Dealership test drive slot confirmation, showroom directions, and executive demo booking in British RP.",
      },
      {
        language: "UK English",
        langCode: "uk_english",
        flag: "GB",
        gender: "female",
        voiceName: "Charlotte",
        audioSrc: "/audio/uk-english-auto.mp3",
        durationLabel: "0:25",
        scenario:
          "Vehicle annual service schedule reminder and authorized technician appointment booking.",
      },
      {
        language: "US English",
        langCode: "us_english",
        flag: "US",
        gender: "female",
        voiceName: "Jenny",
        audioSrc: "/audio/english-sdr.mp3",
        durationLabel: "0:48",
        scenario:
          "Dealership customer inquiry intake and weekend vehicle test drive booking in American accent.",
      },
      {
        language: "US English",
        langCode: "us_english",
        flag: "US",
        gender: "male",
        voiceName: "Guy",
        audioSrc: "/audio/english-sdr.mp3",
        durationLabel: "0:48",
        scenario:
          "Fleet vehicle lease qualification and representative callback booking.",
      },
      {
        language: "German",
        langCode: "german",
        flag: "DE",
        gender: "male",
        voiceName: "Killian",
        audioSrc: "/audio/german-logistics.mp3",
        durationLabel: "0:28",
        scenario:
          "Probefahrt-Terminbuchung und Kundendienst-Terminbestätigung für Automobil-Händler in Deutschland.",
      },
      {
        language: "German",
        langCode: "german",
        flag: "DE",
        gender: "female",
        voiceName: "Katja",
        audioSrc: "/audio/german-logistics.mp3",
        durationLabel: "0:28",
        scenario:
          "Fahrzeug-Inspektion und Werkstatt-Terminabsprache auf Deutsch.",
      },
    ],
  },
  {
    id: "logistics",
    title: "Logistics & Order Dispatch",
    description:
      "Automate delivery dispatch alerts, customs clearance updates, address checks, and NDR reattempt scheduling.",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    languages: [
      { code: "german", label: "German", flag: "DE" },
      { code: "hindi", label: "Hindi", flag: "IN" },
      { code: "english", label: "English", flag: "US" },
      { code: "uk_english", label: "UK English", flag: "GB" },
    ],
    defaultGender: "male",
    defaultLang: "hindi",
    variants: [
      {
        language: "Hindi",
        langCode: "hindi",
        flag: "IN",
        gender: "male",
        voiceName: "Madhur",
        audioSrc: "/audio/logistics-hindi-male.mp3",
        durationLabel: "0:23",
        scenario:
          "COD address verification, delivery time slot confirmation, and customer dispatch update in Hindi.",
      },
      {
        language: "Hindi",
        langCode: "hindi",
        flag: "IN",
        gender: "female",
        voiceName: "Swara",
        audioSrc: "/audio/hindi-automotive-female.mp3",
        durationLabel: "0:20",
        scenario:
          "पार्सल डिलीवरी समय स्लॉट पुष्टि एवं नॉन-डिलीवरी रीअटेम्प्ट कॉल हिंदी में।",
      },
      {
        language: "German",
        langCode: "german",
        flag: "DE",
        gender: "male",
        voiceName: "Killian",
        audioSrc: "/audio/german-logistics.mp3",
        durationLabel: "0:28",
        scenario:
          "Automatisierte Sendungsverfolgung, Adressprüfung und Zustellzeit-Bestätigung für Logistik-Partner in Deutschland.",
      },
      {
        language: "German",
        langCode: "german",
        flag: "DE",
        gender: "female",
        voiceName: "Katja",
        audioSrc: "/audio/german-logistics.mp3",
        durationLabel: "0:28",
        scenario:
          "Zustellbenachrichtigung und Adressbestätigung für E-Commerce-Pakete.",
      },
      {
        language: "English",
        langCode: "english",
        flag: "US",
        gender: "female",
        voiceName: "Aria",
        audioSrc: "/audio/english-sdr.mp3",
        durationLabel: "0:48",
        scenario:
          "Real-time shipment delay alert, recipient gate-code verification, and reschedule handling.",
      },
      {
        language: "English",
        langCode: "english",
        flag: "US",
        gender: "male",
        voiceName: "David",
        audioSrc: "/audio/english-sdr.mp3",
        durationLabel: "0:48",
        scenario:
          "Freight forwarding customs clearance status update and broker coordination.",
      },
      {
        language: "UK English",
        langCode: "uk_english",
        flag: "GB",
        gender: "male",
        voiceName: "Oliver",
        audioSrc: "/audio/uk-english-auto.mp3",
        durationLabel: "0:25",
        scenario:
          "Royal Mail / DPD courier delivery window confirmation and safe-place drop-off instructions.",
      },
      {
        language: "UK English",
        langCode: "uk_english",
        flag: "GB",
        gender: "female",
        voiceName: "Emma",
        audioSrc: "/audio/uk-english-auto.mp3",
        durationLabel: "0:25",
        scenario:
          "UK nationwide parcel delivery re-attempt and depot collection instructions.",
      },
    ],
  },
];

let globalPlayingAudio: HTMLAudioElement | null = null;
let globalStopCallback: (() => void) | null = null;

export default function VoiceAgentShowcase() {
  return (
    <section id="interactive-voice-demos" className="py-16 md:py-24 bg-slate-50/70 border-y border-slate-200/70">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold uppercase tracking-wider mb-4">
            <Volume2 className="w-3.5 h-3.5 text-purple-600" />
            Neural Voice Demo Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Hear Real Human AI Voice Agents in Action
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Experience ultra-low latency (&lt;800ms) conversational AI with authentic regional cadences across Hindi,
            Hinglish, UK English, US English, German, and Spanish.
          </p>
        </div>

        {/* 3 Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CARDS_DATA.map((card) => (
            <VoiceCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VoiceCard({ card }: { card: ShowcaseCard }) {
  const [selectedGender, setSelectedGender] = useState<"female" | "male">(card.defaultGender);
  const [selectedLang, setSelectedLang] = useState<string>(card.defaultLang);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Find active variant matching selected gender + language
  const activeVariant =
    card.variants.find((v) => v.langCode === selectedLang && v.gender === selectedGender) ||
    card.variants.find((v) => v.langCode === selectedLang) ||
    card.variants[0];

  const stopCurrentAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  // When active variant changes, stop audio
  useEffect(() => {
    stopCurrentAudio();
    if (audioRef.current) {
      audioRef.current.src = activeVariant.audioSrc;
      audioRef.current.load();
    }
  }, [activeVariant.audioSrc, stopCurrentAudio]);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(activeVariant.audioSrc);
      audioRef.current.ontimeupdate = () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
          setDuration(audioRef.current.duration || 0);
        }
      };
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };
      audioRef.current.onerror = () => {
        setIsPlaying(false);
      };
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Pause any previously playing global audio
      if (globalPlayingAudio && globalPlayingAudio !== audioRef.current) {
        globalPlayingAudio.pause();
        if (globalStopCallback) globalStopCallback();
      }
      globalPlayingAudio = audioRef.current;
      globalStopCallback = () => setIsPlaying(false);

      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Waveform progress calculation
  const progressRatio = duration > 0 ? currentTime / duration : 0;
  const totalWaveformBars = 20;
  const activeBars = Math.floor(progressRatio * totalWaveformBars);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col p-6 sm:p-7 relative overflow-hidden">
      {/* Top Card Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={`w-11 h-11 rounded-2xl ${card.iconBg} flex items-center justify-center`}>
          <Bot className={`w-6 h-6 ${card.iconColor}`} />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/70 text-purple-700 text-xs font-medium">
          <Volume2 className="w-3.5 h-3.5 text-purple-600" />
          <span>Neural Audio Clip</span>
        </div>
      </div>

      {/* Title & Description */}
      <h3 className="text-xl font-bold text-slate-900 mb-2">{card.title}</h3>
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 flex-grow">{card.description}</p>

      {/* Voice Gender Controls */}
      <div className="mb-4">
        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2">
          Voice Gender:
        </span>
        <div className="inline-flex bg-slate-100 p-1 rounded-full border border-slate-200/80">
          <button
            type="button"
            onClick={() => {
              setSelectedGender("female");
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              selectedGender === "female"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>👩 Female</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedGender("male");
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              selectedGender === "male"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>👨 Male</span>
          </button>
        </div>
      </div>

      {/* Select Accent & Language Pills */}
      <div className="mb-6">
        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2">
          Select Accent & Language:
        </span>
        <div className="flex flex-wrap gap-2">
          {card.languages.map((lang) => {
            const isSelected = selectedLang === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setSelectedLang(lang.code);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                  isSelected
                    ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <span className="text-[10px] font-bold opacity-80 uppercase">{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Neural Audio Player Box (as shown in screenshot) */}
      <div className="bg-slate-50/90 rounded-2xl border border-slate-200 p-4 sm:p-5 mt-auto">
        <div className="flex items-center justify-between text-xs mb-3">
          <span className="font-semibold text-slate-800 flex items-center gap-1">
            <span>{selectedGender === "female" ? "👩" : "👨"}</span>
            <span>
              {selectedGender === "female" ? "Female" : "Male"} Voice: {activeVariant.voiceName}
            </span>
          </span>
          <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-slate-200/80">
            Studio Neural HD
          </span>
        </div>

        {/* Audio Player Row */}
        <div className="flex items-center gap-3 mb-3">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
            className="w-11 h-11 rounded-full bg-purple-600 hover:bg-purple-700 active:scale-95 text-white flex items-center justify-center shadow-md transition-all flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
          </button>

          {/* Dot Waveform Simulation */}
          <div className="flex-1 flex items-center gap-1 overflow-hidden h-6 py-1">
            {Array.from({ length: totalWaveformBars }).map((_, i) => {
              const isBarActive = i <= activeBars;
              return (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-150 ${
                    isBarActive ? "bg-purple-600 scale-125" : "bg-slate-300"
                  } ${isPlaying && isBarActive ? "animate-pulse" : ""}`}
                />
              );
            })}
          </div>

          {/* Timer Display */}
          <span className="text-xs font-mono font-medium text-slate-600 flex-shrink-0">
            {formatTime(currentTime)} / {activeVariant.durationLabel}
          </span>
        </div>

        {/* Scenario description badge */}
        <p className="text-[11px] text-slate-600 leading-snug flex items-start gap-1.5 pt-1">
          <span className="text-purple-600 text-xs">🎯</span>
          <span>{activeVariant.scenario}</span>
        </p>
      </div>
    </div>
  );
}
