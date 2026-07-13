import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage, type RGB } from "pdf-lib";

export interface AuditInput {
  fullName: string;
  email: string;
  company: string;
  role?: string;
  industry?: string;
  teamSize?: string;
  revenue?: string;
  region?: string;
  pains: string[];
  depts: string[];
  aiMaturity?: string;
  dataReadiness?: string;
  tools?: string;
  budget?: string;
  timeline?: string;
  compliance: string[];
  notes?: string;
}

/* ---------- Brand tokens ---------- */
const BRAND = {
  primary: rgb(0.49, 0.23, 0.93), // ConverseAI purple
  primaryDark: rgb(0.36, 0.15, 0.72),
  mint: rgb(0.08, 0.86, 0.7),
  ink: rgb(0.1, 0.11, 0.16),
  muted: rgb(0.45, 0.47, 0.53),
  line: rgb(0.88, 0.88, 0.92),
  softBg: rgb(0.96, 0.95, 0.99),
  white: rgb(1, 1, 1),
};

/* ---------- Rule-based scoring ---------- */
const dataScoreMap: Record<string, number> = {
  "Scattered across tools & spreadsheets": 10,
  "Partly organized": 20,
  "Well-organized (CRM / database)": 30,
};
const aiScoreMap: Record<string, number> = {
  "Nothing yet — exploring": 6,
  "Casual use (ChatGPT / Copilot)": 13,
  "A few AI tools in use": 22,
  "Ran pilots but no clear ROI": 17,
};
const teamScoreMap: Record<string, number> = {
  "1–10": 6,
  "11–50": 11,
  "51–200": 16,
  "201–500": 18,
  "500+": 20,
};

export interface Readiness {
  score: number;
  band: string;
  blurb: string;
  dims: { label: string; value: number; max: number }[];
}

export const computeReadiness = (input: AuditInput): Readiness => {
  const data = dataScoreMap[input.dataReadiness || ""] ?? 12;
  const ai = aiScoreMap[input.aiMaturity || ""] ?? 8;
  const team = teamScoreMap[input.teamSize || ""] ?? 8;
  const toolsBonus = input.tools && input.tools.trim() ? 10 : 4;
  const clarity = Math.min(15, input.pains.length * 4); // knowing the problem = readiness

  const raw = data + ai + team + toolsBonus + clarity; // out of ~ 95
  const score = Math.max(18, Math.min(96, Math.round(raw + 4)));

  let band = "Early stage";
  let blurb = "Strong upside, but foundations come first. A focused audit will de-risk your first build.";
  if (score >= 70) {
    band = "AI-ready";
    blurb = "You have the data, tools, and clarity to ship a high-ROI use case fast.";
  } else if (score >= 45) {
    band = "Developing";
    blurb = "Good momentum. A prioritized roadmap will turn scattered effort into measurable ROI.";
  }

  return {
    score,
    band,
    blurb,
    dims: [
      { label: "Data readiness", value: data, max: 30 },
      { label: "AI maturity", value: ai, max: 22 },
      { label: "Team & scale", value: team, max: 20 },
      { label: "Problem clarity", value: clarity, max: 15 },
    ],
  };
};

