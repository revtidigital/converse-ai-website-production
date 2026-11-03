import type { VercelRequest, VercelResponse } from "@vercel/node";

const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const BREVO_SENDER_EMAIL = "hello@theconverseai.com";
const BREVO_SENDER_NAME = "Converse AI";

interface ServiceEmailConfig {
  serviceTitle: string;
  subject: string;
  heroHeadline: string;
  heroDesc: string;
  simUser: string;
  simAgentTitle: string;
  check1: string;
  check2: string;
  check3: string;
  stat1Val: string;
  stat1Lbl: string;
  stat2Val: string;
  stat2Lbl: string;
  stat3Val: string;
  stat3Lbl: string;
  ctaCampaign: string;
}

/**
 * 1. Dedicated Demo Walkthrough & Scheduling Master HTML Email Template
 * No pre-filled slot: Provides direct CTA link to https://theconverseai.com/book-demo for user to pick their slot.
 */
function buildDemoWalkthroughTemplate(
  firstName: string,
  serviceInterest: string
): string {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>Your 1-on-1 Demo Walkthrough with ConverseAI</title>
<style>
  body { margin:0; padding:0; background:#F5F3FF; -webkit-text-size-adjust:100%; }
  table { border-collapse:collapse; }
  a { color:#7C3AED; }
  @media only screen and (max-width:620px) {
    .wrap { width:100% !important; }
    .pad { padding-left:18px !important; padding-right:18px !important; }
    .stack { display:block !important; width:100% !important; box-sizing:border-box !important; }
    .h1 { font-size:26px !important; line-height:32px !important; }
    .statnum { font-size:20px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#F5F3FF;">

<!-- Preheader (Inbox preview text) -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#F5F3FF;font-size:1px;line-height:1px;">
  Thank you for reaching out! Pick a convenient 30-minute time slot on our calendar for your custom AI walkthrough.
  &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F5F3FF">
<tr><td align="center" style="padding:22px 10px;">

  <table role="presentation" class="wrap" width="640" cellpadding="0" cellspacing="0" border="0" style="width:640px;max-width:640px;">

    <!-- TOP BRAND BAR -->
    <tr>
      <td class="pad" style="padding:0 4px 14px 4px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="left" style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:22px;font-weight:bold;color:#7C3AED;">ConverseAI</td>
            <td align="right" style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;color:#6B6890;">
              <a href="https://theconverseai.com?utm_source=brevo-automated&utm_medium=email&utm_campaign=demo-header" style="color:#6B6890;text-decoration:underline;">View website</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- HERO SECTION (VIOLET GRADIENT) -->
    <tr>
      <td bgcolor="#5B21B6" class="pad" style="background-color:#5B21B6;background-image:linear-gradient(135deg,#4C1D95 0%,#7C3AED 100%);padding:40px 38px 30px 38px;border-radius:12px 12px 0 0;">
        <p style="margin:0 0 12px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:22px;color:#DDD6FE;">
          Hi ${firstName || "there"},
        </p>
        <h1 class="h1" style="margin:0 0 14px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:32px;line-height:38px;font-weight:bold;color:#FFFFFF;letter-spacing:-0.5px;">
          Your 1-on-1 Live AI Demo Walkthrough
        </h1>
        <p style="margin:0 0 24px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:25px;color:#EDE9FE;">
          Thank you for exploring <strong>${serviceInterest || "ConverseAI Solutions"}</strong>. In this private 30-minute session, our solutions team will demonstrate real-world workflows tailored to your exact tech stack and business needs.
        </p>

        <!-- STEP 2: CHOOSE YOUR DEMO TIME SLOT CARD -->
        <div style="background:#3B1580;border:2px solid #86EFAC;border-radius:12px;padding:26px 22px;margin:0 0 24px 0;text-align:center;">
          <p style="margin:0 0 8px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;font-weight:bold;color:#86EFAC;text-transform:uppercase;letter-spacing:1px;">
            📅 Step 2: Choose Your 30-Minute Time Slot
          </p>
          <h2 style="margin:0 0 10px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:22px;line-height:28px;font-weight:bold;color:#FFFFFF;">
            Pick a Time That Works Best For You
          </h2>
          <p style="margin:0 0 20px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:23px;color:#EDE9FE;">
            Please select a date and time on our booking calendar. Our solutions architect will prepare your tailored live demo accordingly.
          </p>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;text-align:center;">
            <tr>
              <td align="center" bgcolor="#FFFFFF" style="background:#FFFFFF;border-radius:8px;text-align:center;">
                <a href="https://theconverseai.com/book-demo?utm_source=brevo-automated&utm_medium=email&utm_campaign=demo-schedule&utm_content=pick-slot" style="display:inline-block;padding:15px 32px;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;color:#5B21B6;text-decoration:none;text-align:center;">
                  Schedule Your Demo Slot Now &rarr;
                </a>
              </td>
            </tr>
          </table>
        </div>

      </td>
    </tr>

    <!-- HIGHLIGHTS STRIP -->
    <tr>
      <td bgcolor="#4C1D95" style="background-color:#4C1D95;background-image:linear-gradient(135deg,#7C3AED 0%,#4C1D95 100%);padding:18px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center" width="25%" valign="top">
              <p class="statnum" style="margin:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:22px;line-height:26px;font-weight:bold;color:#FFFFFF;">30 Min</p>
              <p style="margin:2px 0 0 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;line-height:15px;color:#DDD6FE;">Private Walkthrough</p>
            </td>
            <td align="center" width="25%" valign="top">
              <p class="statnum" style="margin:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:22px;line-height:26px;font-weight:bold;color:#FFFFFF;">1-on-1</p>
              <p style="margin:2px 0 0 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;line-height:15px;color:#DDD6FE;">Solutions Architect</p>
            </td>
            <td align="center" width="25%" valign="top">
              <p class="statnum" style="margin:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:22px;line-height:26px;font-weight:bold;color:#FFFFFF;">Live Demo</p>
              <p style="margin:2px 0 0 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;line-height:15px;color:#DDD6FE;">Real-Time Test</p>
            </td>
            <td align="center" width="25%" valign="top">
              <p class="statnum" style="margin:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:22px;line-height:26px;font-weight:bold;color:#FFFFFF;">₹0</p>
              <p style="margin:2px 0 0 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;line-height:15px;color:#DDD6FE;">No Obligation</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- AGENDA SECTION -->
    <tr>
      <td bgcolor="#FFFFFF" class="pad" style="background:#FFFFFF;padding:36px 38px 16px 38px;">
        <h2 style="margin:0 0 10px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:22px;line-height:28px;font-weight:bold;color:#2E1065;">
          What we'll cover in your 30-minute demo:
        </h2>
        <p style="margin:0 0 24px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:23px;color:#3F3B5C;">
          No canned slide decks. We map the entire session around your exact operational workflows and software integrations.
        </p>

        <!-- 4 Numbered Agenda Items -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px 0;">
          <tr>
            <td width="36" valign="top" style="padding:4px 0;">
              <div style="background:#EDE9FE;color:#5B21B6;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;width:28px;height:28px;line-height:28px;text-align:center;border-radius:50%;">1</div>
            </td>
            <td valign="top" style="padding:4px 0 14px 10px;">
              <p style="margin:0 0 4px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:22px;font-weight:bold;color:#2E1065;">Live Interactive AI Simulation</p>
              <p style="margin:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:21px;color:#4B4869;">Test human-grade AI Voice calling (&lt;800ms latency) and WhatsApp Bots live on your own phone.</p>
            </td>
          </tr>
          <tr>
            <td width="36" valign="top" style="padding:4px 0;">
              <div style="background:#EDE9FE;color:#5B21B6;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;width:28px;height:28px;line-height:28px;text-align:center;border-radius:50%;">2</div>
            </td>
            <td valign="top" style="padding:4px 0 14px 10px;">
              <p style="margin:0 0 4px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:22px;font-weight:bold;color:#2E1065;">Custom Workflow & Logic Architecture</p>
              <p style="margin:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:21px;color:#4B4869;">How the agent handles qualification questions, booking rules, regional language accents, and human handoff.</p>
            </td>
          </tr>
          <tr>
            <td width="36" valign="top" style="padding:4px 0;">
              <div style="background:#EDE9FE;color:#5B21B6;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:22px;color:#2E1065;font-weight:bold;">3</div>
            </td>
            <td valign="top" style="padding:4px 0 14px 10px;">
              <p style="margin:0 0 4px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:22px;font-weight:bold;color:#2E1065;">CRM & Software Stack Integration</p>
              <p style="margin:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:21px;color:#4B4869;">Real-time 2-way writeback with Zoho CRM, Shopify, HubSpot, Twilio, Exotel, and Google Sheets.</p>
            </td>
          </tr>
          <tr>
            <td width="36" valign="top" style="padding:4px 0;">
              <div style="background:#EDE9FE;color:#5B21B6;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:22px;color:#2E1065;font-weight:bold;">4</div>
            </td>
            <td valign="top" style="padding:4px 0 6px 10px;">
              <p style="margin:0 0 4px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:22px;font-weight:bold;color:#2E1065;">Deployment Roadmap & ROI Breakdown</p>
              <p style="margin:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:21px;color:#4B4869;">Timeline to go live (under 7 days), pilot parameters, and expected cost reductions vs traditional teams.</p>
            </td>
          </tr>
        </table>

        <!-- PREPARATION BOX -->
        <div style="background:#F5F3FF;border:1px solid #DDD6FE;border-radius:10px;padding:20px;margin:0 0 26px 0;">
          <p style="margin:0 0 8px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:#2E1065;">💡 How to get the most from our session:</p>
          <ul style="margin:0;padding-left:20px;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;color:#4B4869;">
            <li>Bring 1 or 2 repetitive customer questions or call scenarios your team handles today.</li>
            <li>Note down your current CRM, helpdesk, or telephony stack (e.g. Zoho, Twilio, Shopify).</li>
            <li>Feel free to invite any teammates or decision-makers involved in the evaluation.</li>
          </ul>
        </div>
      </td>
    </tr>

    <!-- CLOSING HELP & BOOK DEMO PANEL -->
    <tr>
      <td bgcolor="#5B21B6" class="pad" style="background-color:#5B21B6;background-image:linear-gradient(135deg,#4C1D95 0%,#7C3AED 100%);padding:36px 38px 32px 38px;">
        <h2 style="margin:0 0 12px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:22px;line-height:28px;font-weight:bold;color:#FFFFFF;">
          Need to reschedule or have urgent questions?
        </h2>
        <p style="margin:0 0 20px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:23px;color:#EDE9FE;">
          Simply reply directly to this email (<a href="mailto:hello@theconverseai.com" style="color:#FFFFFF;text-decoration:underline;">hello@theconverseai.com</a>) or message us on WhatsApp at <strong style="color:#FFFFFF;">+91-9982323333</strong>.
        </p>

        <table role="presentation" class="btn" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 20px auto;text-align:center;">
          <tr>
            <td align="center" bgcolor="#FFFFFF" style="background:#FFFFFF;border-radius:8px;text-align:center;">
              <a href="https://theconverseai.com/book-demo?utm_source=brevo-automated&utm_medium=email&utm_campaign=demo-walkthrough&utm_content=book-demo-cta" style="display:inline-block;padding:14px 28px;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;font-weight:bold;color:#5B21B6;text-decoration:none;text-align:center;">
                Open Book Demo Page &rarr;
              </a>
            </td>
          </tr>
        </table>

        <p style="margin:0 0 6px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:22px;font-weight:600;color:#FFFFFF;">
          Team ConverseAI
        </p>
      </td>
    </tr>

    <!-- FOOTER & COMPLIANCE -->
    <tr>
      <td class="pad" style="padding:24px 12px 10px 12px;">
        <p style="margin:0 0 8px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;color:#6B6890;text-align:center;">
          <a href="mailto:contact@theconverseai.com" style="color:#6B6890;">contact@theconverseai.com</a> &nbsp;|&nbsp; +91-9982323333
        </p>
        <p style="margin:0 0 8px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;color:#6B6890;text-align:center;">
          <a href="https://www.linkedin.com/company/theconverseai" style="color:#7C3AED;">LinkedIn</a> &nbsp;|&nbsp;
          <a href="https://www.instagram.com/theconverseai/" style="color:#7C3AED;">Instagram</a> &nbsp;|&nbsp;
          <a href="https://www.facebook.com/61564130560658/" style="color:#7C3AED;">Facebook</a>
        </p>
        <p style="margin:0 0 4px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;line-height:16px;color:#8F8CAE;text-align:center;">
          You're receiving this because you requested a demo walkthrough with ConverseAI.
        </p>
        <p style="margin:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;line-height:16px;color:#8F8CAE;text-align:center;">
          <a href="https://theconverseai.com/privacy-policy" style="color:#6B6890;text-decoration:underline;">Privacy Policy</a>
        </p>
      </td>
    </tr>

  </table>

</td></tr>
</table>
</body>
</html>`;
}

/**
 * 2. Dedicated 7-Section WhatsApp Master HTML Email Template
 */
function buildWhatsAppMasterTemplate(firstName: string): string {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>Official Meta Cloud API WhatsApp AI Chatbots — ConverseAI</title>
<style>
  body { margin:0; padding:0; background:#F5F3FF; -webkit-text-size-adjust:100%; }
  table { border-collapse:collapse; }
  a { color:#7C3AED; }
  @media only screen and (max-width:620px) {
    .wrap { width:100% !important; }
    .pad { padding-left:20px !important; padding-right:20px !important; }
    .stack { display:block !important; width:100% !important; box-sizing:border-box !important; }
    .stack1 { margin-bottom:14px !important; }
    .gap { display:none !important; }
    .h1 { font-size:26px !important; line-height:32px !important; }
    .btn a { display:block !important; text-align:center !important; }
    .statnum { font-size:20px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#F5F3FF;">

<!-- Preheader (Inbox preview text) -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#F5F3FF;font-size:1px;line-height:1px;">
  Transform customer conversations with official WhatsApp Business AI agents.
  &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F5F3FF">
<tr><td align="center" style="padding:24px 10px;">

  <table role="presentation" class="wrap" width="640" cellpadding="0" cellspacing="0" border="0" style="width:640px;max-width:640px;">

    <!-- TOP BRAND BAR -->
    <tr>
      <td class="pad" style="padding:0 4px 14px 4px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="left" style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:22px;font-weight:bold;color:#7C3AED;">ConverseAI</td>
            <td align="right" style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;color:#6B6890;">
              <a href="https://theconverseai.com?utm_source=brevo-automated&utm_medium=email&utm_campaign=brand-header" style="color:#6B6890;text-decoration:underline;">View website</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- SECTION 1: HERO (VIOLET GRADIENT) -->
    <tr>
      <td bgcolor="#5B21B6" class="pad" style="background-color:#5B21B6;background-image:linear-gradient(135deg,#4C1D95 0%,#7C3AED 100%);padding:42px 38px 34px 38px;border-radius:12px 12px 0 0;">
        <p style="margin:0 0 12px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:22px;color:#DDD6FE;">
          Hi ${firstName || "there"},
        </p>
        <h1 class="h1" style="margin:0 0 16px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:32px;line-height:38px;font-weight:bold;color:#FFFFFF;letter-spacing:-0.5px;">
          Enhanced Conversations with WhatsApp AI Chatbots
        </h1>
        <p style="margin:0 0 28px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:25px;color:#EDE9FE;">
          Simplify customer queries with AI-driven WhatsApp automation, deliver personalized replies, and convert inbound leads at scale 24/7.
        </p>

        <!-- Centered Main Hero CTA Button -->
        <table role="presentation" class="btn" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 34px auto;">
          <tr>
            <td align="center" bgcolor="#FFFFFF" style="background:#FFFFFF;border-radius:8px;text-align:center;">
              <a href="https://theconverseai.com/whatsapp-ai-chatbot?utm_source=brevo-automated&utm_medium=email&utm_campaign=whatsapp-followup&utm_content=hero-cta" style="display:inline-block;padding:15px 32px;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;color:#5B21B6;text-decoration:none;text-align:center;">
                Explore WhatsApp AI &rarr;
              </a>
            </td>
          </tr>
        </table>

        <!-- Visual Live Simulation Card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;color:#C4B5FD;padding:0 0 6px 0;">Customer, on WhatsApp (10:15 PM)</td>
          </tr>
          <tr>
            <td align="left" style="padding:0 0 16px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;">
                <tr>
                  <td bgcolor="#FFFFFF" style="background:#FFFFFF;border-radius:4px 14px 14px 14px;padding:12px 16px;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:22px;color:#2E1065;">
                    "Hi, can you share the brochure for your premium plan and confirm pricing?"
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;color:#C4B5FD;padding:0 0 6px 0;">ConverseAI WhatsApp Agent, in 3 seconds</td>
          </tr>
          <tr>
            <td bgcolor="#3B1580" style="background:#3B1580;border-radius:10px;padding:16px 18px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="24" valign="top" style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:24px;color:#86EFAC;font-weight:bold;">&#10003;</td>
                  <td style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:24px;color:#FFFFFF;">Recognized customer query & verified contact profile</td>
                </tr>
                <tr>
                  <td width="24" valign="top" style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:24px;color:#86EFAC;font-weight:bold;">&#10003;</td>
                  <td style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:24px;color:#FFFFFF;">Dispatched interactive brochure PDF & pricing tiers</td>
                </tr>
                <tr>
                  <td width="24" valign="top" style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:24px;color:#86EFAC;font-weight:bold;">&#10003;</td>
                  <td style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:24px;color:#FFFFFF;">Offered instant slot for solutions architect walkthrough</td>
                </tr>
                <tr>
                  <td width="24" valign="top" style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:24px;color:#86EFAC;font-weight:bold;">&#10003;</td>
                  <td style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:24px;color:#FFFFFF;">Logged qualified lead in Zoho CRM & alerted sales team</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;color:#C4B5FD;padding:8px 0 0 0;">An illustrative example: 98% open rate, instant conversion, four tasks finished.</td>
          </tr>
        </table>

      </td>
    </tr>

    <!-- SECTION 2: STATS STRIP -->
    <tr>
      <td bgcolor="#4C1D95" style="background-color:#4C1D95;background-image:linear-gradient(135deg,#7C3AED 0%,#4C1D95 100%);padding:20px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center" width="25%" valign="top">
              <p class="statnum" style="margin:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:24px;line-height:28px;font-weight:bold;color:#FFFFFF;">98%</p>
              <p style="margin:2px 0 0 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;line-height:15px;color:#DDD6FE;">WhatsApp open rate</p>
            </td>
            <td align="center" width="25%" valign="top">
              <p class="statnum" style="margin:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:24px;line-height:28px;font-weight:bold;color:#FFFFFF;">60%</p>
              <p style="margin:2px 0 0 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;line-height:15px;color:#DDD6FE;">faster response</p>
            </td>
            <td align="center" width="25%" valign="top">
              <p class="statnum" style="margin:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:24px;line-height:28px;font-weight:bold;color:#FFFFFF;">24/7</p>
              <p style="margin:2px 0 0 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;line-height:15px;color:#DDD6FE;">always-on</p>
            </td>
            <td align="center" width="25%" valign="top">
              <p class="statnum" style="margin:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:24px;line-height:28px;font-weight:bold;color:#FFFFFF;">50+</p>
              <p style="margin:2px 0 0 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;line-height:15px;color:#DDD6FE;">businesses</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- SECTION 3: SIDE-BY-SIDE COMPARISON (THE DIFFERENCE) -->
    <tr>
      <td bgcolor="#FFFFFF" class="pad" style="background:#FFFFFF;padding:40px 38px 10px 38px;">
        <h2 style="margin:0 0 10px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:22px;line-height:28px;font-weight:bold;color:#2E1065;">
          The difference, in 20 seconds
        </h2>
        <p style="margin:0 0 24px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:24px;color:#4B476D;">
          A broadcast talks at people. An AI agent converses and closes. Same WhatsApp app, very different result.
        </p>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px 0;">
          <tr>
            <!-- Left: Static Broadcasts -->
            <td class="stack stack1" width="47%" valign="top" bgcolor="#F5F3FF" style="background:#F5F3FF;border:1px solid #DDD6FE;border-radius:10px;padding:20px;">
              <p style="margin:0 0 12px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:22px;color:#6B6890;font-weight:bold;">
                ❌ Static Bulk WhatsApp Blasts
              </p>
              <p style="margin:0 0 8px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;color:#6B6890;">
                • One-way broadcast blasts that get reported or blocked
              </p>
              <p style="margin:0 0 8px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;color:#6B6890;">
                • Clunky keypad menu trees that break on free-text questions
              </p>
              <p style="margin:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;color:#6B6890;">
                • Requires manual copy-pasting from chat to CRM
              </p>
            </td>

            <td class="gap" width="6%" style="font-size:1px;line-height:1px;">&nbsp;</td>

            <!-- Right: ConverseAI Agents -->
            <td class="stack" width="47%" valign="top" bgcolor="#6D28D9" style="background-color:#6D28D9;background-image:linear-gradient(135deg,#4C1D95 0%,#7C3AED 100%);border-radius:10px;padding:20px;">
              <p style="margin:0 0 12px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:22px;color:#FFFFFF;font-weight:bold;">
                ✅ ConverseAI WhatsApp Agents
              </p>
              <p style="margin:0 0 8px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;color:#FFFFFF;">
                • Two-way intelligent conversations understanding context
              </p>
              <p style="margin:0 0 8px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;color:#FFFFFF;">
                • Interactive product catalogs, carousels & payment links
              </p>
              <p style="margin:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;color:#FFFFFF;">
                • 2-way real-time sync with Zoho CRM & Shopify
              </p>
            </td>
          </tr>
        </table>

        <!-- SECTION 4: WHY NOW (MARKET RESEARCH & STATS) -->
        <h2 style="margin:0 0 10px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:22px;line-height:28px;font-weight:bold;color:#2E1065;">
          Why WhatsApp is where business gets done in 2026
        </h2>
        <p style="margin:0 0 14px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:24px;color:#3F3B5C;">
          <strong style="color:#2E1065;">45%+ response rates and 98% open rates</strong> make WhatsApp the single highest-converting communication channel in existence.
        </p>
        <p style="margin:0 0 24px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:22px;color:#5E5A80;">
          Gartner projects over 80% of customer interactions will occur on messaging platforms by 2026. Businesses using ConverseAI WhatsApp bots see 4x higher lead conversions than passive website forms. 
          <a href="https://theconverseai.com/whatsapp-ai-chatbot" style="color:#7C3AED;font-weight:600;">Explore WhatsApp AI features &rarr;</a>
        </p>

        <!-- SECTION 5: WHAT WE BUILD (4 DEEP FEATURE PILLARS) -->
        <h2 style="margin:28px 0 10px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:22px;line-height:28px;font-weight:bold;color:#2E1065;">
          What We Build For You:
        </h2>
        <p style="margin:0 0 20px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:23px;color:#4B476D;">
          Official WhatsApp Cloud API verification, catalog integration, and custom AI prompt tuning—handled start to finish.
        </p>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px 0;">
          <!-- Pillar 1 -->
          <tr>
            <td style="border-left:4px solid #7C3AED;padding:4px 0 8px 16px;">
              <p style="margin:0 0 4px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:22px;font-weight:bold;color:#2E1065;">
                1. Official WhatsApp Cloud API & Green Tick
              </p>
              <p style="margin:0 0 6px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:21px;color:#4B476D;">
                Build instant trust with verified WhatsApp Business account setup, high messaging limits, and official Meta compliance.
              </p>
              <a href="https://theconverseai.com/whatsapp-ai-chatbot?utm_source=brevo-automated&utm_medium=email&utm_campaign=whatsapp-followup&utm_content=row-api" style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;font-weight:bold;color:#7C3AED;text-decoration:none;">See Cloud API setup &rarr;</a>
            </td>
          </tr>
          <tr><td style="font-size:1px;line-height:16px;">&nbsp;</td></tr>

          <!-- Pillar 2 -->
          <tr>
            <td style="border-left:4px solid #7C3AED;padding:4px 0 8px 16px;">
              <p style="margin:0 0 4px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:22px;font-weight:bold;color:#2E1065;">
                2. Automated Lead Qualification & Booking
              </p>
              <p style="margin:0 0 6px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:21px;color:#4B476D;">
                Qualify inbound leads conversationally, collect essential details, and book demos directly into your team's calendar 24/7.
              </p>
              <a href="https://theconverseai.com/whatsapp-ai-chatbot?utm_source=brevo-automated&utm_medium=email&utm_campaign=whatsapp-followup&utm_content=row-qualification" style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;font-weight:bold;color:#7C3AED;text-decoration:none;">See lead qualification &rarr;</a>
            </td>
          </tr>
          <tr><td style="font-size:1px;line-height:16px;">&nbsp;</td></tr>

          <!-- Pillar 3 -->
          <tr>
            <td style="border-left:4px solid #7C3AED;padding:4px 0 8px 16px;">
              <p style="margin:0 0 4px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:22px;font-weight:bold;color:#2E1065;">
                3. Interactive Catalogs & In-Chat Checkouts
              </p>
              <p style="margin:0 0 6px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:21px;color:#4B476D;">
                Send dynamic product carousels, instant price quotes, payment links, and order tracking right inside WhatsApp chat.
              </p>
              <a href="https://theconverseai.com/whatsapp-ai-chatbot?utm_source=brevo-automated&utm_medium=email&utm_campaign=whatsapp-followup&utm_content=row-catalog" style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;font-weight:bold;color:#7C3AED;text-decoration:none;">See catalog features &rarr;</a>
            </td>
          </tr>
          <tr><td style="font-size:1px;line-height:16px;">&nbsp;</td></tr>

          <!-- Pillar 4 -->
          <tr>
            <td style="border-left:4px solid #7C3AED;padding:4px 0 8px 16px;">
              <p style="margin:0 0 4px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:22px;font-weight:bold;color:#2E1065;">
                4. Unified Team Inbox with Live Human Handoff
              </p>
              <p style="margin:0 0 6px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:21px;color:#4B476D;">
                Monitor live conversations, jump in with one-click human takeover, and sync all chat histories directly into Zoho CRM.
              </p>
              <a href="https://theconverseai.com/whatsapp-ai-chatbot?utm_source=brevo-automated&utm_medium=email&utm_campaign=whatsapp-followup&utm_content=row-inbox" style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;font-weight:bold;color:#7C3AED;text-decoration:none;">See team inbox &rarr;</a>
            </td>
          </tr>
        </table>

        <!-- Social Proof -->
        <p style="margin:22px 0 34px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;color:#6B6890;">
          Trusted by high-growth brands including Tata Motors, Zapp Loans, Mapsor, and Readiprint.
        </p>
      </td>
    </tr>

    <!-- SECTION 6: DIAGNOSIS & SECONDARY CONVERSION CTA -->
    <tr>
      <td bgcolor="#5B21B6" class="pad" style="background-color:#5B21B6;background-image:linear-gradient(135deg,#4C1D95 0%,#7C3AED 100%);padding:38px 38px 36px 38px;">
        <h2 style="margin:0 0 14px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:22px;line-height:28px;font-weight:bold;color:#FFFFFF;">
          Does any of this sound familiar?
        </h2>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px 0;">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #7B52D6;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:22px;color:#FFFFFF;">
              • Inbound WhatsApp inquiries sit unread for hours during peak traffic or after 7 PM.
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #7B52D6;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:22px;color:#FFFFFF;">
              • Website visitors drop off instead of filling out long, boring contact forms.
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #7B52D6;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:22px;color:#FFFFFF;">
              • Sales reps spend hours manually answering repetitive pricing and catalog inquiries.
            </td>
          </tr>
        </table>

        <p style="margin:0 0 22px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:22px;color:#EDE9FE;">
          Nodded at even one? That's a strong first use case. Our free AI Opportunity Audit maps the ideal WhatsApp workflow and conversion funnel for your business.
        </p>

        <table role="presentation" class="btn" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 20px auto;">
          <tr>
            <td align="center" bgcolor="#FFFFFF" style="background:#FFFFFF;border-radius:8px;text-align:center;">
              <a href="https://theconverseai.com/whatsapp-ai-chatbot?utm_source=brevo-automated&utm_medium=email&utm_campaign=whatsapp-followup&utm_content=audit-cta" style="display:inline-block;padding:15px 32px;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;font-weight:bold;color:#5B21B6;text-decoration:none;text-align:center;">
                Get My Free WhatsApp AI Strategy Audit &rarr;
              </a>
            </td>
          </tr>
        </table>

        <p style="margin:0 0 6px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:22px;font-weight:600;color:#FFFFFF;">
          Team ConverseAI
        </p>
      </td>
    </tr>

    <!-- SECTION 7: FOOTER & COMPLIANCE -->
    <tr>
      <td class="pad" style="padding:24px 12px 10px 12px;">
        <p style="margin:0 0 8px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;color:#6B6890;text-align:center;">
          <a href="mailto:contact@theconverseai.com" style="color:#6B6890;">contact@theconverseai.com</a> &nbsp;|&nbsp; +91-9982323333
        </p>
        <p style="margin:0 0 8px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;color:#6B6890;text-align:center;">
          <a href="https://www.linkedin.com/company/theconverseai" style="color:#7C3AED;text-decoration:none;">LinkedIn</a> &nbsp;|&nbsp;
          <a href="https://www.instagram.com/theconverseai/" style="color:#7C3AED;text-decoration:none;">Instagram</a> &nbsp;|&nbsp;
          <a href="https://www.facebook.com/61564130560658/" style="color:#7C3AED;text-decoration:none;">Facebook</a>
        </p>
        <p style="margin:0 0 4px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;line-height:16px;color:#8F8CAE;text-align:center;">
          You're receiving this because you connected with ConverseAI.
        </p>
        <p style="margin:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;line-height:16px;color:#8F8CAE;text-align:center;">
          <a href="https://theconverseai.com/privacy-policy" style="color:#6B6890;text-decoration:underline;">Privacy Policy</a>
        </p>
      </td>
    </tr>

  </table>

</td></tr>
</table>
</body>
</html>`;
}

/**
 * Maps other products/services to tailored email content and UTM tracking.
 */
function getServiceConfig(rawProduct: string): ServiceEmailConfig {
  const p = (rawProduct || "").toLowerCase();

  // 1. AI VOICE AGENTS
  if (p.includes("voice") || p.includes("call") || p.includes("telephon")) {
    return {
      serviceTitle: "AI Voice Agents",
      subject: "Autonomous AI Voice Agents for Your Business — ConverseAI",
      heroHeadline: "AI Voice Agents Built For Rapid Business Growth",
      heroDesc:
        "We engineer human-like AI Voice Agents that answer 100% of inbound customer calls, qualify high-value leads in natural English & Hindi, and schedule calendar appointments 24/7.",
      simUser:
        '"We need an AI voice agent that can answer customer calls, speak natural Hindi & English, and book meetings into our CRM."',
      simAgentTitle: "ConverseAI Voice Agent (<800ms latency)",
      check1:
        "Answers 100% of calls in <800ms with natural Hindi & English fluency",
      check2:
        "Handles objections and qualifies budget, location & timeline before confirming slots",
      check3:
        "Syncs full call recordings, transcripts & data points into Zoho CRM live",
      stat1Val: "<800ms",
      stat1Lbl: "Voice Latency",
      stat2Val: "100%",
      stat2Lbl: "Call Pickup",
      stat3Val: "75%",
      stat3Lbl: "Cost Cut",
      ctaCampaign: "voice-agent-nurture",
    };
  }

  // 2. AI STRATEGY & READINESS AUDIT
  if (
    p.includes("audit") ||
    p.includes("strategy") ||
    p.includes("readiness") ||
    p.includes("diagnostic")
  ) {
    return {
      serviceTitle: "AI Strategy & Readiness Audit",
      subject: "Your AI Strategy & Readiness Audit — ConverseAI",
      heroHeadline: "Your 60-Day Enterprise AI Production Roadmap",
      heroDesc:
        "Thank you for requesting an AI Strategy Audit. We evaluate your current workflows, identify high-ROI automation areas, and design your 60-day AI production deployment plan.",
      simUser:
        '"We want to identify which business operations can be automated with AI first to get the highest ROI with lowest risk."',
      simAgentTitle: "ConverseAI Strategy Roadmap",
      check1:
        "Deep audit of current customer support, CRM & sales bottlenecks",
      check2:
        "Clear ROI projection, latency benchmarks and cost-reduction model",
      check3:
        "Step-by-step 60-day production deployment roadmap with architecture blueprint",
      stat1Val: "100%",
      stat1Lbl: "Custom Audit",
      stat2Val: "3-5x",
      stat2Lbl: "Target ROI",
      stat3Val: "60 Days",
      stat3Lbl: "To Production",
      ctaCampaign: "ai-audit-nurture",
    };
  }

  // 3. SALES AI & INTELLIGENCE
  if (p.includes("sales") || p.includes("outreach") || p.includes("pipeline")) {
    return {
      serviceTitle: "Sales AI & Lead Intelligence",
      subject: "Scale Your Sales Pipeline Autonomously — ConverseAI",
      heroHeadline: "Autonomous Sales AI That Fills Your Pipeline 24/7",
      heroDesc:
        "We build autonomous Sales AI systems that score incoming leads, enrich prospect profiles, run hyper-personalized multi-channel follow-ups, and book qualified discovery calls.",
      simUser:
        '"We need an AI agent that qualifies inbound prospects instantly and books calls only with decision-makers who match our ICP."',
      simAgentTitle: "ConverseAI Sales Agent",
      check1:
        "Instant qualification on company size, budget, urgency and decision authority",
      check2:
        "Multi-touch follow-up via WhatsApp, email and SMS with zero manual effort",
      check3:
        "Direct CRM sync and round-robin meeting booking on sales rep calendars",
      stat1Val: "2.5x",
      stat1Lbl: "Pipeline Speed",
      stat2Val: "90%",
      stat2Lbl: "ICP Accuracy",
      stat3Val: "65%",
      stat3Lbl: "Rep Time Saved",
      ctaCampaign: "sales-ai-nurture",
    };
  }

  // 4. KNOWLEDGE INTELLIGENCE (ENTERPRISE RAG)
  if (
    p.includes("knowledge") ||
    p.includes("rag") ||
    p.includes("document") ||
    p.includes("internal")
  ) {
    return {
      serviceTitle: "Knowledge Intelligence (Enterprise RAG)",
      subject: "Unlock Enterprise Knowledge with Private AI — ConverseAI",
      heroHeadline: "Private RAG Systems Built On Your Proprietary Data",
      heroDesc:
        "Transform your PDFs, internal wikis, documentation, and support tickets into an ultra-fast, hallucination-free AI assistant with strict role-based access control.",
      simUser:
        '"Our support and operations teams spend hours searching internal SOPs and manuals. We need private semantic search."',
      simAgentTitle: "ConverseAI Knowledge Engine",
      check1:
        "Connects to internal documentation, Notion, Google Drive, and PDFs",
      check2:
        "Hallucination-free answers with exact citations and document page links",
      check3:
        "Enterprise-grade security with SOC2 compliance and role-based permissions",
      stat1Val: "99.4%",
      stat1Lbl: "Citation Accuracy",
      stat2Val: "10x",
      stat2Lbl: "Faster Search",
      stat3Val: "Zero",
      stat3Lbl: "Data Leakage",
      ctaCampaign: "knowledge-ai-nurture",
    };
  }

  // 5. OMNICHANNEL & LIVE CHAT PLATFORM
  if (
    p.includes("live-chat") ||
    p.includes("live chat") ||
    p.includes("omni") ||
    p.includes("chatbot")
  ) {
    return {
      serviceTitle: "Omnichannel Live Chat & AI",
      subject: "Unified Omnichannel Customer Engagement — ConverseAI",
      heroHeadline: "One Unified Inbox For Web, WhatsApp, Instagram & Email",
      heroDesc:
        "Engage visitors the moment they land on your site. Our smart live chat and AI bot triage inquiries, capture contact info, and route hot leads to your agents seamlessly.",
      simUser:
        '"We want a single dashboard where our team can chat with customers across Website, WhatsApp, and Instagram with AI assistance."',
      simAgentTitle: "ConverseAI Omnichannel Hub",
      check1:
        "Pre-chat qualification forms that capture verified phone & email upfront",
      check2:
        "Smart AI auto-replies for repetitive FAQs with seamless human handoff",
      check3:
        "Full CSAT reporting, agent capacity tracking, and CRM synchronization",
      stat1Val: "<30s",
      stat1Lbl: "First Response",
      stat2Val: "94%",
      stat2Lbl: "CSAT Score",
      stat3Val: "4x",
      stat3Lbl: "Agent Capacity",
      ctaCampaign: "omnichannel-nurture",
    };
  }

  // 6. DEFAULT / GENERAL ENQUIRY
  return {
    serviceTitle: "Autonomous AI Agents",
    subject: "Autonomous AI Solutions Built For Your Growth — ConverseAI",
    heroHeadline: "Autonomous AI Agents Built For Your Growth",
    heroDesc:
      "Thank you for reaching out to ConverseAI. We engineer production-ready AI Voice & WhatsApp bots that resolve customer queries, book qualified meetings, and update your CRM live.",
    simUser:
      '"We need an AI agent that speaks Hindi & English, answers customer questions 24/7, and schedules meetings into our calendar."',
    simAgentTitle: "ConverseAI Agent (<800ms natural response)",
    check1:
      "Answers 100% of customer inquiries in <800ms with natural Hindi & English fluency",
    check2:
      "Qualifies budget, location & timeline before confirming calendar slots",
    check3:
      "Syncs call recordings, chat transcripts & customer data directly into Zoho CRM live",
    stat1Val: "<800ms",
    stat1Lbl: "Voice Latency",
    stat2Val: "98%",
    stat2Lbl: "Open Rates",
    stat3Val: "70%",
    stat3Lbl: "Cost Cut",
    ctaCampaign: "general-nurture",
  };
}

/**
 * 3. Builds the general responsive luxury violet HTML email template for other services.
 */
function buildHtmlTemplate(
  firstName: string,
  c: ServiceEmailConfig
): string {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${c.subject}</title>
<style>
  body { margin:0; padding:0; background:#F5F3FF; -webkit-text-size-adjust:100%; }
  table { border-collapse:collapse; }
  a { color:#7C3AED; }
  @media only screen and (max-width:620px) {
    .wrap { width:100% !important; }
    .pad { padding-left:18px !important; padding-right:18px !important; }
    .stack { display:block !important; width:100% !important; box-sizing:border-box !important; }
    .stack1 { margin-bottom:12px !important; }
    .gap { display:none !important; }
    .h1 { font-size:26px !important; line-height:32px !important; }
    .btn a { display:block !important; text-align:center !important; }
    .statnum { font-size:22px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#F5F3FF;">

<!-- Preheader (Inbox preview text) -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#F5F3FF;font-size:1px;line-height:1px;">
  Automate customer conversations & phone calls with ConverseAI.
  &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F5F3FF">
<tr><td align="center" style="padding:20px 10px;">

  <table role="presentation" class="wrap" width="640" cellpadding="0" cellspacing="0" border="0" style="width:640px;max-width:640px;">

    <!-- Top Bar -->
    <tr>
      <td class="pad" style="padding:0 4px 14px 4px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="left" style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:22px;font-weight:bold;color:#7C3AED;">ConverseAI</td>
            <td align="right" style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;color:#6B6890;">
              <a href="https://theconverseai.com?utm_source=brevo-automated&utm_medium=email&utm_campaign=brand-header" style="color:#6B6890;text-decoration:underline;">View website</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- HERO SECTION (Luxury Violet Gradient) -->
    <tr>
      <td bgcolor="#5B21B6" class="pad" style="background-color:#5B21B6;background-image:linear-gradient(135deg,#4C1D95 0%,#7C3AED 100%);padding:42px 38px 34px 38px;border-radius:12px 12px 0 0;">
        <p style="margin:0 0 12px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:22px;color:#DDD6FE;">
          Hi ${firstName || "there"},
        </p>
        <h1 class="h1" style="margin:0 0 16px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:32px;line-height:38px;font-weight:bold;color:#FFFFFF;letter-spacing:-0.5px;">
          ${c.heroHeadline}
        </h1>
        <p style="margin:0 0 28px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:25px;color:#EDE9FE;">
          ${c.heroDesc}
        </p>

        <!-- CENTERED HIGH-CONVERTING CTA BUTTON -->
        <table role="presentation" class="btn" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 32px auto;">
          <tr>
            <td align="center" bgcolor="#FFFFFF" style="background:#FFFFFF;border-radius:8px;text-align:center;">
              <a href="https://theconverseai.com/book-demo?utm_source=brevo-automated&utm_medium=email&utm_campaign=${c.ctaCampaign}&utm_content=hero-cta" style="display:inline-block;padding:15px 32px;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;color:#5B21B6;text-decoration:none;text-align:center;">
                Schedule Your 15-Min Live Demo &rarr;
              </a>
            </td>
          </tr>
        </table>

        <!-- LIVE SIMULATION CARD -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;color:#C4B5FD;padding:0 0 6px 0;">Customer Request Example</td>
          </tr>
          <tr>
            <td align="left" style="padding:0 0 16px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;">
                <tr>
                  <td bgcolor="#FFFFFF" style="background:#FFFFFF;border-radius:4px 14px 14px 14px;padding:12px 16px;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:22px;color:#2E1065;">
                    ${c.simUser}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;color:#C4B5FD;padding:0 0 6px 0;">${c.simAgentTitle}</td>
          </tr>
          <tr>
            <td bgcolor="#3B1580" style="background:#3B1580;border-radius:10px;padding:16px 18px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="24" valign="top" style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:24px;color:#86EFAC;font-weight:bold;">&#10003;</td>
                  <td style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:24px;color:#FFFFFF;">${c.check1}</td>
                </tr>
                <tr>
                  <td width="24" valign="top" style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:24px;color:#86EFAC;font-weight:bold;">&#10003;</td>
                  <td style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:24px;color:#FFFFFF;">${c.check2}</td>
                </tr>
                <tr>
                  <td width="24" valign="top" style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:24px;color:#86EFAC;font-weight:bold;">&#10003;</td>
                  <td style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:24px;color:#FFFFFF;">${c.check3}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <!-- METRICS STRIP -->
    <tr>
      <td bgcolor="#4C1D95" style="background-color:#4C1D95;background-image:linear-gradient(135deg,#7C3AED 0%,#4C1D95 100%);padding:18px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center" width="25%" valign="top">
              <p class="statnum" style="margin:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:24px;line-height:28px;font-weight:bold;color:#FFFFFF;">${c.stat1Val}</p>
              <p style="margin:2px 0 0 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;line-height:15px;color:#DDD6FE;">${c.stat1Lbl}</p>
            </td>
            <td align="center" width="25%" valign="top">
              <p class="statnum" style="margin:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:24px;line-height:28px;font-weight:bold;color:#FFFFFF;">${c.stat2Val}</p>
              <p style="margin:2px 0 0 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;line-height:15px;color:#DDD6FE;">${c.stat2Lbl}</p>
            </td>
            <td align="center" width="25%" valign="top">
              <p class="statnum" style="margin:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:24px;line-height:28px;font-weight:bold;color:#FFFFFF;">${c.stat3Val}</p>
              <p style="margin:2px 0 0 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;line-height:15px;color:#DDD6FE;">${c.stat3Lbl}</p>
            </td>
            <td align="center" width="25%" valign="top">
              <p class="statnum" style="margin:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:24px;line-height:28px;font-weight:bold;color:#FFFFFF;">24/7</p>
              <p style="margin:2px 0 0 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;line-height:15px;color:#DDD6FE;">Autonomous</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- FOOTER & COMPLIANCE -->
    <tr>
      <td class="pad" style="padding:24px 12px 10px 12px;">
        <p style="margin:0 0 8px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;color:#6B6890;text-align:center;">
          <a href="mailto:contact@theconverseai.com" style="color:#6B6890;">contact@theconverseai.com</a> &nbsp;|&nbsp; +91-9982323333
        </p>
        <p style="margin:0 0 8px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;color:#6B6890;text-align:center;">
          <a href="https://www.linkedin.com/company/theconverseai" style="color:#7C3AED;text-decoration:none;">LinkedIn</a> &nbsp;|&nbsp;
          <a href="https://www.instagram.com/theconverseai/" style="color:#7C3AED;text-decoration:none;">Instagram</a> &nbsp;|&nbsp;
          <a href="https://www.facebook.com/61564130560658/" style="color:#7C3AED;text-decoration:none;">Facebook</a>
        </p>
        <p style="margin:0 0 4px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;line-height:16px;color:#8F8CAE;text-align:center;">
          You're receiving this because you connected with ConverseAI.
        </p>
        <p style="margin:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;line-height:16px;color:#8F8CAE;text-align:center;">
          <a href="https://theconverseai.com/privacy-policy" style="color:#6B6890;text-decoration:underline;">Privacy Policy</a>
        </p>
      </td>
    </tr>

  </table>

</td></tr>
</table>
</body>
</html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { email, fullName, product, subject, extraFields, message, form_source } =
      req.body || {};

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ error: "Valid email is required." });
    }

    // Skip sending email for partial leads (abandoned forms on email blur)
    if (
      extraFields?.partial_lead === "true" ||
      extraFields?.send_user_email === "false"
    ) {
      return res.status(200).json({ skipped: true, reason: "Partial lead" });
    }

    // Extract first name cleanly
    const firstName = (fullName || "").trim().split(/\s+/)[0] || "there";

    // Detect if demo booking / scheduling walkthrough was requested
    const formSource = (form_source || "").toLowerCase();
    const rawInterest = (product || subject || message || "").toLowerCase();

    const isDemoBooking =
      formSource.includes("book demo") ||
      formSource.includes("demo") ||
      rawInterest.includes("book demo");

    const isWhatsApp =
      rawInterest.includes("whatsapp") ||
      rawInterest.includes("shop") ||
      rawInterest.includes("catalog") ||
      rawInterest.includes("wa-");

    let htmlContent: string;
    let serviceSubject: string;
    let campaignTag: string;

    if (isDemoBooking) {
      // 1. DEDICATED DEMO WALKTHROUGH SCHEDULING MASTER TEMPLATE (User clicks to pick slot on /book-demo)
      htmlContent = buildDemoWalkthroughTemplate(firstName, product || "AI Solutions");
      serviceSubject = "Your 1-on-1 Demo Walkthrough with ConverseAI";
      campaignTag = "demo-walkthrough";
    } else if (isWhatsApp) {
      // 2. DEDICATED 7-SECTION WHATSAPP MASTER TEMPLATE
      htmlContent = buildWhatsAppMasterTemplate(firstName);
      serviceSubject = "Official Meta Cloud API WhatsApp AI Chatbots — ConverseAI";
      campaignTag = "whatsapp-followup";
    } else {
      // 3. SPECIALIZED SERVICE PROFILE (VOICE AGENT / AUDIT / SALES AI / GENERAL)
      const serviceConfig = getServiceConfig(rawInterest);
      htmlContent = buildHtmlTemplate(firstName, serviceConfig);
      serviceSubject = serviceConfig.subject;
      campaignTag = serviceConfig.ctaCampaign;
    }

    const brevoPayload = {
      sender: { name: BREVO_SENDER_NAME, email: BREVO_SENDER_EMAIL },
      to: [{ email: email.trim(), name: fullName || firstName }],
      replyTo: {
        email: "contact@theconverseai.com",
        name: "Converse AI Support",
      },
      subject: serviceSubject,
      htmlContent,
      tags: [campaignTag, "website-inbound-lead"],
    };

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify(brevoPayload),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("Brevo API error:", result);
      return res
        .status(response.status)
        .json({ error: "Brevo API call failed", details: result });
    }

    return res.status(200).json({
      success: true,
      serviceSent: serviceSubject,
      campaign: campaignTag,
      messageId: (result as { messageId?: string }).messageId,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Server error sending Brevo email:", errorMsg);
    return res.status(500).json({ error: "Internal server error", details: errorMsg });
  }
}
