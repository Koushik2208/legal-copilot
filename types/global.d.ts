// Utility: For updating or removing query parameters in the URL
interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

// Generic Response Types
type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
type ErrorResponse = ActionResponse<undefined> & { success: false };

type APIErrorResponse = import("next/server").NextResponse<ErrorResponse>;
type APIResponse<T = null> = import("next/server").NextResponse<
  SuccessResponse<T> | ErrorResponse
>;

// LegalCopilot Domain Models

interface CaseSummary {
  title: string;
  court: string;
  date: string;
  citation?: string;
  summary: string;
  url?: string;
}

interface LegalQuery {
  query: string;
  jurisdiction?: string;
  context?: string;
}

interface GeneratedDraft {
  draftType: "notice" | "agreement" | "petition" | "custom";
  content: string;
  generatedAt: string;
  basedOn?: string; // e.g., case reference or user prompt
}

interface PerplexitySearchResult {
  title: string;
  snippet: string;
  url: string;
  source: string;
}

interface UserFeedback {
  query: string;
  response: string;
  rating: number; // 1 to 5
  comment?: string;
}
