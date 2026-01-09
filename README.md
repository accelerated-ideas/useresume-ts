# @useresume/sdk

Official TypeScript SDK for the [useResume API](https://useresume.ai/resume-generation-api) — programmatically generate professional resumes and cover letters.

## Installation

```bash
npm install @useresume/sdk
```

## Quick Start

```typescript
import { useResume } from "@useresume/sdk";

const client = new useResume("your-api-key");

// Create a resume
const result = await client.createResume({
  content: {
    name: "John Doe",
    email: "john@example.com",
    role: "Software Engineer",
    summary: "Experienced software engineer with 5+ years...",
    employment: [
      {
        title: "Senior Developer",
        company: "Tech Corp",
        start_date: "2020-01-01",
        present: true,
        responsibilities: [
          { text: "Led development of microservices architecture" },
          { text: "Mentored junior developers" },
        ],
      },
    ],
  },
  style: {
    template: "modern-pro",
    template_color: "blue",
  },
});

console.log(result.data.file_url); // Download URL (valid for 14 days)
```

## API Methods

### Resume Methods

#### `createResume(params)`

Generate a professional resume PDF.

```typescript
const result = await client.createResume({
  content: { name, email, phone, summary, employment, education, skills, ... },
  style: { template, template_color, font, ... }
});
```

#### `createTailoredResume(params)`

Generate a resume optimized for a specific job using AI.

```typescript
const result = await client.createTailoredResume({
  resume_content: { content: {...}, style: {...} },
  target_job: {
    job_title: "Senior Software Engineer",
    job_description: "We are looking for..."
  }
});
```

#### `parseResume(params)`

Extract structured data from an existing resume file.

```typescript
// Parse to JSON (structured data)
const jsonResult = await client.parseResume({
  file_url: "https://example.com/resume.pdf",
  parse_to: "json",
});
console.log(jsonResult.data.name); // Extracted name

// Parse to Markdown
const mdResult = await client.parseResume({
  file: btoa(fileBuffer), // Base64-encoded file
  parse_to: "markdown",
});
console.log(mdResult.data); // Markdown string
```

### Cover Letter Methods

#### `createCoverLetter(params)`

Generate a professional cover letter PDF.

```typescript
const result = await client.createCoverLetter({
  content: {
    name: "John Doe",
    email: "john@example.com",
    hiring_manager_name: "Jane Smith",
    hiring_manager_company: "Tech Corp",
    text: "Dear Jane Smith, I am writing to express...",
  },
  style: { template: "modern-pro", template_color: "blue" },
});
```

#### `createTailoredCoverLetter(params)`

Generate a cover letter optimized for a specific job using AI.

```typescript
const result = await client.createTailoredCoverLetter({
  cover_letter_content: { content: {...}, style: {...} },
  target_job: {
    job_title: "Product Manager",
    job_description: "We are looking for..."
  }
});
```

#### `parseCoverLetter(params)`

Extract structured data from an existing cover letter file.

```typescript
const result = await client.parseCoverLetter({
  file_url: "https://example.com/cover-letter.pdf",
  parse_to: "json",
});
```

### Run Status

#### `getRun(params)`

Check the status of an async operation.

```typescript
const status = await client.getRun({ run_id: "run_abc123" });
console.log(status.data.status); // "success" | "error" | "in_progress"
```

## Response Types

All create methods return:

```typescript
{
  success: boolean;
  data: {
    file_url: string; // Download URL
    file_url_expires_at: number;
    file_expires_at: number;
    file_size_bytes: number;
  }
  meta: {
    run_id: string;
    credits_used: number;
    credits_remaining: number;
  }
}
```

## Error Handling

```typescript
import { useResume, UseResumeError } from "@useresume/sdk";

try {
  const result = await client.createResume(params);
} catch (error) {
  if (error instanceof UseResumeError) {
    console.error(`API Error ${error.status}: ${error.message}`);
  } else if (error instanceof Error) {
    // Validation error (caught before API call)
    console.error(`Validation Error: ${error.message}`);
  }
}
```

## TypeScript Support

All types are exported for your convenience:

```typescript
import {
  useResume,
  UseResumeError,
  // Request types
  ApiCreateResume,
  ApiCreateTailoredResume,
  ApiParseResume,
  ApiCreateCoverLetter,
  ApiCreateTailoredCoverLetter,
  ApiParseCoverLetter,
  ApiRunStatus,
  // Response types
  ApiPlatformResponseStructure,
  ApiParseResumeJsonResponse,
  ApiParseResumeMarkdownResponse,
  ApiParseCoverLetterJsonResponse,
  ApiParseCoverLetterMarkdownResponse,
  ApiGetRunStatusResponseStructure,
} from "@useresume/sdk";
```

## Templates & Styling

Preview all available templates by creating example documents in the [useResume dashboard](https://useresume.ai/account/resumes).

**Resume Templates:** `default`, `clean`, `classic`, `executive`, `modern-pro`, `meridian`, `horizon`, `atlas`, `prism`, `nova`, `zenith`, `vantage`, `summit`, `quantum`, `vertex`, `harvard`, `lattice`

**Cover Letter Templates:** `atlas`, `classic`, `clean`, `default`, `executive`, `horizon`, `meridian`, `modern-pro`, `nova`, `prism`, `zenith`

**Colors:** `blue`, `black`, `emerald`, `purple`, `rose`, `amber`, `slate`, `indigo`, `teal`, `burgundy`, `forest`, `navy`, and more.

## Important Notes

- **Document availability:** Generated documents are available for download for 14 days
- **Rate limits:** Up to 10 API calls per second
- **Generation time:** Standard documents take 1-2 seconds; AI-tailored documents take 30-45 seconds

## Links

- [API Documentation](https://useresume.ai/resume-generation-api/docs)
- [API Platform](https://useresume.ai/resume-generation-api)
- [Dashboard](https://useresume.ai/account)

## License

MIT
