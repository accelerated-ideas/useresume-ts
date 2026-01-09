import { z } from "zod";
import {
  schemaBackgroundColor,
  schemaDocumentFont,
  schemaLanguageSelector,
  schemaPageFormat,
  schemaTemplateColor,
  schemaTemplateCoverLetter,
} from "./common";

export const schemaCoverLetterContent = z
  .object({
    name: z
      .string()
      .max(1000, {
        message: "Name must be less than 1000 characters",
      })
      .optional()
      .describe("Your full name"),
    address: z
      .string()
      .max(1000, {
        message: "Address must be less than 1000 characters",
      })
      .optional()
      .describe("Your physical address"),
    email: z
      .string()
      .max(250, {
        message: "Email must be less than 250 characters",
      })
      .optional()
      .describe("Your email address"),
    phone: z
      .string()
      .max(250, {
        message: "Phone number must be less than 250 characters",
      })
      .optional()
      .describe("Your phone number"),
    text: z
      .string()
      .max(15000, {
        message: "Cover letter text must be less than 15000 characters",
      })
      .optional()
      .describe(
        "Main body text of the cover letter. Should include introduction, relevant experience/skills, why you're interested in the role, and closing. Typically 3-4 paragraphs"
      ),
    hiring_manager_company: z
      .string()
      .max(250, {
        message: "Company name must be less than 250 characters",
      })
      .optional()
      .describe(
        "Company name you're applying to. Used in the letter header and salutation"
      ),
    hiring_manager_name: z
      .string()
      .max(250, {
        message: "Hiring manager name must be less than 250 characters",
      })
      .optional()
      .describe("The name of the hiring manager"),
    role: z
      .string()
      .max(1000, {
        message: "Role must be less than 1000 characters",
      })
      .optional()
      .describe("Your professional role or job title."),
  })
  .describe(
    "Cover letter content including personal details, letter body text, and recipient information"
  );

export const schemaCoverLetterStyle = z
  .object({
    // #### Styling
    template: schemaTemplateCoverLetter,
    template_color: schemaTemplateColor,
    font: schemaDocumentFont,
    background_color: schemaBackgroundColor,
    page_padding: z
      .number({
        message: "Page padding is required",
      })
      .min(0, "Page padding cannot be negative")
      .max(2, "Page padding cannot exceed 2")
      .optional()
      .describe(
        "Page padding multiplier. Controls margins around the page content"
      ),
    gap_multiplier: z
      .number({
        message: "Gap multiplier is required",
      })
      .min(0.5, "Gap multiplier must be at least 0.5")
      .max(1.5, "Gap multiplier cannot exceed 1.5")
      .optional()
      .describe(
        "Gap multiplier between sections. Controls spacing between cover letter sections"
      ),
    font_size_multiplier: z
      .number({
        message: "Font size multiplier is required",
      })
      .min(0.8, "Font size multiplier must be at least 0.8")
      .max(1.2, "Font size multiplier cannot exceed 1.2")
      .optional()
      .describe("Font size multiplier. Controls overall text size"),

    // #### Document language
    document_language: schemaLanguageSelector,

    // #### Page format
    page_format: schemaPageFormat,
  })
  .optional()
  .describe(
    "Visual styling options for the cover letter including template, colors, fonts, and spacing"
  );

export const schemaApiCreateCoverLetter = z.object({
  content: schemaCoverLetterContent,
  style: schemaCoverLetterStyle,
});

export type ApiCreateCoverLetterContent = z.infer<
  typeof schemaCoverLetterContent
>;
export type ApiCreateCoverLetterStyle = z.infer<typeof schemaCoverLetterStyle>;
export type ApiCreateCoverLetter = z.infer<typeof schemaApiCreateCoverLetter>;
