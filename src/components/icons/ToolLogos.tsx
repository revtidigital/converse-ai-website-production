import React from "react";

export interface ToolLogoProps {
  className?: string;
  name?: string;
}

export const SalesforceLogo = ({ className = "w-5 h-5 shrink-0" }: ToolLogoProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M10.2 4.2a6 6 0 0 1 5.4 3.3 5.4 5.4 0 0 1 4.4 5.3 5.4 5.4 0 0 1-5.4 5.4H6.6A4.8 4.8 0 0 1 1.8 13.5a4.8 4.8 0 0 1 4-4.7 6 6 0 0 1 4.4-4.6Z"
      fill="#00A1E0"
    />
    <path
      d="M8.8 9.5c.3-.4.8-.6 1.4-.6.8 0 1.4.4 1.7 1 .3-.6.9-1 1.7-1 .9 0 1.6.7 1.6 1.7 0 1.2-1.3 2.2-2.5 3.1l-.8.6-.8-.6c-1.2-.9-2.5-1.9-2.5-3.1 0-1 .7-1.7 1.2-1.7Z"
      fill="#FFFFFF"
    />
  </svg>
);

export const HubSpotLogo = ({ className = "w-5 h-5 shrink-0" }: ToolLogoProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="17.5" cy="7.5" r="2.5" fill="#FF7A59" />
    <path
      d="M17.5 10v4.2a4.5 4.5 0 0 1-2.5 4l-4.5 2.2a2 2 0 1 1-1-2l3.8-1.9a2.5 2.5 0 0 0 1.2-2.2V10"
      stroke="#FF7A59"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="7.5" cy="11.5" r="3.5" fill="#FF7A59" />
    <circle cx="7.5" cy="11.5" r="1.5" fill="#FFFFFF" />
  </svg>
);

export const ZohoLogo = ({ className = "w-5 h-5 shrink-0" }: ToolLogoProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="9" height="9" rx="2" fill="#E42528" />
    <rect x="13" y="2" width="9" height="9" rx="2" fill="#2266AA" />
    <rect x="2" y="13" width="9" height="9" rx="2" fill="#009944" />
    <rect x="13" y="13" width="9" height="9" rx="2" fill="#F4B000" />
    <circle cx="6.5" cy="6.5" r="1.5" fill="#FFFFFF" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="#FFFFFF" />
    <circle cx="6.5" cy="17.5" r="1.5" fill="#FFFFFF" />
    <circle cx="17.5" cy="17.5" r="1.5" fill="#FFFFFF" />
  </svg>
);

