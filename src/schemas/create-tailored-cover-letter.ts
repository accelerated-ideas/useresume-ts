import { z } from "zod";
import { schemaApiCreateCoverLetter } from "./create-cover-letter";

export const schemaApiCreateTailoredCoverLetter = z.object({
  cover_letter_content: schemaApiCreateCoverLetter.describe(
    "Your cover letter content and styling. If 'text' field is provided, the AI will enhance/rewrite it for the target job. If 'text' is empty, the AI will generate a complete cover letter from scratch based on the job description."
  ),
  target_job: z
    .object({
      job_title: z
        .string()
        .max(250, { message: "Job title cannot exceed 250 characters" })
        .describe(
          "Job title you're applying for (e.g., 'Senior Software Engineer', 'Marketing Manager'). Used to personalize the cover letter"
        ),
      job_description: z
        .string()
        .max(10000, {
          message: "Job description cannot exceed 10000 characters",
        })
        .describe(
          "Complete job posting including responsibilities, requirements, and company information. More detail produces a better-tailored cover letter with relevant keywords and examples"
        ),
    })
    .describe(
      "Details of the target position. Used to tailor the cover letter by incorporating relevant keywords, emphasizing matching qualifications, and adjusting tone to fit the role and company culture"
    )
    .required(),
  tailoring_instructions: z
    .string()
    .max(2000, {
      message: "Tailoring instructions cannot exceed 2000 characters",
    })
    .optional()
    .describe(
      "Optional additional instructions for tailoring the cover letter (e.g., 'emphasize leadership experience', 'highlight Python skills', 'mention passion for sustainability', 'keep tone formal'). Use this to guide the AI's focus areas"
    ),
});

export type ApiCreateTailoredCoverLetter = z.infer<
  typeof schemaApiCreateTailoredCoverLetter
>;
