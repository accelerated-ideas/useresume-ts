import { z } from "zod";
import { schemaApiCreateResume } from "./create-resume";

export const schemaApiCreateTailoredResume = z.object({
  resume_content: schemaApiCreateResume.describe(
    "Your complete resume data that will be optimized and tailored for the target job. Include all experience, skills, education, etc. - the AI will emphasize the most relevant parts"
  ),
  target_job: z
    .object({
      job_title: z
        .string()
        .max(250, { message: "Job title cannot exceed 250 characters" })
        .describe(
          "Job title of the position you're applying for (e.g., 'Senior Software Engineer', 'Marketing Manager')"
        ),
      job_description: z
        .string()
        .max(10000, {
          message: "Job description cannot exceed 10000 characters",
        })
        .describe(
          "Complete job posting text including responsibilities, requirements, and qualifications. More detail helps create a better-tailored resume"
        ),
    })
    .describe(
      "Details of the job you're applying for. Used to tailor your resume by optimizing keywords, emphasizing relevant experience, and adjusting content order to match job requirements"
    )
    .required(),
  tailoring_instructions: z
    .string()
    .max(2000, {
      message: "Tailoring instructions cannot exceed 2000 characters",
    })
    .optional()
    .describe(
      "Optional additional instructions for tailoring (e.g., 'emphasize leadership experience', 'highlight Python skills', 'focus on remote work experience')"
    ),
});

export type ApiCreateTailoredResume = z.infer<
  typeof schemaApiCreateTailoredResume
>;
