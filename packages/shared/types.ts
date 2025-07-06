import { z } from "zod";

// childName, childAge, artStyle, values, theme, customTheme, photoUrls
export const GenerateStoryContent = z.object({
  childName: z.string(),
  childAge: z.number(),
  childGender: z.enum(["male", "female"]),
  artStyle: z.enum(["soft-anime", "pixar", "watercolor", "block-art"]),
  values: z.array(z.string()),
  theme: z.string(),
  customTheme: z.string().optional().nullable(),
});

export const GenerateStoryImage = z.object({
  prompt: z.string(),
  photos: z.array(z.string()),
});

export type GenerateStoryContent = z.infer<typeof GenerateStoryContent>;
export type GenerateStoryImage = z.infer<typeof GenerateStoryImage>;
