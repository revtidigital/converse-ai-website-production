import { getCaptchaToken } from "./recaptcha";

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyuCXLpkK2e8kC37As23AnW4aw-s0cs0irjmtEXHP9mN5QPMDjqNmnWbgYBcZWMKT4x/exec';

const ZOHO_ACTION_URL = 'https://crm.zoho.in/crm/WebToLeadForm';
const ZOHO_XNQSJSDP = '1c33e6d3fbff97e90413e4a3614014bdb5b3d16d75adcc2d7e205170aeabe170';
const ZOHO_XMIWTLD = 'c16e5252465e45feb11c2b1beddf667bc1c44015c408a9c1ebf73abfa0ecd72a1d322d2cb5ddb72208ff2076a36af73e';

interface ContactPayload {
  fullName: string;
  email: string;
  phone: string;
  countryName?: string;
  product: string;
  subject: string;
  message: string;
  form_source: string;
  /** Optional extra fields appended to the payload (e.g. PDF attachment for the audit report). */
  extraFields?: Record<string, string>;
}

const getDefaultSubject = (payload: ContactPayload) => {
  const submittedSubject = payload.subject?.trim();
  if (submittedSubject) return submittedSubject;
  if (payload.form_source?.trim()) return payload.form_source.trim();
  return "Website Enquiry";
};

/**
 * Submits lead data asynchronously to Zoho CRM using Web-to-Lead endpoint.
 * Protected by try-catch so failure can never disrupt Google Apps Script or UX.
 */
async function submitToZohoCRM(payload: ContactPayload, utm: Record<string, string>, subject: string): Promise<void> {
  try {
    const rawName = (payload.fullName || '').trim();
    let firstName = '';
    let lastName = '';

    if (rawName) {
      const parts = rawName.split(/\s+/);
      if (parts.length > 1) {
        firstName = parts.slice(0, -1).join(' ');
        lastName = parts[parts.length - 1];
      } else {
        lastName = parts[0];
      }
    }

    if (!lastName) {
      lastName = 'Website Lead';
    }

    // Company is required by Zoho WebToLead form
    const company = payload.extraFields?.companyName || payload.extraFields?.company || payload.product || 'Website Inquiry';

    // Construct detailed Description for Zoho CRM
    const descriptionLines: string[] = [
      `Form Source: ${payload.form_source || 'Website'}`,
      `Subject: ${subject}`,
      `Page URL: ${window.location.href}`,
      `Product/Add-on: ${payload.product || 'N/A'}`,
      `Country: ${payload.countryName || 'N/A'}`,
      `UTM Source: ${utm.utm_source} | Medium: ${utm.utm_medium} | Campaign: ${utm.utm_campaign}`,
      `UTM Term: ${utm.utm_term} | Content: ${utm.utm_content} | ID: ${utm.utm_id}`,
    ];

    if (payload.message && payload.message !== 'N/A') {
      descriptionLines.push(`Message: ${payload.message}`);
    }

    if (payload.extraFields) {
      const extraFiltered = Object.entries(payload.extraFields).filter(
        ([k]) => !['companyName', 'company', 'partial_lead', 'send_user_email'].includes(k)
      );
      if (extraFiltered.length > 0) {
        descriptionLines.push('--- Additional Details ---');
        extraFiltered.forEach(([k, v]) => {
          descriptionLines.push(`${k}: ${v}`);
        });
      }
    }

    const zohoParams = new URLSearchParams();
    zohoParams.append('xnQsjsdp', ZOHO_XNQSJSDP);
    zohoParams.append('xmIwtLD', ZOHO_XMIWTLD);
    zohoParams.append('actionType', 'TGVhZHM=');
    zohoParams.append('returnURL', 'https://theconverseai.com/');

    zohoParams.append('First Name', firstName);
    zohoParams.append('Last Name', lastName);
    zohoParams.append('Company', company);
    zohoParams.append('Email', payload.email || '');
    zohoParams.append('Phone', payload.phone || '');
    zohoParams.append('Lead Source', payload.form_source || 'Website');
    zohoParams.append('URL', window.location.href);
    zohoParams.append('Description', descriptionLines.join('\n'));

    await fetch(ZOHO_ACTION_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: zohoParams.toString(),
    });
  } catch (err) {
    console.warn('Zoho CRM Lead Submission Warning:', err);
  }
}

export const submitContactForm = async (payload: ContactPayload): Promise<void> => {
  const token = await getCaptchaToken("contact_form") ?? "";

  const utm = {
    utm_source: localStorage.getItem("utm_source") || "Direct",
    utm_medium: localStorage.getItem("utm_medium") || "N/A",
    utm_campaign: localStorage.getItem("utm_campaign") || "N/A",
    utm_term: localStorage.getItem("utm_term") || "N/A",
    utm_content: localStorage.getItem("utm_content") || "N/A",
    utm_id: localStorage.getItem("utm_id") || "N/A",
  };

  const subject = getDefaultSubject(payload);

  const finalPayload: Record<string, string> = {
    fullName: payload.fullName || "",
    email: payload.email || "",
    phone: payload.phone || "",
    countryName: payload.countryName || "N/A",
    product: payload.product || "N/A",
    subject,
    message: payload.message || "N/A",
    form_source: payload.form_source || "Website",
    captcha_token: token,
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
    utm_term: utm.utm_term,
    utm_content: utm.utm_content,
    utm_id: utm.utm_id,
    page_url: window.location.href,
    device_info: navigator.userAgent.substring(0, 200),
  };

  if (payload.extraFields) {
    Object.entries(payload.extraFields).forEach(([key, value]) => {
      finalPayload[key] = value ?? "";
    });
  }

  const params = new URLSearchParams();
  Object.entries(finalPayload).forEach(([key, value]) => {
    params.append(key, value);
  });

  // Execute Google Apps Script and Zoho CRM lead submission concurrently
  await Promise.allSettled([
    fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    }),
    submitToZohoCRM(payload, utm, subject),
  ]);
};

