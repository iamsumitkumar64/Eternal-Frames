import { z } from "zod";

export const createEventImageSchema = z.object({
    tag_name: z.string().min(1, "tag name is required"),
});

export type CreateEventImageSchemaType = z.infer<typeof createEventImageSchema>;
