import { z } from "zod";

export const prepTaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required."),
  station: z.string().trim().min(1, "Station is required."),
  dueTime: z
    .string()
    .trim()
    .min(1, "Due time is required.")
    .refine(
      (value) => !Number.isNaN(new Date(value).getTime()),
      "Due time must be a valid date and time.",
    ),
});

export type PrepTaskValidationInput = z.infer<typeof prepTaskSchema>;
