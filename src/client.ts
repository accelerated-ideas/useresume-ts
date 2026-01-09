import { ApiPlatformResponseStructure } from "./schemas/common";
import {
  ApiCreateResume,
  schemaApiCreateResume,
} from "./schemas/create-resume";
import {
  ApiCreateTailoredResume,
  schemaApiCreateTailoredResume,
} from "./schemas/create-tailored-resume";
import {
  ApiParseResume,
  ApiParseResumeResponseStructure,
  ApiParseResumeJsonResponse,
  ApiParseResumeMarkdownResponse,
  schemaApiParseResume,
} from "./schemas/parse-resume";
import {
  ApiCreateCoverLetter,
  schemaApiCreateCoverLetter,
} from "./schemas/create-cover-letter";
import {
  ApiCreateTailoredCoverLetter,
  schemaApiCreateTailoredCoverLetter,
} from "./schemas/create-tailored-cover-letter";
import {
  ApiParseCoverLetter,
  ApiParseCoverLetterResponseStructure,
  ApiParseCoverLetterJsonResponse,
  ApiParseCoverLetterMarkdownResponse,
  schemaApiParseCoverLetter,
} from "./schemas/parse-cover-letter";
import {
  ApiGetRunStatusResponseStructure,
  ApiRunStatus,
  schemaApiRunStatus,
} from "./schemas/get-run";

// Re-export types for consumer convenience
export type {
  // Common
  ApiPlatformResponseStructure,
  // Resume
  ApiCreateResume,
  ApiCreateTailoredResume,
  ApiParseResume,
  ApiParseResumeResponseStructure,
  ApiParseResumeJsonResponse,
  ApiParseResumeMarkdownResponse,
  // Cover Letter
  ApiCreateCoverLetter,
  ApiCreateTailoredCoverLetter,
  ApiParseCoverLetter,
  ApiParseCoverLetterResponseStructure,
  ApiParseCoverLetterJsonResponse,
  ApiParseCoverLetterMarkdownResponse,
  // Run
  ApiRunStatus,
  ApiGetRunStatusResponseStructure,
};

// Define a custom error class for better debugging
export class UseResumeError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "useResumeError";
  }
}