export const LeadSquaredLogo = ({ className = "w-5 h-5 shrink-0" }: ToolLogoProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2.5" y="2.5" width="19" height="19" rx="4" fill="#0084FF" />
    <path
      d="M7 6v12h10M11 9l4 4-4 4"
      stroke="#FFFFFF"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PipedriveLogo = ({ className = "w-5 h-5 shrink-0" }: ToolLogoProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="#222222" />
    <circle cx="12" cy="9.5" r="4.5" fill="#00B368" />
    <rect x="7.5" y="9.5" width="3" height="9" rx="1.5" fill="#00B368" />
  </svg>
);

export const FreshworksLogo = ({ className = "w-5 h-5 shrink-0" }: ToolLogoProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" fill="#0052CC" />
    <circle cx="9" cy="9" r="3" fill="#FF7F00" />
    <path
      d="M7 16c0-2.8 2.2-5 5-5s5 2.2 5 5"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const SAPLogo = ({ className = "w-5 h-5 shrink-0" }: ToolLogoProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M2 5h20l-3 14H5L2 5Z" fill="#008FD3" />
    <text
      x="12"
      y="15.5"
      textAnchor="middle"
      fill="#FFFFFF"
      fontSize="8.5"
      fontWeight="900"
      fontFamily="sans-serif"
      letterSpacing="-0.5"
    >
      SAP
    </text>
  </svg>
);

export const OracleLogo = ({ className = "w-5 h-5 shrink-0" }: ToolLogoProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2" y="6" width="20" height="12" rx="6" stroke="#F80000" strokeWidth="3" />
    <circle cx="12" cy="12" r="2.5" fill="#F80000" />
  </svg>
);

export const NetSuiteLogo = ({ className = "w-5 h-5 shrink-0" }: ToolLogoProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="9" height="9" rx="1.5" fill="#0A2540" />
    <rect x="12" y="12" width="9" height="9" rx="1.5" fill="#0A2540" />
    <rect x="12" y="3" width="9" height="9" rx="1.5" fill="#2280BF" />
    <rect x="3" y="12" width="9" height="9" rx="1.5" fill="#2280BF" />
  </svg>
);

export const DynamicsLogo = ({ className = "w-5 h-5 shrink-0" }: ToolLogoProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 4h7v7H4V4Z" fill="#002050" />
    <path d="M13 4h7v7h-7V4Z" fill="#0078D4" />
    <path d="M4 13h7v7H4v-7Z" fill="#2899F5" />
    <path d="M13 13h7v7h-7v-7Z" fill="#002050" />
  </svg>
);

export const TallyLogo = ({ className = "w-5 h-5 shrink-0" }: ToolLogoProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2.5" y="2.5" width="19" height="19" rx="4" fill="#D32F2F" />
    <path d="M6 7h12M12 7v10M8 17h8" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const QuickBooksLogo = ({ className = "w-5 h-5 shrink-0" }: ToolLogoProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="#2CA01C" />
    <path
      d="M7.5 12a3.5 3.5 0 0 1 3.5-3.5h1v7h-1A3.5 3.5 0 0 1 7.5 12Zm9 0a3.5 3.5 0 0 1-3.5 3.5h-1v-7h1a3.5 3.5 0 0 1 3.5 3.5Z"
      fill="#FFFFFF"
    />
  </svg>
);

export const SnowflakeLogo = ({ className = "w-5 h-5 shrink-0" }: ToolLogoProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="#F0F9FF" />
    <path
      d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9"
      stroke="#29B5E8"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M10 5l2 2 2-2M10 19l2-2 2 2M5 10l2 2-2 2M19 10l-2 2 2 2"
      stroke="#29B5E8"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

export const BigQueryLogo = ({ className = "w-5 h-5 shrink-0" }: ToolLogoProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#4285F4" />
    <ellipse cx="12" cy="8" rx="6" ry="2.5" fill="#FFFFFF" />
    <path
      d="M6 8v3.5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V8M6 12v3.5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V12"
      stroke="#FFFFFF"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="16" cy="16" r="3.5" fill="#34A853" stroke="#FFFFFF" strokeWidth="1.2" />
    <path d="M18.5 18.5l2.5 2.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const PostgreSQLLogo = ({ className = "w-5 h-5 shrink-0" }: ToolLogoProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="#336791" />
    <path
      d="M7 11c0-2.5 2-4.5 4.5-4.5 2 0 4 .8 5 2.5 1.2 2 .5 5-1 6.5l-2.5 1.5M9 13.5c1 .5 2 .5 3 0M8 16c1.5 1 3.5 1 5-.5"
      stroke="#FFFFFF"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="10" cy="10" r="1" fill="#FFFFFF" />
  </svg>
);

export const DatabricksLogo = ({ className = "w-5 h-5 shrink-0" }: ToolLogoProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2l9 5.2-9 5.2-9-5.2L12 2Z" fill="#FF3621" />
    <path d="M3 10.4l9 5.2 9-5.2v3.2l-9 5.2-9-5.2v-3.2Z" fill="#FF3621" />
    <path d="M3 15.6l9 5.2 9-5.2v3.2l-9 5.2-9-5.2v-3.2Z" fill="#E02410" />
  </svg>
);

export const SlackLogo = ({ className = "w-5 h-5 shrink-0" }: ToolLogoProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" fill="#4A154B" />
    <path d="M7 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0 2h4v-4H7v4Z" fill="#36C5F0" />
    <path d="M14 7a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm-2 0v4h4V7h-4Z" fill="#2EB67D" />
    <path d="M17 14a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm0-2h-4v4h4v-4Z" fill="#ECB22E" />
    <path d="M10 17a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm2 0v-4H8v4h4Z" fill="#E01E5A" />
  </svg>
);

export const TeamsLogo = ({ className = "w-5 h-5 shrink-0" }: ToolLogoProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#6264A7" />
    <circle cx="16" cy="8" r="2.5" fill="#8B8CC7" />
    <rect x="13.5" y="11.5" width="5" height="6.5" rx="2" fill="#8B8CC7" />
    <rect x="5" y="7" width="9" height="10" rx="2" fill="#464775" />
    <path d="M7.5 10h4M9.5 10v4.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const GoogleWorkspaceLogo = ({ className = "w-5 h-5 shrink-0" }: ToolLogoProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" fill="#FFFFFF" stroke="#E5E7EB" />
    <path d="M6 7l6-3 6 3v10l-6 3-6-3V7Z" stroke="#4285F4" strokeWidth="1.5" fill="none" />
    <path d="M6 7l6 4 6-4" stroke="#EA4335" strokeWidth="1.5" />
    <path d="M12 11v9" stroke="#34A853" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="2" fill="#FBBC05" />
  </svg>
);

export const Microsoft365Logo = ({ className = "w-5 h-5 shrink-0" }: ToolLogoProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="8" height="8" rx="1" fill="#F25022" />
    <rect x="13" y="3" width="8" height="8" rx="1" fill="#7FBA00" />
    <rect x="3" y="13" width="8" height="8" rx="1" fill="#00A4EF" />
    <rect x="13" y="13" width="8" height="8" rx="1" fill="#FFB900" />
  </svg>
);

export const ZendeskLogo = ({ className = "w-5 h-5 shrink-0" }: ToolLogoProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#03363D" />
    <path d="M6 6h6L6 14h6M18 18h-6l6-8h-6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IntercomLogo = ({ className = "w-5 h-5 shrink-0" }: ToolLogoProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" fill="#1F8CEB" />
    <path d="M7 9v6M10 7v9M13 7v9M17 9v6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const GenericToolLogo = ({ className = "w-5 h-5 shrink-0" }: ToolLogoProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" fill="#7C3AED" />
    <circle cx="12" cy="12" r="4" fill="#FFFFFF" />
  </svg>
);

export const ToolLogo = ({ name, className = "w-5 h-5 shrink-0" }: { name: string; className?: string }) => {
  const normalized = name.toLowerCase().trim();

  // CRMs
  if (normalized.includes("salesforce")) return <SalesforceLogo className={className} />;
  if (normalized.includes("hubspot")) return <HubSpotLogo className={className} />;
  if (normalized.includes("zoho")) return <ZohoLogo className={className} />;
  if (normalized.includes("leadsquared")) return <LeadSquaredLogo className={className} />;
  if (normalized.includes("pipedrive")) return <PipedriveLogo className={className} />;
  if (normalized.includes("freshsales") || normalized.includes("freshdesk")) return <FreshworksLogo className={className} />;

  // ERPs & Finance
  if (normalized.includes("sap")) return <SAPLogo className={className} />;
  if (normalized.includes("oracle")) return <OracleLogo className={className} />;
  if (normalized.includes("netsuite")) return <NetSuiteLogo className={className} />;
  if (normalized.includes("dynamics") || normalized.includes("microsoft dynamics")) return <DynamicsLogo className={className} />;
  if (normalized.includes("tally")) return <TallyLogo className={className} />;
  if (normalized.includes("quickbooks")) return <QuickBooksLogo className={className} />;

  // Data Warehouses & Databases
  if (normalized.includes("snowflake")) return <SnowflakeLogo className={className} />;
  if (normalized.includes("bigquery")) return <BigQueryLogo className={className} />;
  if (normalized.includes("postgres") || normalized.includes("postgresql")) return <PostgreSQLLogo className={className} />;
  if (normalized.includes("databricks")) return <DatabricksLogo className={className} />;

  // Communication & Productivity
  if (normalized.includes("slack")) return <SlackLogo className={className} />;
  if (normalized.includes("teams")) return <TeamsLogo className={className} />;
  if (normalized.includes("google workspace")) return <GoogleWorkspaceLogo className={className} />;
  if (normalized.includes("microsoft 365") || normalized.includes("office 365")) return <Microsoft365Logo className={className} />;

  // Helpdesk
  if (normalized.includes("zendesk")) return <ZendeskLogo className={className} />;
  if (normalized.includes("intercom")) return <IntercomLogo className={className} />;

  return <GenericToolLogo className={className} />;
};

export default ToolLogo;
