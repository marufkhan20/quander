import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
});
