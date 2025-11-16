import { GA4_CONFIG, AI_PLATFORM_PATTERNS } from "@/config/ga4";

export interface GA4Property {
  id: string;
  name: string;
  account: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}

// Generate OAuth URL for manual authentication
export const generateOAuthUrl = (): string => {
  const params = new URLSearchParams({
    client_id: GA4_CONFIG.CLIENT_ID,
    redirect_uri: GA4_CONFIG.REDIRECT_URI,
    response_type: "code",
    scope: GA4_CONFIG.SCOPES.join(" "),
    access_type: "offline",
    prompt: "consent",
  });
  
  return `${GA4_CONFIG.AUTH_URL}?${params}`;
};

// Extract authorization code from pasted redirect URL
export const extractCodeFromUrl = (redirectUrl: string): string => {
  try {
    const url = new URL(redirectUrl);
    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");
    
    if (error) {
      throw new Error(`OAuth error: ${error}`);
    }
    
    if (!code) {
      throw new Error("No authorization code found in URL");
    }
    
    return code;
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("OAuth error")) {
      throw err;
    }
    throw new Error("Invalid redirect URL. Please paste the complete URL from your browser.");
  }
};

// Exchange code for tokens
export const fetchAccessToken = async (code: string): Promise<TokenResponse> => {
  const response = await fetch(GA4_CONFIG.TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: GA4_CONFIG.CLIENT_ID,
      client_secret: GA4_CONFIG.CLIENT_SECRET,
      redirect_uri: GA4_CONFIG.REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error_description || "Failed to fetch access token");
  }
  
  return response.json();
};

// Refresh access token
export const refreshAccessToken = async (refreshToken: string): Promise<TokenResponse> => {
  const response = await fetch(GA4_CONFIG.TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: GA4_CONFIG.CLIENT_ID,
      client_secret: GA4_CONFIG.CLIENT_SECRET,
      grant_type: "refresh_token",
    }),
  });
  
  if (!response.ok) {
    throw new Error("Failed to refresh access token");
  }
  
  return response.json();
};

// List GA4 properties
export const listGA4Properties = async (accessToken: string): Promise<GA4Property[]> => {
  const response = await fetch(
    "https://analyticsadmin.googleapis.com/v1beta/accountSummaries",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch GA4 properties");
  }
  
  const data = await response.json();
  
  // Parse and return properties
  const properties: GA4Property[] = [];
  for (const account of data.accountSummaries || []) {
    for (const propertySummary of account.propertySummaries || []) {
      properties.push({
        id: propertySummary.property.split("/")[1],
        name: propertySummary.displayName,
        account: account.displayName,
      });
    }
  }
  return properties;
};

// Fetch GA4 data
export const fetchGA4Data = async (
  accessToken: string,
  propertyId: string,
  dateRange: string
) => {
  const days = dateRange === "7d" ? 7 : dateRange === "30d" ? 30 : 90;
  
  const response = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dateRanges: [
          { startDate: `${days}daysAgo`, endDate: "yesterday" },
        ],
        dimensions: [
          { name: "sessionMedium" },
          { name: "sessionSource" },
          { name: "date" },
          { name: "pagePath" },
          { name: "country" },
        ],
        metrics: [
          { name: "sessions" },
          { name: "totalUsers" },
        ],
      }),
    }
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch GA4 data");
  }
  
  return response.json();
};

// Identify AI platform from medium/source
export const identifyAIPlatform = (
  medium: string,
  source: string
): string | null => {
  const combined = `${medium} ${source}`.toLowerCase();
  
  for (const [platform, patterns] of Object.entries(AI_PLATFORM_PATTERNS)) {
    if (patterns.some((regex) => regex.test(combined))) {
      return platform;
    }
  }
  return null;
};