/* ---------- Use-case mapping ---------- */
interface UseCase {
  title: string;
  why: string;
  impact: "High" | "Medium";
  feasibility: "High" | "Medium";
}
const painToUseCase: Record<string, UseCase> = {
  "Missing calls / leads": {
    title: "AI Voice Agents",
    why: "Answer 100% of inbound calls 24/7, qualify leads, and auto-book meetings — recover missed-call revenue.",
    impact: "High",
    feasibility: "High",
  },
  "Slow or overloaded support": {
    title: "AI Support Agent",
    why: "Deflect 30–60% of Tier-1 tickets with accurate, cited answers and clean human handoff.",
    impact: "High",
    feasibility: "High",
  },
  "Repetitive back-office work": {
    title: "Agentic Automation (Agent Sprint)",
    why: "Ship one production agent for a back-office workflow (invoices, triage, onboarding) in ~4 weeks.",
    impact: "High",
    feasibility: "Medium",
  },
  "Weak sales pipeline": {
    title: "Sales Intelligence & Outreach",
    why: "Signal-triggered outbound that books qualified meetings without SDR overhead.",
    impact: "Medium",
    feasibility: "Medium",
  },
  "Slow onboarding / messy SOPs": {
    title: "Knowledge Assistant",
    why: "Private assistant over your SOPs and docs — cuts ramp time and 'where do I find…' questions.",
    impact: "Medium",
    feasibility: "High",
  },
  "Document & knowledge overload": {
    title: "Document & Knowledge Intelligence",
    why: "Answer questions across your documents with citations; extract and structure key data.",
    impact: "High",
    feasibility: "Medium",
  },
  "Manual reporting / data entry": {
    title: "Custom AI Agent + Integration",
    why: "Automate manual data entry and reporting by wiring AI into your existing CRM/helpdesk.",
    impact: "Medium",
    feasibility: "Medium",
  },
};

export const recommendUseCases = (input: AuditInput): UseCase[] => {
  const picked = input.pains.map((p) => painToUseCase[p]).filter(Boolean);
  if (picked.length === 0) {
    return [painToUseCase["Missing calls / leads"], painToUseCase["Repetitive back-office work"]];
  }
  return picked.slice(0, 5);
};

