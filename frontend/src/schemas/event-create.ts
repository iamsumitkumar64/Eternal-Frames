import { z } from "zod";

export const createEventSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    image_url: z.string().url("Invalid image URL").optional(),
    location: z.string().optional(),
});

export type CreateEventSchemaType = z.infer<typeof createEventSchema>;
