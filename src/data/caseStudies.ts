export interface CaseStudyMetric {
  label: string;
  value: string;
  description: string;
}

export interface CaseStudySection {
  title: string;
  content: string;
}

export interface CaseStudy {
  id: number;
  slug: string;
  company: string;
  industry: string;
  category: string;
  tagline: string;
  excerpt: string;
  heroImage: string;
  logo: string;
  readTime: string;
  publishedDate: string;
  metrics: CaseStudyMetric[];
  challenge: string;
  solution: string;
  outcome: string;
  sections: CaseStudySection[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    avatarUrl?: string;
  };
  featuresUsed: string[];
  useCase: string[];
  displayOrder?: number;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    slug: "retail-brand-whatsapp-automation",
    company: "StyleMart India",
    industry: "Retail & E-Commerce",
    category: "WhatsApp Marketing",
    tagline: "How StyleMart achieved 3× revenue growth with WhatsApp AI automation",
    excerpt:
      "StyleMart India scaled their customer engagement using ConverseAI's WhatsApp AI Chatbot, resulting in a 3× increase in repeat purchases and a 65% reduction in support costs.",
    heroImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop",
    logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=80&h=80&fit=crop",
    readTime: "5 min read",
    publishedDate: "March 2025",
    metrics: [
      { label: "Revenue Growth", value: "3×", description: "Increase in repeat purchase revenue within 6 months" },
      { label: "Support Cost Saved", value: "65%", description: "Reduction in customer support operational costs" },
      { label: "Response Time", value: "< 30s", description: "Average first response time to customer queries" },
      { label: "CSAT Score", value: "94%", description: "Customer satisfaction score across all channels" },
    ],
    challenge:
      "StyleMart India, a fast-growing fashion retailer with 150+ stores, struggled to handle the surge of customer queries during seasonal sales. Their support team was overwhelmed, response times stretched to 6–8 hours, cart abandonment was at an all-time high of 72%, and re-engagement campaigns had near-zero open rates via email.",
    solution:
      "ConverseAI deployed a full WhatsApp AI Chatbot integrated with StyleMart's product catalog and order management system. Automated flows handled order tracking, product recommendations, abandoned cart recovery, and promotional broadcasts — all personalised based on past purchase behavior.",
    outcome:
      "Within six months of going live, StyleMart saw a 3× uplift in repeat purchase revenue driven by personalised WhatsApp re-engagement. Support costs dropped 65% as the AI resolved 80% of queries without human intervention. Abandoned cart recovery messages achieved a 38% conversion rate, far exceeding their previous email benchmarks.",
    sections: [
      {
        title: "The Problem: Scale Without Compromise",
        content:
          "As StyleMart expanded across Tier 1 and Tier 2 cities, their customer base grew faster than their support infrastructure. During festive seasons like Diwali and End-of-Season sales, query volumes spiked by 400%, causing agents to burn out and customers to churn. Email open rates hovered at 12%, making re-engagement campaigns ineffective.",
      },
      {
        title: "Why ConverseAI?",
        content:
          "StyleMart evaluated three platforms before choosing ConverseAI. The decision came down to three factors: native WhatsApp Business API integration, AI that could be trained on their specific product catalog, and a live chat fallback that let human agents take over complex queries seamlessly.",
      },
      {
        title: "Implementation in 3 Weeks",
        content:
          "The ConverseAI team onboarded StyleMart in 21 days. Week 1 covered catalog sync and chatbot training. Week 2 was live testing with a cohort of 500 customers. Week 3 was a full rollout with live agent backup. The phased approach meant zero disruption to existing operations.",
      },
      {
        title: "Results That Moved the Needle",
        content:
          "Post-deployment analytics showed an immediate drop in first-response time from 6 hours to under 30 seconds. The AI handled 80% of all inbound queries autonomously. Personalised WhatsApp broadcasts achieved 61% open rates and 38% cart recovery — numbers the team had never seen before.",
      },
    ],
    testimonial: {
      quote:
        "ConverseAI completely transformed how we talk to our customers. The WhatsApp chatbot feels like having 100 support agents available 24/7 at a fraction of the cost. Our customers love the instant responses.",
      author: "Priya Sharma",
      role: "Head of Digital, StyleMart India",
    },
    featuresUsed: ["WhatsApp AI Chatbot", "WhatsApp Marketing", "Live Chat", "CSAT Report"],
    useCase: [
      "Abandoned cart recovery",
      "Order tracking automation",
      "Personalised broadcast campaigns",
      "Product recommendations",
    ],
  },
  {
    id: 2,
    slug: "edtech-startup-chatbot-lead-generation",
    company: "LearnSphere",
    industry: "EdTech",
    category: "AI Chatbot",
    tagline: "LearnSphere cut lead response time by 80% and doubled enrolments with AI chatbot",
    excerpt:
      "LearnSphere, an online learning platform, deployed ConverseAI's conversational chatbot to qualify and nurture leads round-the-clock, doubling course enrolments in 90 days.",
    heroImage:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=600&fit=crop",
    logo: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=80&h=80&fit=crop",
    readTime: "4 min read",
    publishedDate: "February 2025",
    metrics: [
      { label: "Enrolment Growth", value: "2×", description: "Courses enrolled within 90 days of deployment" },
      { label: "Lead Response Time", value: "−80%", description: "Faster lead qualification vs. manual process" },
      { label: "Leads Qualified/Day", value: "500+", description: "Automated lead qualification without human agents" },
      { label: "Cost Per Lead", value: "−45%", description: "Reduction in cost per qualified lead" },
    ],
    challenge:
      "LearnSphere's admissions team manually responded to every website inquiry — a process that took up to 48 hours. Prospective students who didn't hear back quickly enrolled with competitors. The team needed a way to qualify leads instantly, personalise course recommendations, and follow up at scale without hiring more staff.",
    solution:
      "ConverseAI's Conversational AI Chatbot was embedded on LearnSphere's website and integrated with their CRM. The bot asked qualification questions, recommended courses based on goals, shared brochures, and booked discovery calls — all automatically, 24/7. Complex queries were escalated to admissions counsellors via live chat with full conversation context.",
    outcome:
      "In 90 days, enrolments doubled. The chatbot qualified 500+ leads daily at a 45% lower cost per lead. Admissions counsellors spent their time only on hot, sales-ready conversations, increasing their close rates significantly.",
    sections: [
      {
        title: "48-Hour Delays Were Killing Conversions",
        content:
          "In edtech, speed to lead is everything. A student exploring online courses often submits enquiries to five or more platforms simultaneously. LearnSphere's 48-hour manual response window meant they consistently lost prospects to faster-moving competitors. The problem wasn't lead volume — it was lead velocity.",
      },
      {
        title: "A Chatbot That Acts Like a Counsellor",
        content:
          "ConverseAI built a custom conversation flow that mimicked LearnSphere's admissions process. The bot asked about learning goals, current skill level, preferred schedule, and budget. It then recommended the three most relevant courses, shared testimonials, and offered to book a call with a counsellor — all within two minutes of the first message.",
      },
      {
        title: "CRM Integration for Zero Drop-offs",
        content:
          "Every qualified lead was automatically pushed to LearnSphere's CRM with full conversation history, qualification score, and recommended courses. Counsellors walked into calls already knowing exactly what the student needed, dramatically improving conversion rates.",
      },
    ],
    testimonial: {
      quote:
        "We were sceptical about a bot replacing our counsellors, but ConverseAI proved us wrong. It doesn't replace them — it makes them far more effective by only handing over the best leads. Our enrolment numbers speak for themselves.",
      author: "Aarav Mehta",
      role: "Co-founder & CEO, LearnSphere",
    },
    featuresUsed: ["Conversational AI Chatbot", "Live Chat", "Pre-Chat Forms", "Agent Reports"],
    useCase: [
      "Instant lead qualification",
      "Personalised course recommendations",
      "Discovery call booking",
      "CRM auto-sync",
    ],
  },
  {
    id: 3,
    slug: "healthcare-clinic-omnichannel-support",
    company: "CareFirst Clinics",
    industry: "Healthcare",
    category: "Omni-Channel",
    tagline: "CareFirst Clinics reduced appointment no-shows by 55% with omnichannel automation",
    excerpt:
      "CareFirst Clinics unified their patient communication across WhatsApp, web chat, and SMS using ConverseAI, slashing appointment no-shows and improving patient satisfaction scores.",
    heroImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop",
    logo: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=80&h=80&fit=crop",
    readTime: "6 min read",
    publishedDate: "January 2025",
    metrics: [
      { label: "No-Show Reduction", value: "55%", description: "Fewer appointment no-shows after automated reminders" },
      { label: "Patient Satisfaction", value: "+28pts", description: "NPS score improvement within 3 months" },
      { label: "Admin Hours Saved", value: "120hrs", description: "Per month saved on manual appointment management" },
      { label: "Appointment Fill Rate", value: "91%", description: "Calendar utilisation rate post-implementation" },
    ],
    challenge:
      "CareFirst Clinics operated 12 branches across Rajasthan. Appointment no-shows ran at 40%, costing the clinic significant revenue and disrupting doctor schedules. Patient queries came through phone, WhatsApp, and the website simultaneously, and the front desk staff couldn't keep up. There was no centralised system to track communications or follow up effectively.",
    solution:
      "ConverseAI's Omni-Channel platform brought together all patient touchpoints into a single inbox. Automated appointment reminders were sent via WhatsApp 24 hours and 2 hours before each appointment. Patients could confirm, reschedule, or cancel with a single reply. Pre-visit intake forms were collected digitally, saving doctor time during consultations.",
    outcome:
      "No-shows dropped 55% within the first month. The 120 hours per month previously spent on manual calls were reclaimed by the admin team. Patient NPS scores improved by 28 points as patients appreciated the proactive communication. Appointment slot utilisation climbed to 91%.",
    sections: [
      {
        title: "The Hidden Cost of No-Shows",
        content:
          "A 40% no-show rate meant that on any given day, nearly half the booked consultation slots went unfilled. For CareFirst, this translated to lost revenue exceeding ₹15 lakh per month across branches. The root cause wasn't patient disinterest — it was a lack of timely reminders and easy rescheduling options.",
      },
      {
        title: "One Inbox for All Channels",
        content:
          "Before ConverseAI, front-desk staff toggled between WhatsApp on personal phones, a website chat tool, and the telephone — with no shared history. ConverseAI's Omni-Channel inbox gave every agent a unified view of every patient conversation, regardless of channel, with full history and context.",
      },
      {
        title: "Smart Automated Reminders",
        content:
          "The reminder workflow was configured to send a WhatsApp message 24 hours before each appointment with a one-tap confirmation link. A follow-up reminder went out 2 hours prior. If a patient didn't confirm, an escalation flag triggered a personal call from the front desk — a significant upgrade from the previous blanket-call approach.",
      },
      {
        title: "Digital Intake Forms",
        content:
          "Pre-Chat Forms were repurposed as digital intake questionnaires sent to patients before their visit. Doctors received a structured patient summary before entering the consultation room, reducing average consultation time by 8 minutes and improving the quality of care.",
      },
    ],
    testimonial: {
      quote:
        "The omnichannel inbox alone saved our front desk hours every single day. But the real win was the drop in no-shows — we recovered revenue we didn't even know we were losing. Every clinic should be using this.",
      author: "Dr. Sunita Agarwal",
      role: "Operations Director, CareFirst Clinics",
    },
    featuresUsed: ["Omni-Channel", "WhatsApp Marketing", "Pre-Chat Forms", "Team Reports", "CSAT Report"],
    useCase: [
      "Automated appointment reminders",
      "Multi-channel patient support",
      "Digital intake forms",
      "No-show prevention",
    ],
  },
  {
    id: 4,
    slug: "hrtech-ai-interview-agent-automation",
    company: "Northfield Talent",
    industry: "HR Tech / Recruitment",
    category: "AI Voice Agent",
    tagline: "Northfield Talent cut time-to-hire by 70% with an AI agent that runs the entire first-round interview",
    excerpt:
      "Northfield Talent deployed ConverseAI's AI Voice Agent to schedule, conduct, and score first-round interviews end-to-end over WhatsApp and Google Meet, eliminating manual screening bottlenecks.",
    heroImage:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=600&fit=crop",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=80&h=80&fit=crop",
    readTime: "5 min read",
    publishedDate: "April 2025",
    metrics: [
      { label: "Time-to-Hire", value: "−70%", description: "Reduction in days from application to final interview decision" },
      { label: "Interviews Automated/Day", value: "150+", description: "First-round interviews conducted by the AI agent without human recruiters" },
      { label: "No-Show Recovery", value: "60%", description: "Candidates re-engaged and rescheduled via automated WhatsApp follow-up" },
      { label: "Recruiter Hours Saved", value: "200hrs", description: "Per month reclaimed from manual scheduling and first-round screening" },
    ],
    challenge:
      "Northfield Talent's recruiters were manually coordinating interview slots over phone and email, chasing candidates who went silent, and conducting repetitive first-round screening calls that varied in quality depending on who ran them. Scheduling alone ate up most of a recruiter's day, and no-shows meant wasted slots with no structured way to follow up. The team needed a consistent, scalable way to screen candidates against the job description before a human ever got involved.",
    solution:
      "ConverseAI's AI Voice Agent took over the entire first-round interview process. It messaged candidates on WhatsApp to schedule the interview, let them pick a slot, and auto-generated a Google Meet link. The agent itself joined the meeting at the scheduled time, carrying the job description and the candidate's resume as context, and asked tailored questions based on both. Every response was scored and pushed to Northfield's CRM in real time, along with a clear suitability recommendation against the job description. If a candidate didn't join, the agent automatically followed up to reschedule.",
    outcome:
      "Time-to-hire dropped 70% as first-round screening stopped waiting on recruiter calendars. The AI agent ran 150+ interviews a day at a consistent quality bar, and automated follow-ups recovered 60% of no-shows that would have previously been lost. Recruiters now spend their time reviewing AI-generated scorecards and resumes instead of running repetitive screening calls themselves, making the final call on who moves forward based on the agent's structured results.",
    sections: [
      {
        title: "Scheduling Was Eating the Recruiting Day",
        content:
          "Before ConverseAI, every first-round interview required a recruiter to manually message candidates, confirm a time, create a Google Meet link, and then run the call themselves. With hundreds of applicants per role, scheduling alone consumed hours daily, and the actual screening quality depended heavily on which recruiter picked up the call.",
      },
      {
        title: "An Agent That Interviews Like a Recruiter",
        content:
          "ConverseAI's AI Voice Agent sent an automated WhatsApp message to each candidate to schedule their interview. Once the candidate picked a slot, the agent generated a Google Meet link and joined the call itself at the scheduled time. With the job description and the candidate's resume loaded as context, it asked relevant, role-specific questions throughout the conversation, just like a human interviewer would.",
      },
      {
        title: "Scorecards, Not Just Transcripts, in the CRM",
        content:
          "Every interview was logged in Northfield's CRM in real time, including a review of the candidate's answers, a score, and a clear recommendation on whether the candidate was a fit for the job description. Recruiters no longer had to listen to recordings or write up notes; they reviewed structured scorecards and made the final selection decision directly from the agent's output.",
      },
      {
        title: "No-Shows Didn't Mean Lost Candidates Anymore",
        content:
          "When a candidate missed their scheduled interview, the agent automatically followed up over WhatsApp to understand why and offer a new slot, instead of the candidate simply falling out of the pipeline. This follow-up loop recovered a majority of no-shows that recruiters previously had no structured way to chase.",
      },
    ],
    testimonial: {
      quote:
        "We were nervous about letting an AI run actual interviews, but the scorecards it produces are more consistent than what our own recruiters were doing manually. It doesn't make the hiring decision for us — it just makes sure we only spend our time on candidates worth talking to.",
      author: "Ritika Dsouza",
      role: "Head of Talent Acquisition, Northfield Talent",
    },
    featuresUsed: ["AI Voice Agent", "WhatsApp AI Chatbot", "Agent Reports", "CRM Auto-Sync"],
    useCase: [
      "Automated interview scheduling",
      "AI-led first-round interviews",
      "JD-based question generation",
      "Candidate scoring & CRM sync",
    ],
    displayOrder: 4,
  },
];

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined =>
  caseStudies.find((cs) => cs.slug === slug);