export class useResume {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, options?: { baseUrl?: string }) {
    if (!apiKey) {
      throw new Error("useResumeClient: API key is required");
    }
    this.apiKey = apiKey;
    // Default to the production API, but allow overriding (useful for testing)
    this.baseUrl = options?.baseUrl || "https://useresume.ai/api/v3";
  }

  /**
   * Internal helper to handle the fetch logic, headers, and errors
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const headers = {
      Authorization: `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      // Try to parse the error message from the API, fallback to status text
      let errorMessage = response.statusText;
      try {
        const errorBody = await response.json();
        errorMessage = errorBody.message || errorBody.error || errorMessage;
      } catch {
        // If JSON parsing fails, just use the status text
      }

      throw new UseResumeError(
        response.status,
        `useResume API Error: ${errorMessage}`
      );
    }

    return response.json() as Promise<T>;
  }

  /**
   * Create a new resume.
   * Validates the payload locally using Zod before sending to the API.
   * * @param params - The content and style configuration for the resume
   * @returns The generated resume ID and URL
   */
  public async createResume(
    params: ApiCreateResume
  ): Promise<ApiPlatformResponseStructure> {
    // 1. RUNTIME VALIDATION
    // This runs locally on the user's machine. If they forget a field,
    // they get an instant error without waiting for an HTTP request.
    const validation = schemaApiCreateResume.safeParse(params);

    if (!validation.success) {
      const fieldErrors = validation.error.errors
        .map((e) => `[${e.path.join(".")}] ${e.message}`)
        .join(", ");
      throw new Error(`Validation Failed: ${fieldErrors}`);
    }

    // 2. API REQUEST
    // We send the validated data (validation.data) to strip out any unknown fields
    return this.request<ApiPlatformResponseStructure>("/resume/create", {
      method: "POST",
      body: JSON.stringify(validation.data),
    });
  }

  /**
   * Create a tailored resume optimized for a specific job.
   * Validates the payload locally using Zod before sending to the API.
   * @param params - The resume content, target job details, and optional tailoring instructions
   * @returns The generated tailored resume ID and URL
   */
  public async createTailoredResume(
    params: ApiCreateTailoredResume
  ): Promise<ApiPlatformResponseStructure> {
    const validation = schemaApiCreateTailoredResume.safeParse(params);

    if (!validation.success) {
      const fieldErrors = validation.error.errors
        .map((e) => `[${e.path.join(".")}] ${e.message}`)
        .join(", ");
      throw new Error(`Validation Failed: ${fieldErrors}`);
    }

    return this.request<ApiPlatformResponseStructure>(
      "/resume/create-tailored",
      {
        method: "POST",
        body: JSON.stringify(validation.data),
      }
    );
  }

  /**
   * Parse an existing resume file into structured data.
   * Validates the payload locally using Zod before sending to the API.
   * @param params - The file URL or base64 file content, and output format
   * @returns The parsed resume data in the specified format
   */
  public async parseResume(
    params: ApiParseResume & { parse_to: "json" }
  ): Promise<ApiParseResumeJsonResponse>;
  public async parseResume(
    params: ApiParseResume & { parse_to: "markdown" }
  ): Promise<ApiParseResumeMarkdownResponse>;
  public async parseResume(
    params: ApiParseResume
  ): Promise<ApiParseResumeResponseStructure>;
  public async parseResume(
    params: ApiParseResume
  ): Promise<ApiParseResumeResponseStructure> {
    const validation = schemaApiParseResume.safeParse(params);

    if (!validation.success) {
      const fieldErrors = validation.error.errors
        .map((e) => `[${e.path.join(".")}] ${e.message}`)
        .join(", ");
      throw new Error(`Validation Failed: ${fieldErrors}`);
    }

    return this.request<ApiParseResumeResponseStructure>("/resume/parse", {
      method: "POST",
      body: JSON.stringify(validation.data),
    });
  }

  /**
   * Create a new cover letter.
   * Validates the payload locally using Zod before sending to the API.
   * @param params - The content and style configuration for the cover letter
   * @returns The generated cover letter ID and URL
   */
  public async createCoverLetter(
    params: ApiCreateCoverLetter
  ): Promise<ApiPlatformResponseStructure> {
    const validation = schemaApiCreateCoverLetter.safeParse(params);

    if (!validation.success) {
      const fieldErrors = validation.error.errors
        .map((e) => `[${e.path.join(".")}] ${e.message}`)
        .join(", ");
      throw new Error(`Validation Failed: ${fieldErrors}`);
    }

    return this.request<ApiPlatformResponseStructure>("/cover-letter/create", {
      method: "POST",
      body: JSON.stringify(validation.data),
    });
  }

  /**
   * Create a tailored cover letter optimized for a specific job.
   * Validates the payload locally using Zod before sending to the API.
   * @param params - The cover letter content, target job details, and optional tailoring instructions
   * @returns The generated tailored cover letter ID and URL
   */
  public async createTailoredCoverLetter(
    params: ApiCreateTailoredCoverLetter
  ): Promise<ApiPlatformResponseStructure> {
    const validation = schemaApiCreateTailoredCoverLetter.safeParse(params);

    if (!validation.success) {
      const fieldErrors = validation.error.errors
        .map((e) => `[${e.path.join(".")}] ${e.message}`)
        .join(", ");
      throw new Error(`Validation Failed: ${fieldErrors}`);
    }

    return this.request<ApiPlatformResponseStructure>(
      "/cover-letter/create-tailored",
      {
        method: "POST",
        body: JSON.stringify(validation.data),
      }
    );
  }

  /**
   * Parse an existing cover letter file into structured data.
   * Validates the payload locally using Zod before sending to the API.
   * @param params - The file URL or base64 file content, and output format
   * @returns The parsed cover letter data in the specified format
   */
  public async parseCoverLetter(
    params: ApiParseCoverLetter & { parse_to: "json" }
  ): Promise<ApiParseCoverLetterJsonResponse>;
  public async parseCoverLetter(
    params: ApiParseCoverLetter & { parse_to: "markdown" }
  ): Promise<ApiParseCoverLetterMarkdownResponse>;
  public async parseCoverLetter(
    params: ApiParseCoverLetter
  ): Promise<ApiParseCoverLetterResponseStructure>;
  public async parseCoverLetter(
    params: ApiParseCoverLetter
  ): Promise<ApiParseCoverLetterResponseStructure> {
    const validation = schemaApiParseCoverLetter.safeParse(params);

    if (!validation.success) {
      const fieldErrors = validation.error.errors
        .map((e) => `[${e.path.join(".")}] ${e.message}`)
        .join(", ");
      throw new Error(`Validation Failed: ${fieldErrors}`);
    }

    return this.request<ApiParseCoverLetterResponseStructure>(
      "/cover-letter/parse",
      {
        method: "POST",
        body: JSON.stringify(validation.data),
      }
    );
  }

  /**
   * Get the status and result of an async run.
   * Validates the payload locally using Zod before sending to the API.
   * @param params - The run ID to check
   * @returns The run status and result data
   */
  public async getRun(
    params: ApiRunStatus
  ): Promise<ApiGetRunStatusResponseStructure> {
    const validation = schemaApiRunStatus.safeParse(params);

    if (!validation.success) {
      const fieldErrors = validation.error.errors
        .map((e) => `[${e.path.join(".")}] ${e.message}`)
        .join(", ");
      throw new Error(`Validation Failed: ${fieldErrors}`);
    }

    return this.request<ApiGetRunStatusResponseStructure>(
      `/run/get/${validation.data.run_id}`,
      { method: "GET" }
    );
  }
}
