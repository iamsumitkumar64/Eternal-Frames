import { z } from "zod"

export const profileSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    name: z.string().min(1, "name is required"),
})

export type profileSchemaType = z.infer<typeof profileSchema>