/* ---------- PDF helpers ---------- */
const wrap = (text: string, font: PDFFont, size: number, maxW: number): string[] => {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (font.widthOfTextAtSize(test, size) > maxW && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
};

/* ---------- PDF generation ---------- */
export const generateAuditReportPdf = async (input: AuditInput): Promise<Uint8Array> => {
  const readiness = computeReadiness(input);
  const useCases = recommendUseCases(input);

  const doc = await PDFDocument.create();
  doc.setTitle(`AI Readiness Report — ${input.company}`);
  doc.setAuthor("ConverseAI");
  doc.setCreator("ConverseAI — theconverseai.com");

  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  // logo (best-effort — falls back to wordmark)
  let logo: Awaited<ReturnType<typeof doc.embedPng>> | null = null;
  try {
    const res = await fetch("/logo.png");
    if (res.ok) {
      const buf = await res.arrayBuffer();
      logo = await doc.embedPng(buf);
    }
  } catch {
    logo = null;
  }

  const W = 595.28; // A4
  const H = 841.89;
  const M = 48;
  const contentW = W - M * 2;

  const dateStr = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  const drawHeader = (page: PDFPage) => {
    page.drawRectangle({ x: 0, y: H - 90, width: W, height: 90, color: BRAND.primary });
    if (logo) {
      const lw = 116;
      const lh = (logo.height / logo.width) * lw;
      page.drawImage(logo, { x: M, y: H - 45 - lh / 2, width: lw, height: lh });
    } else {
      page.drawText("ConverseAI", { x: M, y: H - 56, size: 22, font: bold, color: BRAND.white });
    }
    page.drawText("AI READINESS REPORT", {
      x: W - M - bold.widthOfTextAtSize("AI READINESS REPORT", 11),
      y: H - 52,
      size: 11,
      font: bold,
      color: BRAND.white,
    });
  };

  const drawFooter = (page: PDFPage, n: number) => {
    page.drawLine({ start: { x: M, y: 54 }, end: { x: W - M, y: 54 }, thickness: 0.75, color: BRAND.line });
    page.drawText("theconverseai.com  ·  Prepared by ConverseAI", { x: M, y: 40, size: 8, font, color: BRAND.muted });
    page.drawText(`Page ${n}`, { x: W - M - 34, y: 40, size: 8, font, color: BRAND.muted });
  };

  /* ===== PAGE 1 ===== */
  const p1 = doc.addPage([W, H]);
  drawHeader(p1);
  let y = H - 130;

  p1.drawText("AI Readiness Report", { x: M, y, size: 26, font: bold, color: BRAND.ink });
  y -= 26;
  p1.drawText(`Prepared for ${input.company || "your business"}${input.fullName ? `  ·  ${input.fullName}` : ""}`, {
    x: M, y, size: 12, font, color: BRAND.muted,
  });
  y -= 15;
  p1.drawText(dateStr, { x: M, y, size: 10, font, color: BRAND.muted });
  y -= 34;

  // Score card
  const cardH = 128;
  p1.drawRectangle({ x: M, y: y - cardH, width: contentW, height: cardH, color: BRAND.softBg, borderColor: BRAND.line, borderWidth: 1 });
  // score circle
  const cx = M + 72;
  const cy = y - cardH / 2;
  p1.drawCircle({ x: cx, y: cy, size: 46, color: BRAND.primary });
  const scoreTxt = String(readiness.score);
  p1.drawText(scoreTxt, { x: cx - bold.widthOfTextAtSize(scoreTxt, 34) / 2, y: cy - 6, size: 34, font: bold, color: BRAND.white });
  p1.drawText("/100", { x: cx - font.widthOfTextAtSize("/100", 10) / 2, y: cy - 26, size: 10, font, color: BRAND.white });

  const tx = M + 150;
  p1.drawText("Readiness score", { x: tx, y: y - 30, size: 10, font, color: BRAND.muted });
  p1.drawText(readiness.band, { x: tx, y: y - 52, size: 20, font: bold, color: BRAND.primary });
  for (const [i, ln] of wrap(readiness.blurb, font, 10.5, contentW - 170).entries()) {
    p1.drawText(ln, { x: tx, y: y - 72 - i * 14, size: 10.5, font, color: BRAND.ink });
  }
  y -= cardH + 30;

  // Snapshot
  p1.drawText("Snapshot", { x: M, y, size: 13, font: bold, color: BRAND.ink });
  y -= 20;
  const snap: [string, string][] = [
    ["Industry", input.industry || "—"],
    ["Team size", input.teamSize || "—"],
    ["Region", input.region || "—"],
    ["Timeline", input.timeline || "—"],
  ];
  const colW = contentW / 4;
  snap.forEach(([k, v], i) => {
    const x = M + i * colW;
    p1.drawText(k.toUpperCase(), { x, y, size: 8, font: bold, color: BRAND.muted });
    for (const [j, ln] of wrap(v, font, 11, colW - 12).entries()) {
      p1.drawText(ln, { x, y: y - 15 - j * 13, size: 11, font, color: BRAND.ink });
    }
  });
  y -= 52;

  // Readiness breakdown bars
  p1.drawText("Where you stand today", { x: M, y, size: 13, font: bold, color: BRAND.ink });
  y -= 24;
  const barW = contentW - 160;
  for (const d of readiness.dims) {
    p1.drawText(d.label, { x: M, y: y - 2, size: 10, font, color: BRAND.ink });
    const bx = M + 150;
    p1.drawRectangle({ x: bx, y: y - 4, width: barW, height: 9, color: BRAND.line });
    p1.drawRectangle({ x: bx, y: y - 4, width: Math.max(4, (d.value / d.max) * barW), height: 9, color: BRAND.mint });
    p1.drawText(`${Math.round((d.value / d.max) * 100)}%`, { x: bx + barW + 8, y: y - 3, size: 9, font: bold, color: BRAND.muted });
    y -= 24;
  }

  drawFooter(p1, 1);

  /* ===== PAGE 2 ===== */
  const p2 = doc.addPage([W, H]);
  drawHeader(p2);
  let y2 = H - 130;

  p2.drawText("Recommended AI use cases", { x: M, y: y2, size: 16, font: bold, color: BRAND.ink });
  y2 -= 12;
  p2.drawText("Prioritized from your inputs — scored on business impact and feasibility.", {
    x: M, y: y2 - 8, size: 10, font, color: BRAND.muted,
  });
  y2 -= 34;

  useCases.forEach((uc, i) => {
    const lines = wrap(uc.why, font, 10, contentW - 32);
    const boxH = 34 + lines.length * 13;
    p2.drawRectangle({ x: M, y: y2 - boxH, width: contentW, height: boxH, color: BRAND.white, borderColor: BRAND.line, borderWidth: 1 });
    p2.drawRectangle({ x: M, y: y2 - boxH, width: 4, height: boxH, color: BRAND.primary });
    p2.drawText(`${i + 1}.  ${uc.title}`, { x: M + 14, y: y2 - 18, size: 12, font: bold, color: BRAND.ink });
    const tag = `Impact: ${uc.impact}   ·   Feasibility: ${uc.feasibility}`;
    p2.drawText(tag, { x: W - M - font.widthOfTextAtSize(tag, 8.5) - 10, y: y2 - 18, size: 8.5, font: bold, color: BRAND.primary });
    lines.forEach((ln, j) => p2.drawText(ln, { x: M + 14, y: y2 - 34 - j * 13, size: 10, font, color: BRAND.muted }));
    y2 -= boxH + 12;
  });

  // Roadmap
  y2 -= 6;
  p2.drawText("Your 90-day roadmap", { x: M, y: y2, size: 14, font: bold, color: BRAND.ink });
  y2 -= 22;
  const phases: [string, string][] = [
    ["Weeks 1–3", "ROI-First Audit: score use cases, confirm the first build, lock success metrics."],
    ["Weeks 4–8", `Build the first system${useCases[0] ? ` — ${useCases[0].title}` : ""}. Ship to production with an eval harness.`],
    ["Weeks 9–12", "Measure impact, tune, and expand to the second workflow."],
  ];
  phases.forEach(([wk, desc]) => {
    p2.drawCircle({ x: M + 4, y: y2 - 3, size: 4, color: BRAND.mint });
    p2.drawText(wk, { x: M + 16, y: y2 - 6, size: 10.5, font: bold, color: BRAND.primary });
    for (const [j, ln] of wrap(desc, font, 10, contentW - 110).entries()) {
      p2.drawText(ln, { x: M + 96, y: y2 - 6 - j * 13, size: 10, font, color: BRAND.ink });
    }
    y2 -= 30;
  });

  // Compliance
  if (input.compliance.length && !input.compliance.includes("None / Not sure")) {
    y2 -= 4;
    p2.drawText("Compliance to address", { x: M, y: y2, size: 12, font: bold, color: BRAND.ink });
    y2 -= 16;
    p2.drawText(input.compliance.join("   ·   "), { x: M, y: y2, size: 10, font, color: BRAND.muted });
    y2 -= 24;
  }

  // CTA band
  const ctaH = 78;
  const ctaY = 84;
  p2.drawRectangle({ x: M, y: ctaY, width: contentW, height: ctaH, color: BRAND.primary });
  p2.drawText("Ready to build the first one?", { x: M + 18, y: ctaY + ctaH - 26, size: 14, font: bold, color: BRAND.white });
  p2.drawText("Book a free 20-min fit call. Your audit fee is credited toward the first build.", {
    x: M + 18, y: ctaY + ctaH - 46, size: 10, font, color: BRAND.white,
  });
  p2.drawText("theconverseai.com/services/ai-strategy-audit", { x: M + 18, y: ctaY + 16, size: 10, font: bold, color: BRAND.mint });

  drawFooter(p2, 2);

  return doc.save();
};

/* ---------- helpers for the page ---------- */
export const uint8ToBase64 = (bytes: Uint8Array): string => {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
};

export const downloadPdf = (bytes: Uint8Array, filename: string) => {
  const blob = new Blob([bytes as unknown as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
};
