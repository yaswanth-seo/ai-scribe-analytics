import { identifyAIPlatform } from "@/services/ga4Service";
import { AI_PLATFORMS } from "@/config/ga4";
import { format, parseISO } from "date-fns";

export interface PlatformCardData {
  platform: string;
  visitors: number;
  change: number;
  trend: "up" | "down";
}

export interface ChartDataPoint {
  date: string;
  [key: string]: string | number;
}

export interface SessionData {
  platform: string;
  pagePath: string;
  timestamp: string;
  location: string;
}

// Transform GA4 data for platform cards
export const transformForPlatformCards = (ga4Data: any): PlatformCardData[] => {
  if (!ga4Data || !ga4Data.rows) return [];
  
  const platformStats: Record<string, number> = {};
  
  // Count visitors per platform
  ga4Data.rows.forEach((row: any) => {
    const medium = row.dimensionValues[0]?.value || "";
    const source = row.dimensionValues[1]?.value || "";
    const sessions = parseInt(row.metricValues[0]?.value || "0");
    
    const platform = identifyAIPlatform(medium, source);
    if (platform) {
      platformStats[platform] = (platformStats[platform] || 0) + sessions;
    }
  });
  
  // Transform to card data format with mock growth for now
  // TODO: Calculate actual growth by comparing date ranges
  return AI_PLATFORMS.map(platform => ({
    platform,
    visitors: platformStats[platform] || 0,
    change: Math.random() * 30 - 5, // Mock change percentage
    trend: (Math.random() > 0.3 ? "up" : "down") as "up" | "down",
  })).filter(item => item.visitors > 0);
};

// Transform GA4 data for traffic chart
export const transformForTrafficChart = (ga4Data: any): ChartDataPoint[] => {
  if (!ga4Data || !ga4Data.rows) return [];
  
  const dateMap: Record<string, Record<string, number>> = {};
  
  // Aggregate sessions by date and platform
  ga4Data.rows.forEach((row: any) => {
    const medium = row.dimensionValues[0]?.value || "";
    const source = row.dimensionValues[1]?.value || "";
    const dateStr = row.dimensionValues[2]?.value || "";
    const sessions = parseInt(row.metricValues[0]?.value || "0");
    
    const platform = identifyAIPlatform(medium, source);
    if (platform && dateStr) {
      if (!dateMap[dateStr]) {
        dateMap[dateStr] = {};
      }
      
      const platformKey = platform.toLowerCase().replace(/\./g, "");
      dateMap[dateStr][platformKey] = (dateMap[dateStr][platformKey] || 0) + sessions;
    }
  });
  
  // Convert to chart format
  return Object.entries(dateMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([dateStr, platforms]) => {
      const date = parseISO(dateStr);
      return {
        date: format(date, "MMM d"),
        ...platforms,
      };
    });
};

// Transform GA4 data for sessions table
export const transformForSessionsTable = (ga4Data: any): SessionData[] => {
  if (!ga4Data || !ga4Data.rows) return [];
  
  const sessions: SessionData[] = [];
  
  ga4Data.rows.forEach((row: any) => {
    const medium = row.dimensionValues[0]?.value || "";
    const source = row.dimensionValues[1]?.value || "";
    const dateStr = row.dimensionValues[2]?.value || "";
    const pagePath = row.dimensionValues[3]?.value || "/";
    const country = row.dimensionValues[4]?.value || "Unknown";
    
    const platform = identifyAIPlatform(medium, source);
    if (platform) {
      try {
        const date = parseISO(dateStr);
        sessions.push({
          platform,
          pagePath,
          timestamp: format(date, "d MMM, haaa"),
          location: country,
        });
      } catch (e) {
        console.error("Failed to parse date:", dateStr);
      }
    }
  });
  
  // Sort by most recent first
  return sessions.reverse();
};
