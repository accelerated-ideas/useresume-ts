import { z } from "zod";

export const schemaPageFormat = z
  .enum(["a4", "letter"], {
    message: "Please select a valid page format",
  })
  .optional()
  .describe("Page format");

export const schemaProfilePictureRadius = z
  .enum(["rounded-full", "rounded-xl", "rounded-none"], {
    message: "Please select a valid profile picture radius",
  })
  .optional()
  .describe("Profile picture radius");

export const schemaDateFormat = z
  .enum(["LLL yyyy", "LL/yyyy", "dd/LL/yyyy", "LL/dd/yyyy", "dd.LL.yyyy"], {
    message: "Please select a valid date format",
  })
  .optional()
  .describe("Date format");

export const schemaLanguageSelector = z
  .enum(["en", "es", "fr", "de", "it", "pt", "nl", "pl", "lt"], {
    message: "Please select a valid document language",
  })
  .optional()
  .describe("Document language");

export const schemaResumeSectionId = z
  .union([
    z.enum([
      "summary",
      "employment",
      "skills",
      "education",
      "certifications",
      "languages",
      "references",
      "projects",
      "activities",
    ]),
    z.string().max(250, {
      message: "Section ID cannot exceed 250 characters",
    }),
  ])
  .describe(
    "Unique identifier for the resume section. Can be one of the predefined sections or a custom section ID"
  );

export const schemaTemplateResume = z
  .enum(
    [
      "default",
      "clean",
      "classic",
      "executive",
      "modern-pro",
      "meridian",
      "horizon",
      "atlas",
      "prism",
      "nova",
      "zenith",
      "vantage",
      "summit",
      "quantum",
      "vertex",
      "harvard",
      "lattice",
    ],
    {
      message:
        "Please select a valid template. (e.g. 'default', 'clean', 'classic', 'executive', 'modern-pro', 'meridian', 'horizon', 'atlas', 'prism', 'nova', 'zenith', 'vantage', 'summit', 'quantum', 'vertex', 'harvard', 'lattice')",
    }
  )
  .optional()
  .describe("Resume template to use");

export const schemaTemplateCoverLetter = z
  .enum(
    [
      "atlas",
      "classic",
      "clean",
      "default",
      "executive",
      "horizon",
      "meridian",
      "modern-pro",
      "nova",
      "prism",
      "zenith",
    ],
    {
      message:
        "Please select a valid template. (e.g. 'default', 'clean', 'classic', 'executive', 'modern-pro', 'meridian', 'horizon', 'atlas', 'prism', 'nova', 'zenith', 'vantage', 'summit', 'quantum', 'vertex', 'harvard', 'lattice')",
    }
  )
  .optional()
  .describe("Cover letter template to use");

export const schemaTemplateColor = z
  .enum(
    [
      "blue",
      "black",
      "emerald",
      "purple",
      "rose",
      "amber",
      "slate",
      "indigo",
      "teal",
      "burgundy",
      "forest",
      "navy",
      "charcoal",
      "plum",
      "olive",
      "maroon",
      "steel",
      "sapphire",
      "pine",
      "violet",
      "mahogany",
      "sienna",
      "moss",
      "midnight",
      "copper",
      "cobalt",
      "crimson",
      "sage",
      "aqua",
      "coral",
      "graphite",
      "turquoise",
    ],
    {
      message:
        "Please select a valid color variant. (e.g. 'blue', 'black', 'emerald', 'purple', 'rose', 'amber', 'slate', 'indigo', 'teal', 'burgundy', 'forest', 'navy', 'charcoal', 'plum', 'olive', 'maroon', 'steel', 'sapphire', 'pine', 'violet', 'mahogany', 'sienna', 'moss', 'midnight', 'copper', 'cobalt', 'crimson', 'sage', 'aqua', 'coral', 'graphite', 'turquoise')",
    }
  )
  .optional()
  .describe(
    "Color scheme for the resume. Affects headings, section dividers, and accent elements"
  );

export const schemaDocumentFont = z
  .enum(
    [
      "geist",
      "inter",
      "merryweather",
      "roboto",
      "playfair",
      "lora",
      "jost",
      "manrope",
      "ibm-plex-sans",
    ],
    {
      message:
        "Please select a valid font. (e.g. 'geist', 'inter', 'merryweather', 'roboto', 'playfair', 'lora', 'jost', 'manrope', 'ibm-plex-sans')",
    }
  )
  .optional()
  .describe("Font family for the resume");

export const schemaBackgroundColor = z
  .enum(
    [
      "white",
      "cream",
      "pearl",
      "mist",
      "smoke",
      "ash",
      "frost",
      "sage",
      "mint",
      "blush",
      "lavender",
      "sky",
      "sand",
      "stone",
      "linen",
      "ivory",
    ],
    {
      message:
        "Please select a valid background color. (e.g. 'white', 'cream', 'pearl', 'mist', 'smoke', 'ash', 'frost', 'sage', 'mint', 'blush', 'lavender', 'sky', 'sand', 'stone', 'linen', 'ivory')",
    }
  )
  .optional()
  .describe("Background color of the resume");

export const schemaRunStatus = z.enum(["success", "error", "in_progress"]);

export const schemaApiPlatformResponseStructure = z.object({
  success: z.boolean(),
  data: z.object({
    file_url: z.string(),
    file_url_expires_at: z.number(),
    file_expires_at: z.number(),
    file_size_bytes: z.number(),
  }),
  meta: z.object({
    run_id: z.string().nullable(),
    credits_used: z.number(),
    credits_remaining: z.number().nullable(),
  }),
});

export type ApiPlatformResponseStructure = z.infer<
  typeof schemaApiPlatformResponseStructure
>;
