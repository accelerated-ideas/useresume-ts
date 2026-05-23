import { z } from "zod";

export const schemaApiParseResume = z
  .object({
    file_url: z
      .string()
      .nullable()
      .optional()
      .describe(
        "URL of the uploaded resume file. Must be publicly accessible. 20MB file size limit. Either file_url or file is required."
      ),
    file: z
      .string()
      .nullable()
      .optional()
      .describe(
        "Base64-encoded string of the file. 4MB file size limit. Either file_url or file is required."
      ),
    parse_to: z
      .enum(["markdown", "json"])
      .describe("Format to parse the resume to"),
  })
  .superRefine((data, ctx) => {
    if (!data.file_url && !data.file) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Either file_url or file is required",
      });
    }
    if (data.file_url && data.file) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Either file_url or file is required",
      });
    }
  });

export type ApiParseResume = z.infer<typeof schemaApiParseResume>;

export const schemaApiParseResumeResponseDataObject = z
  .object({
    links: z
      .array(
        z.object({
          url: z.string().nullable().describe("Link URL"),
          name: z.string().nullable().describe("Link display name"),
        })
      )
      .nullable()
      .describe(
        "Array of personal/professional links (e.g., LinkedIn, portfolio, GitHub, personal website)"
      ),
    name: z.string().nullable().describe("Full name"),
    role: z.string().nullable().describe("Professional role or job title"),
    email: z.string().nullable().describe("Email address"),
    phone: z.string().nullable().describe("Phone number"),
    address: z.string().nullable().describe("Physical address"),
    summary: z
      .string()
      .nullable()
      .describe("Professional summary or career objective"),
    employment: z
      .array(
        z.object({
          start_date: z.string().nullable().describe("Start date YYYY-MM-DD"),
          end_date: z.string().nullable().describe("End date YYYY-MM-DD"),
          present: z
            .boolean()
            .nullable()
            .describe("Whether this is the current job"),
          title: z.string().nullable().describe("Job title"),
          company: z.string().nullable().describe("Company name"),
          location: z.string().nullable().describe("Job location"),
          short_description: z
            .string()
            .nullable()
            .describe("Brief overview of the role"),
          responsibilities: z
            .array(
              z.object({
                text: z
                  .string()
                  .nullable()
                  .describe(
                    "Specific responsibility or achievement in this role"
                  ),
              })
            )
            .nullable()
            .describe("Array of responsibility bullet points"),
        })
      )
      .nullable()

      .describe("Array of employment history objects"),
    skills: z
      .array(
        z.object({
          name: z.string().nullable().describe("Skill name"),
          proficiency: z
            .enum(["Beginner", "Intermediate", "Advanced", "Expert"], {
              errorMap: () => ({ message: "Proficiency is required" }),
            })
            .nullable()
            .describe("Skill proficiency level"),
        })
      )
      .nullable()

      .describe("Array of skill objects"),
    education: z
      .array(
        z.object({
          start_date: z.string().nullable().describe("Start date YYYY-MM-DD"),
          end_date: z.string().nullable().describe("End date YYYY-MM-DD"),
          present: z
            .boolean()
            .nullable()
            .describe("Whether currently studying"),
          degree: z.string().nullable().describe("Degree name"),
          institution: z.string().nullable().describe("Institution name"),
          location: z.string().nullable().describe("Institution location"),
          short_description: z
            .string()
            .nullable()
            .describe("Education description"),
          achievements: z
            .array(
              z.object({
                text: z
                  .string()
                  .nullable()
                  .describe(
                    "Academic achievement / grade, courses taken, award, or notable accomplishment during education"
                  ),
              })
            )
            .nullable()
            .describe("Array of achievement bullet points"),
        })
      )
      .nullable()

      .describe(
        "Array of education objects with degree, institution, dates, location, description, and achievements"
      ),
    certifications: z
      .array(
        z.object({
          start_date: z.string().nullable().describe("Issue date YYYY-MM-DD"),
          end_date: z
            .string()
            .nullable()
            .describe("Expiration date YYYY-MM-DD"),
          present: z
            .boolean()
            .nullable()
            .describe("Whether certification does not expire"),
          name: z.string().nullable().describe("Certification name"),
          institution: z.string().nullable().describe("Issuing institution"),
        })
      )
      .nullable()

      .describe(
        "Array of certification objects with name, institution, and dates"
      ),
    languages: z
      .array(
        z.object({
          language: z.string().nullable().describe("Language name"),
          proficiency: z
            .enum(["Beginner", "Intermediate", "Advanced", "Fluent"], {
              errorMap: () => ({ message: "Proficiency is required" }),
            })
            .nullable()
            .describe("Language proficiency level"),
        })
      )
      .nullable()

      .describe(
        "Array of language objects with language name and proficiency level"
      ),
    references: z
      .array(
        z.object({
          name: z.string().nullable().describe("Reference name"),
          title: z.string().nullable().describe("Reference job title"),
          company: z.string().nullable().describe("Reference company"),
          email: z.string().nullable().describe("Reference email"),
          phone: z.string().nullable().describe("Reference phone number"),
        })
      )
      .nullable()

      .describe(
        "Array of reference objects with name, title, company, email, and phone"
      ),
    projects: z
      .array(
        z.object({
          name: z.string().nullable().describe("Project name"),
          short_description: z
            .string()
            .nullable()
            .describe(
              "Summary of the project, technologies used, and outcomes achieved"
            ),
          present: z
            .boolean()
            .nullable()
            .describe("Whether project is ongoing"),
          start_date: z
            .string()
            .nullable()
            .describe("Project start date YYYY-MM-DD"),
          end_date: z
            .string()
            .nullable()
            .describe("Project end date YYYY-MM-DD"),
        })
      )
      .nullable()

      .describe("Array of project objects with name, description, and dates"),
    activities: z
      .array(
        z.object({
          name: z.string().nullable().describe("Activity name"),
          short_description: z
            .string()
            .nullable()
            .describe("Activity description"),
        })
      )
      .nullable()

      .describe(
        "Extracurricular activities, volunteer work, hobbies, or community involvement"
      ),
    // #### Extra fields
    date_of_birth: z
      .string()
      .nullable()

      .optional().describe("Date of birth"),
    marital_status: z
      .string()
      .nullable()

      .optional().describe("Marital status"),
    passport_or_id: z
      .string()
      .nullable()

      .optional().describe("Passport or ID number"),
    nationality: z.string().nullable().optional().describe("Nationality"),
    visa_status: z.string().nullable().optional().describe("Visa status"),
    pronouns: z.string().nullable().optional().describe("Personal pronouns"),
  })
  .describe("The resume data object containing all resume content");

export const schemaApiParseResumeResponseStructure = z.object({
  success: z.boolean(),
  data: z.union([schemaApiParseResumeResponseDataObject, z.string()]),
  meta: z.object({
    run_id: z.string(),
    credits_used: z.number(),
    credits_remaining: z.number(),
  }),
});

export type ApiParseResumeResponseStructure = z.infer<
  typeof schemaApiParseResumeResponseStructure
>;

// Specific response types for overloads
export type ApiParseResumeResponseDataObject = z.infer<
  typeof schemaApiParseResumeResponseDataObject
>;

export type ApiParseResumeJsonResponse = {
  success: boolean;
  data: ApiParseResumeResponseDataObject;
  meta: { run_id: string; credits_used: number; credits_remaining: number };
};

export type ApiParseResumeMarkdownResponse = {
  success: boolean;
  data: string;
  meta: { run_id: string; credits_used: number; credits_remaining: number };
};
