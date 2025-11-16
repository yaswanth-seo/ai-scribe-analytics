import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";
import {
  generateOAuthUrl,
  extractCodeFromUrl,
  fetchAccessToken,
  listGA4Properties,
  fetchGA4Data,
  refreshAccessToken,
  GA4Property,
} from "@/services/ga4Service";

interface GA4ContextType {
  isConnected: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  properties: GA4Property[];
  selectedPropertyId: string | null;
  ga4Data: any | null;
  isLoading: boolean;
  error: string | null;
  showOAuthDialog: boolean;
  authUrl: string;
  
  // Actions
  connectGA4: () => void;
  handleOAuthCallback: (redirectUrl: string) => Promise<void>;
  closeOAuthDialog: () => void;
  selectProperty: (propertyId: string) => void;
  fetchData: (dateRange: string) => Promise<void>;
  disconnect: () => void;
}

const GA4Context = createContext<GA4ContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ACCESS_TOKEN: "ga4_access_token",
  REFRESH_TOKEN: "ga4_refresh_token",
  TOKEN_EXPIRY: "ga4_token_expiry",
  SELECTED_PROPERTY: "ga4_selected_property",
};

export const GA4Provider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
  );
  const [refreshTokenState, setRefreshTokenState] = useState<string | null>(
    localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
  );
  const [properties, setProperties] = useState<GA4Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    localStorage.getItem(STORAGE_KEYS.SELECTED_PROPERTY)
  );
  const [ga4Data, setGa4Data] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showOAuthDialog, setShowOAuthDialog] = useState(false);
  const [authUrl, setAuthUrl] = useState("");

  const isConnected = !!accessToken;

  // Check if token is expired
  const isTokenExpired = (): boolean => {
    const expiry = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRY);
    if (!expiry) return true;
    return Date.now() >= parseInt(expiry);
  };

  // Store tokens in localStorage
  const storeTokens = (access: string, refresh?: string, expiresIn?: number) => {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access);
    setAccessToken(access);
    
    if (refresh) {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh);
      setRefreshTokenState(refresh);
    }
    
    if (expiresIn) {
      const expiry = Date.now() + expiresIn * 1000;
      localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRY, expiry.toString());
    }
  };

  // Refresh token if expired
  const ensureValidToken = async (): Promise<string> => {
    if (!accessToken) throw new Error("Not authenticated");
    
    if (isTokenExpired() && refreshTokenState) {
      try {
        const tokenResponse = await refreshAccessToken(refreshTokenState);
        storeTokens(tokenResponse.access_token, undefined, tokenResponse.expires_in);
        return tokenResponse.access_token;
      } catch (err) {
        disconnect();
        throw new Error("Session expired. Please reconnect.");
      }
    }
    
    return accessToken;
  };

  // Connect to GA4 - Opens dialog with OAuth URL
  const connectGA4 = () => {
    setError(null);
    const url = generateOAuthUrl();
    setAuthUrl(url);
    setShowOAuthDialog(true);
  };

  // Handle pasted redirect URL
  const handleOAuthCallback = async (redirectUrl: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Extract code from pasted URL
      const code = extractCodeFromUrl(redirectUrl);
      
      // Exchange for tokens
      const tokenResponse = await fetchAccessToken(code);
      
      storeTokens(
        tokenResponse.access_token,
        tokenResponse.refresh_token,
        tokenResponse.expires_in
      );
      
      // Fetch properties
      const props = await listGA4Properties(tokenResponse.access_token);
      setProperties(props);
      
      setShowOAuthDialog(false);
      toast.success("Successfully connected to Google Analytics!");
    } catch (err: any) {
      const errorMsg = err.message || "Failed to connect to Google Analytics";
      setError(errorMsg);
      toast.error(errorMsg);
      console.error("GA4 connection error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Close OAuth dialog
  const closeOAuthDialog = () => {
    setShowOAuthDialog(false);
    setIsLoading(false);
  };

  // Select property
  const selectProperty = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    localStorage.setItem(STORAGE_KEYS.SELECTED_PROPERTY, propertyId);
  };

  // Fetch GA4 data
  const fetchData = async (dateRange: string) => {
    if (!selectedPropertyId) {
      toast.error("Please select a GA4 property first");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const validToken = await ensureValidToken();
      const data = await fetchGA4Data(validToken, selectedPropertyId, dateRange);
      setGa4Data(data);
    } catch (err: any) {
      const errorMsg = err.message || "Failed to fetch GA4 data";
      setError(errorMsg);
      toast.error(errorMsg);
      console.error("GA4 data fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Disconnect
  const disconnect = () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRY);
    localStorage.removeItem(STORAGE_KEYS.SELECTED_PROPERTY);
    
    setAccessToken(null);
    setRefreshTokenState(null);
    setProperties([]);
    setSelectedPropertyId(null);
    setGa4Data(null);
    setError(null);
    
    toast.success("Disconnected from Google Analytics");
  };

  // Load properties on mount if connected
  useEffect(() => {
    const loadProperties = async () => {
      if (accessToken && properties.length === 0) {
        try {
          const validToken = await ensureValidToken();
          const props = await listGA4Properties(validToken);
          setProperties(props);
        } catch (err) {
          console.error("Failed to load properties:", err);
        }
      }
    };
    
    loadProperties();
  }, [accessToken]);

  return (
    <GA4Context.Provider
      value={{
        isConnected,
        accessToken,
        refreshToken: refreshTokenState,
        properties,
        selectedPropertyId,
        ga4Data,
        isLoading,
        error,
        showOAuthDialog,
        authUrl,
        connectGA4,
        handleOAuthCallback,
        closeOAuthDialog,
        selectProperty,
        fetchData,
        disconnect,
      }}
    >
      {children}
    </GA4Context.Provider>
  );
};

export const useGA4 = () => {
  const context = useContext(GA4Context);
  if (context === undefined) {
    throw new Error("useGA4 must be used within a GA4Provider");
  }
  return context;
};
