import { z } from "zod";
import { schemaRunStatus } from "./common";

export const schemaApiRunStatus = z.object({
  run_id: z
    .string()
    .max(99, { message: "Run ID must be less than 99 characters" })
    .describe("The ID of the run"),
});

export type ApiRunStatus = z.infer<typeof schemaApiRunStatus>;

export const schemaApiGetRunStatusResponseStructure = z.object({
  success: z.boolean(),
  data: z.object({
    id: z.string(),
    created_at: z.number(),
    endpoint: z.string(),
    api_platform_user_id: z.string(),
    credits_used: z.number(),
    status: schemaRunStatus,
    file_url: z.string().nullable().optional(),
    file_url_expires_at: z.number().nullable().optional(),
    file_expires_at: z.number().nullable(),
    file_size_bytes: z.number().nullable(),
  }),
});

export type ApiGetRunStatusResponseStructure = z.infer<
  typeof schemaApiGetRunStatusResponseStructure
>;
