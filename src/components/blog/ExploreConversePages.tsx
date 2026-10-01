import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Mic,
  ClipboardCheck,
  TrendingUp,
  MessageSquare,
  Cpu,
  Brain,
  Zap,
  Layers,
  MessageCircle,
  ShoppingBag,
  Send,
  Headphones,
  Globe,
  FileText,
  FormInput,
  Users,
  StickyNote,
  Eye,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { ConversePageItem, DEFAULT_CONVERSE_PAGES } from "@/data/conversePages";

interface ExploreConversePagesProps {
  pages?: ConversePageItem[];
}

export const getConversePageIcon = (iconType: string) => {
  switch (iconType) {
    case "voice":
      return <Mic className="w-5 h-5 text-purple-600" />;
    case "audit":
      return <ClipboardCheck className="w-5 h-5 text-purple-600" />;
    case "sales":
      return <TrendingUp className="w-5 h-5 text-purple-600" />;
    case "chatbot":
      return <MessageSquare className="w-5 h-5 text-purple-600" />;
    case "custom":
      return <Cpu className="w-5 h-5 text-purple-600" />;
    case "brain":
      return <Brain className="w-5 h-5 text-purple-600" />;
    case "automation":
      return <Zap className="w-5 h-5 text-purple-600" />;
    case "integration":
      return <Layers className="w-5 h-5 text-purple-600" />;
    case "whatsapp":
      return <MessageCircle className="w-5 h-5 text-purple-600" />;
    case "shop":
      return <ShoppingBag className="w-5 h-5 text-purple-600" />;
    case "marketing":
      return <Send className="w-5 h-5 text-purple-600" />;
    case "chat":
      return <Headphones className="w-5 h-5 text-purple-600" />;
    case "omni":
      return <Globe className="w-5 h-5 text-purple-600" />;
    case "forms":
      return <FormInput className="w-5 h-5 text-purple-600" />;
    case "capacity":
      return <Users className="w-5 h-5 text-purple-600" />;
    case "notes":
      return <StickyNote className="w-5 h-5 text-purple-600" />;
    case "live":
      return <Eye className="w-5 h-5 text-purple-600" />;
    case "teams":
      return <Users className="w-5 h-5 text-purple-600" />;
    case "smb":
      return <Building2 className="w-5 h-5 text-purple-600" />;
    case "case_studies":
      return <FileText className="w-5 h-5 text-purple-600" />;
    case "demo":
      return <Calendar className="w-5 h-5 text-purple-600" />;
    default:
      return <Sparkles className="w-5 h-5 text-purple-600" />;
  }
};

const ExploreConversePages: React.FC<ExploreConversePagesProps> = ({ pages }) => {
  const displayPages = pages && pages.length > 0 ? pages : DEFAULT_CONVERSE_PAGES;
  const [startIndex, setStartIndex] = useState(0);

  const totalCards = displayPages.length;
  const visibleCards = 3;

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : Math.max(0, totalCards - visibleCards)));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1 <= totalCards - visibleCards ? prev + 1 : 0));
  };

  return (
    <section className="my-8 rounded-2xl border border-purple-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md w-full box-border">
      {/* Header section (View All button removed as requested) */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100/70 text-purple-600">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-tight">
              Explore Converse Pages
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              See how our AI agents can help with different business needs.
            </p>
          </div>
        </div>

        {totalCards > visibleCards && (
          <div className="flex items-center gap-1.5 ml-auto">
            <button
              type="button"
              onClick={handlePrev}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-600 transition-all shadow-sm"
              aria-label="Previous Converse Pages"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-600 transition-all shadow-sm"
              aria-label="Next Converse Pages"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Cards Slider / Carousel Container */}
      <div className="overflow-hidden relative">
        <div
          className="flex gap-4 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${startIndex * (100 / visibleCards)}%)`,
          }}
        >
          {displayPages.map((page, idx) => (
            <div
              key={page.id || page.url || idx}
              className="w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] shrink-0 flex flex-col justify-between rounded-xl border border-purple-100/80 bg-purple-50/30 p-4 transition-all duration-200 hover:border-purple-300 hover:bg-purple-50/80 hover:shadow-sm group"
            >
              <div>
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-600 group-hover:scale-105 transition-transform duration-200">
                  {getConversePageIcon(page.iconType)}
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-purple-700 transition-colors">
                  {page.title}
                </h4>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {page.description || "Learn how Converse AI agents power automation & CSAT results."}
                </p>
              </div>

              <Link
                to={page.url}
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-purple-600 hover:text-purple-800 transition-colors"
              >
                Explore Page <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreConversePages;
