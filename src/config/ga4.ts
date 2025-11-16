export const GA4_CONFIG = {
  CLIENT_ID: "481580861178-6l45lh9e6tnvbbubki302o71pmetnuhe.apps.googleusercontent.com",
  CLIENT_SECRET: "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",
  REDIRECT_URI: "http://localhost:8080/",
  SCOPES: ["https://www.googleapis.com/auth/analytics.readonly"],
  AUTH_URL: "https://accounts.google.com/o/oauth2/v2/auth",
  TOKEN_URL: "https://oauth2.googleapis.com/token",
};

// Regex patterns to identify AI platforms from GA4 medium/source
export const AI_PLATFORM_PATTERNS: Record<string, RegExp[]> = {
  ChatGPT: [/chatgpt/i, /chat\.openai\.com/i, /openai\.com/i],
  Gemini: [/gemini/i, /bard\.google\.com/i, /gemini\.google\.com/i],
  Claude: [/claude/i, /claude\.ai/i, /anthropic\.com/i],
  Copilot: [/copilot/i, /github\.com\/copilot/i, /bing\.com\/chat/i],
  Perplexity: [/perplexity/i, /perplexity\.ai/i],
  "You.com": [/you\.com/i, /you\.ai/i],
};

export const AI_PLATFORMS = Object.keys(AI_PLATFORM_PATTERNS);
